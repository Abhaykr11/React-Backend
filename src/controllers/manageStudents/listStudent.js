import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrorRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.get("/",async(req, res) => {
  try {
let student_id=req.query.student_id;
    console.log(student_id)



    let studentData=await studentModel.aggregate([
        {
            $match:{
                _id:student_id,
                isactive:STATE.ACTIVE,
            },
        },
        {
          $project:{
            isactive: 0,
            __v:0
          }
        }
    ]);
    
    if(studentData.length==0){
      return send(res,setErrorRes(RESPONSE.NOT_FOUND, "student data"))
    }
    return send(res,RESPONSE.SUCCESS, studentData)
  } catch (err) {
    console.error('An error occurred:', err);
    return send(res,RESPONSE.UNKNOWN_ERR);
  }
});

export default router;
