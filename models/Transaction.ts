import { Model, Schema, model, models } from "mongoose";

import { TRANSACTION_STATES, type TransactionState } from "@/lib/transaction-state";

export interface TransactionLogHash {
  event: string;
  hash: string;
  createdAt: Date;
}

export interface TransactionDocument {
  _id: string;
  transactionId: string;
  amount: number;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  status: TransactionState;
  paymentReference?: string;
  riskFlagged: boolean;
  riskReasons: string[];
  buyerEvidence?: string;
  sellerProof?: string;
  disputeOutcome?: "BUYER_WON" | "SELLER_WON";
  logHashes: TransactionLogHash[];
  fundsReleased: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>(
  {
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    buyerId: { type: String, required: true },
    buyerName: { type: String, required: true },
    sellerId: { type: String, required: true },
    sellerName: { type: String, required: true },
    status: {
      type: String,
      enum: TRANSACTION_STATES,
      default: "PENDING",
      required: true,
    },
    paymentReference: String,
    riskFlagged: { type: Boolean, default: false },
    riskReasons: { type: [String], default: [] },
    buyerEvidence: String,
    sellerProof: String,
    disputeOutcome: {
      type: String,
      enum: ["BUYER_WON", "SELLER_WON"],
    },
    logHashes: {
      type: [
        {
          event: { type: String, required: true },
          hash: { type: String, required: true },
          createdAt: { type: Date, required: true },
        },
      ],
      default: [],
    },
    fundsReleased: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const TransactionModel =
  (models.Transaction as Model<TransactionDocument>) ||
  model<TransactionDocument>("Transaction", transactionSchema);
