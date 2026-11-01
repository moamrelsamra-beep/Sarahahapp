import { randomInt, randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { EMAIL } from "../../../config/config.service.js";
import { PASSWORD } from "../../../config/config.service.js";



const sendEmail = async({to, subject, html, attachments} = {}) => {

     const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"EMAIL",
            pass: "PASSWORD"
        }
     })


     const info = await transporter.sendMail({
        from:' "Mohamed"<${EMAIL}>',
        to,
        subject,
        html: html || "",
        attachments: attachments || []
     });

     return info.accepted.length > 0 ? true : false
} 

export const generate_otp = async () => {

    return randomInt(100000, 1000000).toString()
}

export default sendEmail