import messageModel from "../../DB/models/message.model.js";
import userModel from "../../DB/models/user.model.js";
import * as dbService from "../../DB/service/db.service.js";



export const createMessage = async (req, res, next) => {
 
    const {content, userId} = req.body
      
    if(!content && !req.files.length) throw new Error ("Content is required")
     
        const userExist = await dbService.findById({
            model:userModel,
            id:userId
        })
        if(!userExist) throw new Error("user not exist")

            let urls = []
            if(req?.files?.length) {
                for(const file of req?.files){
                    urls.push(file.path)
                }
            }

            const message = await dbService.create({
                model:messageModel,
                data: {
                    content,
                    attachments: urls,
                    userId
                }
            })


    return res.status(201).json({ message: "Done", message });

};
