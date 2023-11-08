import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  errorGenerator,
  errorHandler,
  ErrorTypes,
} from "../helpers/error.helper";
import { response } from "../helpers/response.helper";
import { fetchWalletDetail } from "../service/wallet-service";

export const fetchWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const walletData = await fetchWalletDetail(id);
    if (!walletData) {
      throw errorGenerator("No wallet found", ErrorTypes.unauthorizedError); 
    }

    return response.setSuccess(StatusCodes.OK, { walletData }).send(res);
  } catch (error: any) {
    console.log(error);
    
    const formattedError = await errorHandler(error);
    return response
      .setError(formattedError.statusCode, formattedError.message)
      .send(res);
  }
};
