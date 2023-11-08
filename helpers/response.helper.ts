import { Response } from 'express';
export class ResponseStructure {
  private success?: boolean;
  constructor(private statusCode?: number, private data?: any, private message?: string) {}

  setSuccess(statusCode: number, data: any) {
    this.statusCode = statusCode;
    this.data = data;
    this.success = true;
    return this;
  }

  setError(statusCode: number, message: string, data: any = {}) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.data = data;
    return this;
  }

  send(res: Response) {
    if (this.success) {
      return res.status(this.statusCode!).json(this.data);
    }
    return res.status(this.statusCode!).json({
      message: this.message,
      data: this.data,
    });
  }
}

const response = new ResponseStructure();
export { response };
