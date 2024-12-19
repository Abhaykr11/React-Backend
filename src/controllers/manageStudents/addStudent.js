import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrorRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.post("/",async(req, res) => {
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
        return send(res,setErrorRes(RESPONSE.REQUIRED,"email"));
       }
   
    // let isExist=await studentModel.find({
    //   rollno:rollno,
    // });

    let isEmail=validator.isEmail(email);
    
    if(!isEmail){
      return send(res,setErrorRes(RESPONSE.INVALID,"email"));
    }


    let isExist = await studentModel.aggregate([
      {
        $match: {
          rollno: rollno,
          isactive:STATE.ACTIVE,
        }
      },
      
    ]);
    
    if (isExist.length > 0) {
      return send(res.setErrorRes(RESPONSE.ALREADY_EXISTS))
    }


    // console.log({ name, rollno, email });
    

    // studentModel.create({
    //   name: name,
    //   rollno: rollno,
    //   email: email,
    // });
    

    return send(res,RESPONSE.SUCCESS)
  } catch (err) {
    console.error('An error occurred:', err);
  }
});

export default router;
