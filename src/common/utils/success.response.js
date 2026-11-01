import  messageModel  from "../../DB/models/message.model.js";


export const success_response = ({
res,
statusCode,
message= "Done",
data= undefined

} = {}) => {
    return  res.status(statusCode || 200).json({message, data})
}