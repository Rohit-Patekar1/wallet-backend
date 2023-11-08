import { Document } from "mongodb";

export interface IWallet extends Document {
  walletId:string;
  createdAt: Date;
  balance:Number;
  name:string;
}

export interface ITransaction extends Document {
    walletId:string;
    createdAt: Date;
    amount:Number;
    balance:Number,
    description:string,
    type:string,
    transactionId:string
  }