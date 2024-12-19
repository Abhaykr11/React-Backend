export const send=(res,responseData,data={})=>{ 
    // Send is function and below send is js default function
    const{code,message}=responseData;
    res.status(200);

    return res.send({
        responseCode:code,
        responseMessage:message,
        responseDate:data,
    });
};

export const setErrorRes=(res,parameter)=>{
    return{
        code:res.code,
        message:`${parameter} ${res.message}`,

    };
};