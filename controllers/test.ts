import { response } from "../helpers/response.helper";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../helpers/error.helper";
import { Request, Response } from "express";


export const ping = async (req: Request, res: Response) => {
    try {
      return response.setSuccess(StatusCodes.OK, 'server is valid').send(res);
    } catch (error: any) {
      const formattedError = await errorHandler(error);
      return response
        .setError(formattedError.statusCode, formattedError.message)
        .send(res);
    }
  };