import joi from "joi";
import { Types } from "mongoose";

export const generalRules = {

id:joi.string().custom((value, helpers) => {
    return Types.ObjectId.isValid(value) ? value : helpers.message("inValid ID"); 
}),
email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 5 }),
password: joi.string(),

file: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    path: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    size: joi.number().required()
    }).messages({
        "any.required": "File is required"
    }),

    token:joi.object({
         "authorization": joi.string().required(),
         "connection": joi.string(),
         "accept-encoding": joi.string(),
         "accept": joi.string(),
         "user-agent": joi.string(),
         "host": joi.string(),
         "content-length": joi.string(),
         "postman-token": joi.string(),
         "cache-control": joi.string()
         
    })

}