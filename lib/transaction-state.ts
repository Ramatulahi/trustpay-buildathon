export const TRANSACTION_STATES = [
  "PENDING",
  "ESCROW",
  "DELIVERED",
  "COMPLETED",
  "DISPUTED",
] as const;

export type TransactionState = (typeof TRANSACTION_STATES)[number];

export const isValidTransition = (
  current: TransactionState,
  next: TransactionState,
) => {
  const allowed: Record<TransactionState, TransactionState[]> = {
    PENDING: ["ESCROW"],
    ESCROW: ["DELIVERED", "COMPLETED", "DISPUTED"],
    DELIVERED: ["COMPLETED", "DISPUTED"],
    COMPLETED: [],
    DISPUTED: [],
  };

  return allowed[current].includes(next);
};
