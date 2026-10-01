import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 15,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider == "system"? true : false
      },
      trim: true,
    },
    age: {
      type: Number,
      required: function () {
        return this.provider == "system"? true : false
      },
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      default: "male",
    },
    profileImage: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ["system", "google"],
      default: "system",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
