import { Hash } from "../../common/security/hash.js";
import userModel from "../../DB/models/user.model.js";
import { getValue, ttl, incr, setValue } from "../../DB/service/redis.service.js";


export const sendEmailOtp = async ({email, isConfirmed , subject= "Confirm Email"} = {}) => {

    const isBlocked = await ttl(`otp::block::${email}`)
  if(isBlocked>0) throw new Error(`you blocked, you can reSend otp after ${ttlOtp} Seconds`)
    const ttlOtp = await ttl(`otp::${email}`)
  if(ttlOtp>0)  throw new Error(` you can reSend otp after ${ttlOtp} Seconds`)
  const max_otp = await getValue(`otp::max::${email}`)
  if(max_otp>=3){
    await setValue({
      key:`otp::block::${email}`,
      value:"1",
      ttl:60 * 10
    })
    throw new Error ("You have exceeded  the max. number of tries")
  }
     
  if (await userModel.findOne({ email: email.toLowerCase() })) {
    throw new Error("User already exist", { cause: 400 });
  }
        const user = await findOne({
          model: userModel,
          filter:{
            email,
          isConfirmed: {$exists: isConfirmed}
        }
          
        })
        
     if(!user) throw new Error ("Email not exist or already confirmed")
     const otp =  generate_otp()
     const otpHash= await Hash(otp)
     await setValue({
      key:`otp::${email}`,
      value:otpHash,
      ttl: 60 * 20
     })

     
          eventEmitter.emit("confirm_email", async () => {
             await sendEmail({
          to: email,
          subject:"Confirm Email",
          html:`<h1>otp:${otp} </h1>`
         })
          })
        
 await incr (`otp::max::${email}`)
}