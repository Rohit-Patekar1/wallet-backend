import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  errorGenerator,
  errorHandler,
  ErrorTypes,
} from "../helpers/error.helper";
import { response } from "../helpers/response.helper";
import { v4 } from "uuid";
import { createWallet } from "../service/wallet-service";
import { newTransaction } from "../service/transaction-service";
import { transactionType } from "../util/enum";
import { ITransaction, IWallet } from "../util/model";


export const saveWallet = async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;
    const now = new Date();
    const uuid = v4();
    const transactionId = v4();

    const walletData: IWallet = {
      name,
      createdAt: new Date(),
      walletId: uuid,
      balance: amount ?? 0,
    };

    const transactionData: ITransaction = {
      walletId: uuid,
      createdAt: new Date(),
      amount,
      balance: amount,
      description: "Initial amount setup amount",
      type: transactionType.credit,
      transactionId,
    };
    await createWallet(walletData);
    await newTransaction(transactionData);

    return response
      .setSuccess(StatusCodes.OK, {
        id: uuid,
        balance: amount,
        transactionId,
        name,
        date: now,
        description: "Initial amount setup amount",
      })
      .send(res);
  } catch (error: any) {
    const formattedError = await errorHandler(error);
    return response
      .setError(formattedError.statusCode, formattedError.message)
      .send(res);
  }
};
