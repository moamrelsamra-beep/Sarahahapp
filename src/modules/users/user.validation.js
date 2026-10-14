import joi from "joi";
import { generalRules } from "../../common/utils/generalRules.js";


export const signUpSchema = {
  body: joi
    .object({
      fName: joi.string().alphanum().min(2).max(10).required().messages({
        "any.required": "First name is required",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name cannot be longer than 10 characters"
      }),
      lName: joi.string().required().messages({
        "any.required": "Last name is required"
      }),
      email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 5 }).required().messages({
        "any.required": "Email is required",
        "string.email": "Please provide a valid email address"
      }),
      password: joi.string().required().messages({
        "any.required": "Password is required"
      }),
      confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.required": "Confirm password is required",
        "string.valid": "Passwords do not match"
      }),
      phone: joi.string().required().messages({
        "any.required": "Phone number is required"
      }),
      age: joi.number().min(18).max(100).required().messages({
        "any.required": "Age is required",
        "number.min": "Age must be at least 18",
        "number.max": "Age cannot be more than 100"
      }),
      gender: joi.string().valid("male", "female").required().messages({
        "any.required": "Gender is required",
        "string.valid": "Gender must be either 'male' or 'female'"})
}).required(),

 //file: generalRules.file.required(),

files: joi.object({
  attachment:joi.array().items(generalRules.file).required(),
   
  attachments:joi.array().items(generalRules.file.required()).required()
}).required()
}


export const loginSchema = {
  body: joi.object({
    email:  generalRules.email.required(),
    password: generalRules.password.required()
  }).required()
}


export const refreshTokenSchema = {
  headers: generalRules.token.required()
}


export const shareProfileSchema = {
  params: joi.object({
    id:generalRules.id.required()
  }).required()
}


export const updateProfileSchema = {
  body: joi
    .object({
      fName: joi.string().alphanum().min(2).max(10)
      ,
      lName: joi.string()
      ,
      phone: joi.string()
      ,
      age: joi.number()
      ,
      gender: joi.string().valid("male", "female")
}).required(),
}

export const updatePasswordSchema = {
  body: joi.object({
    oldPassword: generalRules.password.required(),
    newPassword: generalRules.password.required(),
    confirmPassword:joi.string().valid(joi.ref("newPassword")).required()
  }).required()

  }