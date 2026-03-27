import { UserModel } from "@/models/User";

export async function addTrustScore(userId: string, value: number) {
  await UserModel.findByIdAndUpdate(userId, {
    $inc: { trustScore: value },
  });
}

export async function incrementActiveDisputes(userId: string) {
  await UserModel.findByIdAndUpdate(userId, {
    $inc: { activeDisputes: 1 },
  });
}
