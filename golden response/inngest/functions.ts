import { inngest } from "./client";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const processRecurringTransactions = inngest.createFunction(
  { id: "process-recurring-transactions" },
  { cron: "0 0 * * *" },
  async ({ step }) => {
    const today = new Date();
    const templates = await step.run("fetch-active-templates", async () => {
      return await prisma.recurringTransaction.findMany({
        where: { isActive: true, nextRunDate: { lte: today } },
      });
    });

    for (const template of templates) {
      await step.run(`execute-transaction-${template.id}`, async () => {
        await prisma.$transaction(async (tx) => {
          await tx.transaction.create({
            data: {
              userId: template.userId,
              accountId: template.accountId,
              type: template.type,
              amount: template.amount,
              category: template.category,
              description: template.description,
              date: template.nextRunDate,
              isRecurring: true,
              recurringId: template.id,
            },
          });

          const balanceModifier = template.type === "INCOME" ? template.amount : -template.amount;
          await tx.account.update({
            where: { id: template.accountId },
            data: { balance: { increment: balanceModifier } },
          });

          let nextDate = new Date(template.nextRunDate);
          if (template.interval === "DAILY") nextDate.setDate(nextDate.getDate() + 1);
          if (template.interval === "WEEKLY") nextDate.setDate(nextDate.getDate() + 7);
          if (template.interval === "MONTHLY") nextDate.setMonth(nextDate.getMonth() + 1);
          if (template.interval === "YEARLY") nextDate.setFullYear(nextDate.getFullYear() + 1);

          await tx.recurringTransaction.update({
            where: { id: template.id },
            data: { nextRunDate: nextDate },
          });
        });
      });
    }
    return { processed: templates.length };
  }
);

export const checkBudgetThresholds = inngest.createFunction(
  { id: "check-budget-thresholds" },
  { event: "transaction.created" },
  async ({ event, step }) => {
    const { userId, amount, date } = event.data;
    const txDate = new Date(date);
    const month = txDate.getMonth() + 1;
    const year = txDate.getFullYear();

    await step.run("evaluate-budget-limits", async () => {
      const budget = await prisma.budget.findUnique({
        where: { userId_month_year: { userId, month, year } },
      });

      if (!budget) return;

      const summary = await prisma.transaction.aggregate({
        where: { userId, type: "EXPENSE", date: { gte: new Date(year, month - 1, 1), lt: new Date(year, month, 1) } },
        _sum: { amount: true },
      });

      const totalSpent = Number(summary._sum.amount || 0);
      const budgetAmount = Number(budget.amount);
      const utilizationRatio = totalSpent / budgetAmount;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || !user.email) return;

      if (utilizationRatio >= 1.0 && !budget.alertSent100) {
        await resend.emails.send({
          from: "alerts@yourfinances.com",
          to: user.email,
          subject: "⚠️ CRITICAL: Budget Limit Breached!",
          text: `You have exhausted 100% of your allocation. Total spent: $${totalSpent} / Limit: $${budgetAmount}`,
        });
        await prisma.budget.update({ where: { id: budget.id }, data: { alertSent100: true } });
      } else if (utilizationRatio >= 0.8 && !budget.alertSent80) {
        await resend.emails.send({
          from: "alerts@yourfinances.com",
          to: user.email,
          subject: "⚠️ Budget Alert: 80% Threshold Reached",
          text: `Warning: You have used over 80% of your allocation. Total spent: $${totalSpent} / Limit: $${budgetAmount}`,
        });
        await prisma.budget.update({ where: { id: budget.id }, data: { alertSent80: true } });
      }
    });
  }
);