import { connectToDatabase } from "@/lib/db";
import { TransactionModel } from "@/models/Transaction";
import { UserModel } from "@/models/User";

export async function getDashboardData() {
  await connectToDatabase();

  const [transactions, totalTransactions, disputedCount, escrowSum] = await Promise.all([
    TransactionModel.find({}).sort({ createdAt: -1 }).limit(20).lean(),
    TransactionModel.countDocuments(),
    TransactionModel.countDocuments({ status: "DISPUTED" }),
    TransactionModel.aggregate([
      { $match: { status: "ESCROW" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  return {
    transactions,
    totals: {
      totalTransactions,
      activeDisputes: disputedCount,
      escrowFunds: escrowSum[0]?.total ?? 0,
    },
  };
}

export async function getTransactionById(transactionId: string) {
  await connectToDatabase();
  return TransactionModel.findOne({ transactionId }).lean();
}

export async function getUserOverview() {
  await connectToDatabase();

  const users = await UserModel.find({})
    .sort({ trustScore: -1 })
    .limit(10)
    .lean();

  return users;
}
