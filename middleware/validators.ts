import joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export const walletSetupValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = joi
      .object({
        name: joi.string().required(),
        amount: joi.number().optional(),
      })
      .required();
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const transactionValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = joi
      .object({
        amount: joi.number().required(),
        description: joi.string().optional(),
      })
      .required();
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};
