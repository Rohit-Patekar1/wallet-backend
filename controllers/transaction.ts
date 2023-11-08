import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  errorGenerator,
  errorHandler,
  ErrorTypes,
} from "../helpers/error.helper";
import { response } from "../helpers/response.helper";
import { v4 } from "uuid";
import { fetchWalletDetail, updateWallet } from "../service/wallet-service";
import {
  fetchTransactions,
  newTransaction,
} from "../service/transaction-service";
import { transactionType } from "../util/enum";
import { getBalance } from "../helpers/balance.helper";
import { connectToDatabase } from "..";


export const transaction = async (req: Request, res: Response) => {
  const session = await (await connectToDatabase()).startSession();

  session.startTransaction();
  try {
    const walletId = req.params.walletId;
    const { amount, description } = req.body;
    const walletData = await fetchWalletDetail(walletId);

    if (!walletData)
      throw errorGenerator("Wallet not found", ErrorTypes.notFound);
    if (amount < 0 && walletData.balance + amount < 0)
      throw errorGenerator(
        "Insufficent wallet balance",
        ErrorTypes.validationError
      );

    const transactionId =v4();;
    let balance = walletData.balance;
    balance = getBalance(amount, balance);

    const transactionData = {
      walletId,
      createdAt: new Date(),
      amount,
      balance,
      description,
      type: amount > 0 ? transactionType.credit : transactionType.debit,
      transactionId,
    };

    await newTransaction(transactionData,{ session });
    await updateWallet(walletId, balance,{ session });
    await session.commitTransaction();

    return response
      .setSuccess(StatusCodes.OK, { balance, transactionId })
      .send(res);
  } catch (error: any) {
    await session.abortTransaction();
    const formattedError = await errorHandler(error);
    return response
      .setError(formattedError.statusCode, formattedError.message)
      .send(res);
  }
};

export const fetchTransactionList = async (req: Request, res: Response) => {
  try {
    const { walletId, skip, limit,filter } = req.query;

    const transactionList = await fetchTransactions(
      walletId!.toString(),
      parseInt(skip!.toString()),
      parseInt(limit!.toString()),
      filter!.toString(),
    );

    return response.setSuccess(StatusCodes.OK, transactionList).send(res);
  } catch (error: any) {
    const formattedError = await errorHandler(error);
    return response
      .setError(formattedError.statusCode, formattedError.message)
      .send(res);
  }
};
