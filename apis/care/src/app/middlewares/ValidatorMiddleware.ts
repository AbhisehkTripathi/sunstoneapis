// import {NextFunction, Request, Response} from 'express'

// import Validators from '../Validators'

// export const Validator= (schema:string) =>{
//     if(!Validators.hasOwnProperty(schema))
//         throw new Error(`'${schema}' validator is not exist`)

//     return async function(req: Request, res: Response, next:NextFunction) {
//         try {
//             type ObjectKey=keyof typeof Validators
//             let schemaName=schema as ObjectKey
//             req.body = await Validators[schemaName].validateAsync({...req.body, ...req.params})
//             next()
//         } catch (error:any) {
//             if (error.isJoi) {
//                 // Remove context from Joi validation error details
//                 const cleanedErrors = error.details.map((errorDetail: any) => {
//                     const { context, ...errorWithoutContext } = errorDetail;
//                     return errorWithoutContext;
//                 });
//                 return res.status(422).json({ message: cleanedErrors });
//             }
//             next(error);
//         }
//     }
// }
