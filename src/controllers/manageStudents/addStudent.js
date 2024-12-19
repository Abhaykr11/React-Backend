import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrorRes } from "../../helper/responseHelper.js";

router.post("/", (req, res) => {
  try {
    const { name, rollno, email } = req.body;

    if (!name || name == undefined) {
    //  const response=RESPONSE.REQUIRED;
    //  return res.json({
    //     code:response.code,
    //     message:"name "+response.message,
    //  });
    return send(res,setErrorRes(RESPONSE.REQUIRED,"name"))
    }
    if (!rollno || rollno == undefined) {
        // const response=RESPONSE.REQUIRED;
        // return res.json({
        //    code:response.code,
        //    message:"roll "+response.message,
        // });

        return send(res,setErrorRes(RESPONSE.REQUIRED,"rollno"))
      }
       if (!email || email == undefined) {
        // const response=RESPONSE.REQUIRED;
        // return res.json({
        //    code:response.code,
        //    message:"email "+response.message,
        // });
        return send(res,setErrorRes(RESPONSE.REQUIRED,"email"))
       }
   
    

    console.log({ name, rollno, email });
    

    studentModel.create({
      name: name,
      rollno: rollno,
      email: email,
    });
    

    return send(res,RESPONSE.SUCCESS)
  } catch (error) {
    
    return send(RESPONSE.UNKNOWN_ERR)
  }
});

export default router;
