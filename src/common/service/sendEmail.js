import { randomInt, randomUUID } from "crypto";
import nodemailer from "nodemailer";

const sendEmail = async({to, subject, html, attachments} = {}) => {

     const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"moamrelsamra@gmail.com",
            pass: "ltri bvka tnwo fwdt"
        }
     })


     const info = await transporter.sendMail({
        from:' "Mohamed"<moamrelsamra@gmail.com>',
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