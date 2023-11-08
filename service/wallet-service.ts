import { connectToDatabase } from "..";
import { Collections } from "../util/enum";
import { IWallet } from "../util/model";

export async function createWallet(data: IWallet) {
  try {
    return (await connectToDatabase())
      .db("wallet-app")
      .collection(Collections.wallet)
      .insertOne(data);
  } catch (error) {
    console.error("Error while setting up your wallet", error);
    throw error;
  }
}

export async function fetchWalletDetail(id: String) {
  try {
    return (await connectToDatabase())
      .db("wallet-app")
      .collection(Collections.wallet)
      .findOne(
        { walletId: id },
        { projection: { name: 1, createdAt: 1, wallectId: 1, balance: 1 } }
      );
  } catch (error) {
    console.error("Error in fetching wallet", error);
    throw error;
  }
}

export async function updateWallet(id: String, balance: number, options = {}) {
  try {
    return (await connectToDatabase())
      .db("wallet-app")
      .collection(Collections.wallet)
      .updateOne({ walletId: id }, { $set: { balance } }, (options = {}));
  } catch (error) {
    console.error("Error in fetching wallet", error);
    throw error;
  }
}
