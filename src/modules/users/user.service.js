import userModel from "../../DB/models/user.model.js";
import * as dbService from "../../DB/db.service.js";
import { Hash } from "../../common/security/hash.js"; 
import { Encrypt } from "../../common/security/encrypt.js"; 

// export const signUp = async (req, res, next) => {
//   try {
//     const { fName, lName, email, password, age, gender, phone } = req.body;
    
//     if (await userModel.findOne({ email: email.toLowerCase() })) {
//       return res.status(400).json({ message: "User already exist" });
//     }
    
//     const user = await dbService.create({
//       model: userModel,
//       data: {
//         fName,
//         lName,
//         email: email.toLowerCase(),
//         password: await Hash(password),
//         age,
//         gender,
//         phone: Encrypt(phone),
//       }
//     });
    
//     return res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     return res.status(500).json({ message: "Error in signup", error: error.message });
//   }
// };



//  const {fName, lName, email, password, age, gender, phone} = req.body;
// if(await userModel.findOne({email: email.toLowerCase()})){
//   throw new Error("User already exist", {cause: 400}) }
//   const user = await dbService.create({
//     model: userModel,
//     data: {
//       fName,
//       lName,
//       email: email.toLowerCase(),
//       password: await Hash(password),
//       age,
//       gender,
//       phone,
//       profileImage: req.file 
//     }
//   });
  
//};

export const signUp = async (req, res, next) => {
  
   const {fName, lName, email, password, age, gender, phone} = req.body;
        console.log(req.file)
      const paths = []
        for(const file of req.files.attachments){
          paths.push(file.path)
        }

if(await userModel.findOne({email: email.toLowerCase()})){
  throw new Error("User already exist", {cause: 400}) }



  const user = await dbService.create({
    model: userModel,
    data: {
      fName,
      lName,
      email: email.toLowerCase(),
      password: await Hash(password),
      age,
      gender,
      phone: Encrypt(phone),
      profileImage:req.files.attachment[0].path,
      coverImages:paths
}
})
  return res.status(201).json({ message: "User created successfully", user });
}



export const signUpWithGmail = async (req,res,next) => {
  try {
    const {idToken} = req.body;

 
  const decoded = await client.verifyIdToken({
      idToken,
      audience: "193419008535-e98ihqlvgbqp019pa9iju54ric6b4fjm.apps.googleusercontent.com",  // Specify the WEB_CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
  });
  const {family_name, given_name, picture, email_verified, email}= decoded.getPayload()
   
   let user = await userModel.findOne({email: email.toLowerCase()})
        
       if(!user){
        user= await userModel.create({
          fName:given_name,
          lName:family_name,
          email,
          profileImage:picture,
          isConfirmed:email_verified,
          provider: "google"
        })
       }
         if(user.provider == "system"){
               es.status(400).json({ msg: "login with system only" });
         }
                  
            const access_token = jwt.sign(
       { id: user._id, email: user.email },
       "mohamed123")

             const refresh_token = jwt.sign(
       { id: user._id, email: user.email },
       "ali123",
     );


const payload = decoded.getPayload();
console.log({payload});

 } catch (error) {
        res.status(500).json({ msg: "Failed to signup", error });

  } 
}



// export const getProfile = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await dbService.findOne({
//       model: userModel,
//       filter: {
//         email: email.toLowerCase(),
//         //isConfirmed:true,
//         provider: "system",
//       },
//     });
//     if (!user) {
//       return res.status(400).json({ message: "user not exist" });
//     }
//     if (!compareSync(password, user.password)) {
//       res.status(400).json({ message: "invalid password" });
//     }
//     const access_token = jwt.sign(
//       { id: user._id, email: user.email },
//       "mohamed123",
//       {
//         expiresIn: 60,
//         audience: "http://localhost:4000",
//         issuer: "http://localhost:3000",
//         notBefore: 60,
//         noTimestamp: true,
//       },
//     );
//     const refresh_token = jwt.sign(
//       { id: user._id, email: user.email },
//       "ali123",
//     );

//     return res
//       .status(200)
//       .json({ message: "Done!", tokens: { access_token, refresh_token } });
//   } catch (error) {
//     return res.status(500).json({ message: error.message, stack: error.stack });
//   }
// };

export const getProfile = async (req, res, next) => {
  try {
    const { token } = req.body;
     
     if(!token){
      return res.status(400).json({message: "Token not exist"})
     }
       
    const decoded = jwt.verify(token, "mohamed123")


    const user = await dbService.findOne({
      model: userModel,
      filter: {
        email: decoded.email.toLowerCase(),
        //isConfirmed:true,
        provider: "system",
      },
    });
    if (!user) {
      return res.status(400).json({ message: "user not exist" });
    }

    return res .status(200).json({ message: "Done!", user });
    
  } catch (error) {
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await dbService.findOne({
      model: userModel,
      data: { email: email.toLowerCase() },
    });
    if (!user) {
      // return res.status(404).json({ message: "User not found" });
      throw new Error("User not found");
    }
    if (user.isConfirmed !== true) {
      return res.status(400).json({ message: "User account is not confirmed" });
    }
    if (user.password !== password) {
      // return res.status(400).json({ message: "Invalid password" });
      throw new Error("Invalid password");
    }
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { ...user._doc, phone: Decrypt(user.phone) },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to login", error: error.message });
  }
};
