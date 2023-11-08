import {  connectToDatabase } from "..";
import { Collections } from "../util/enum";
import { ITransaction, IWallet } from "../util/model";

export async function newTransaction(data: ITransaction, options = {}) {
  try {
    return  (await connectToDatabase()).db('wallet-app').collection(Collections.transactions)
    .insertOne(data,options);
  } catch (error) {
    console.error("Error in transaction service", error);
    throw error;
  }
}



export async function fetchTransactions(
  id: string,
  skip: number,
  limit: number,
  filter: string
) {
 
  
  try {
    if(skip!==0)
    skip-=10;
    const pipeline = [
      {
        $match: { walletId: id },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            filter === "amount_highest"
              ? { $sort: { amount: -1 } }
              : filter === "amount_lowest"
              ? { $sort: { amount: 1 } }
              : filter === "date_latest"
              ? { $sort: { createdAt: 1 } }
              : filter === "date_earliest"
              ? { $sort: { createdAt: -1 } }
              : {},
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                walletId: 1,
                createdAt: 1,
                amount: 1,
                balance: 1,
                description: 1,
                type: 1,
                transactionId: 1,
              },
            },
          ],
        },
      },
    ];

    const result= await (await connectToDatabase()).db('wallet-app').collection(Collections.transactions).aggregate(pipeline).toArray()
  
    const metadata = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    const transactions = result[0].data;

    return {
      total: metadata,
      transactions: transactions,
    };
  } catch (error) {
    console.error("Error in fetching transactions", error);
    throw error;
  }
}
