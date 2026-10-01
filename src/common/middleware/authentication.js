

export const authentication = (req, res, next) => {
    const {authorization} = req.headers;
        if(!authorization){
      return res.status(400).json({message: "Token not exist"})
     }
       
    const decoded = jwt.verify(authorization, "mohamed123")
 

    // const user = await dbService.findOne({
    //   model: userModel,
    //   filter: {
    //     email: decoded.email.toLowerCase(),
    //     //isConfirmed:true,
    //     provider: "system",
    //   },
    // });


}


