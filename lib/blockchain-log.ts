import { createHash } from "crypto";

import type { TransactionLogHash } from "@/models/Transaction";

export function createLogHash(payload: object) {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

export function appendLogHash(
  logs: TransactionLogHash[],
  event: string,
  payload: object,
): TransactionLogHash[] {
  const previousHash = logs.at(-1)?.hash ?? "GENESIS";
  const hash = createLogHash({
    event,
    payload,
    previousHash,
    timestamp: new Date().toISOString(),
  });

  return [...logs, { event, hash, createdAt: new Date() }];
}
