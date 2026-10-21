import mongoose from "mongoose";

export const revokeTokrnSchema = new mongoose.Schema(
  {
    
    tokenid: {
      type: String,
      required: true,
      trim: true,
    },
    userid: {
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
     expireAt: Date
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
  }
);

 revokeTokrnSchema.index({expireAt: 1}, {expireAfterSeconds:0})

 const revokTokenModel = mongoose.models.revokeToken || mongoose.model("revokeToken", revokeTokenSchema)
 
 export default revokTokenModel;
