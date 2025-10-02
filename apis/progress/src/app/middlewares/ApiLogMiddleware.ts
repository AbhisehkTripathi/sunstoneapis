import { Request, Response, NextFunction } from "express";
import { apiLogger } from "../../libs/apiLogger";

export const ApiLogMiddleware = (service_name: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    let responseBody: any;

    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
      responseBody = body;
      return originalSend(body);
    };

    res.on("finish", () => {
      apiLogger({
        service_name,
        req,
        res,
        startTime,
        responseBody,
        responseStatus: res.statusCode
      });
    });

    next();
  };
};
