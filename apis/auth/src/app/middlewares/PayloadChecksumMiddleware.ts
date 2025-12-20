import { NextFunction, Request, Response } from "express";
import jsSHA from "jssha";
import * as url from "url";
import Helper from "../../utils/helper"

const PayloadChecksumMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const exceptionRoutes: any = Helper.getExceptioalRoutes();
        const parsedUrl: any = url.parse(request.url, true);
        // const isExceptionRoute = exceptionRoutes.some((route: string) =>
        //     parsedUrl.pathname?.includes(route)
        // );\
        const isExceptionRoute = exceptionRoutes.filter((route: string) =>
            parsedUrl.pathname?.includes(route)
        ).length > 0;
        console.log("isExceptionRoute", isExceptionRoute);

        if (isExceptionRoute) {
            return next();
        }

        if (!process.env.SALT_KEY) {
            return response.status(500).json({
                error_message: "Server configuration error: SALT_KEY is missing"
            });
        }
        const sha = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
        let finalText = '';
        if (["post", "put", "patch"].includes(request.method.toLowerCase())) {
            if (Object.keys(request.body).length === 0) {
                return next();
            }
            let payloadText = Buffer.from(JSON.stringify(request.body)).toString("base64");
            finalText = payloadText + process.env.SALT_KEY;
            const exceptionRoutes: any = Helper.getExceptioalRoutes();
            console.log("exceptionRoutes", exceptionRoutes);
        } else {
            let parsedUrlPath = parsedUrl.path || '';
            parsedUrlPath = decodeURI(parsedUrlPath);
            let parsedUrlText = Buffer.from(parsedUrlPath).toString("base64");
            finalText = parsedUrlText + process.env.SALT_KEY;
        }
        sha.update(finalText);
        const hash = sha.getHash("HEX");
        if (request.headers['x-verify'] != hash) {
            return response.status(422).json({
                error_message: "Unprocessable Content"
            });
        }

        next();
    } catch (e) {
        return response.status(401).json({
            error_message: "User not authorized"
        });
    }
}

export default PayloadChecksumMiddleware;