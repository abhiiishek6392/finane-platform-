import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { processRecurringTransactions, checkBudgetThresholds } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processRecurringTransactions, checkBudgetThresholds],
});