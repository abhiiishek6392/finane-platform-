"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { inngest } from "../inngest/client";

const prisma = new PrismaClient();

const transactionSchema = z.object({
  accountId: z.string().uuid(),
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.number().positive(),
  category: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  description: z.string().optional(),
});

export async function createTransaction(rawFields: any) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized access block.");

  const validated = transactionSchema.parse(rawFields);
  const dbUser = await prisma.user.findUnique({ where: { clerkUserId } });
  if (!dbUser) throw new Error("Profile synchronization error.");

  const outputTransaction = await prisma.$transaction(async (tx) => {
    const updatedAccount = await tx.account.update({
      where: { id: validated.accountId, userId: dbUser.id },
      data: {
        balance: {
          increment: validated.type === "INCOME" ? validated.amount : -validated.amount,
        },
      },
    });

    if (Number(updatedAccount.balance) < 0 && validated.type === "EXPENSE") {
      throw new Error("Insufficient liquid balance.");
    }

    return await tx.transaction.create({
      data: { ...validated, userId: dbUser.id },
    });
  });

  await inngest.send({
    name: "transaction.created",
    data: {
      userId: dbUser.id,
      amount: validated.amount,
      date: validated.date.toISOString(),
    },
  });

  revalidatePath("/dashboard");
  return { success: true, transactionId: outputTransaction.id };
}