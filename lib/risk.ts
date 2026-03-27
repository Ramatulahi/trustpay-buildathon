import { UserModel } from "@/models/User";

const HIGH_AMOUNT_THRESHOLD = 200000;
const NEW_ACCOUNT_DAYS = 14;
const MULTIPLE_DISPUTES_THRESHOLD = 2;

export async function evaluateRisk(userId: string, amount: number) {
  const user = await UserModel.findById(userId);

  if (!user) {
    return {
      flagged: true,
      reasons: ["Buyer account not found."],
    };
  }

  const reasons: string[] = [];
  const accountAgeMs = Date.now() - new Date(user.createdAt).getTime();
  const accountAgeDays = accountAgeMs / (1000 * 60 * 60 * 24);

  if (accountAgeDays <= NEW_ACCOUNT_DAYS && amount >= HIGH_AMOUNT_THRESHOLD) {
    reasons.push("New account with high transaction amount.");
  }

  if (user.activeDisputes >= MULTIPLE_DISPUTES_THRESHOLD) {
    reasons.push("User has multiple active disputes.");
  }

  return {
    flagged: reasons.length > 0,
    reasons,
  };
}
