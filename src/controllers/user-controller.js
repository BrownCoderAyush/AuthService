const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res)=>{
    try {
        const response = await userService.create({
            email : req.body.email , 
            password : req.body.password
        })
        return res.status(201).json({
            success : true , 
            message : "Successfully Created a new user" , 
            data : response ,
            err : {
                
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message : error.message,
            data : {},
            err: error.explaination ,
            success : false
        })
    }

}

const get = async (req,res)=>{
    try {
        const response = await userService.getByUserId(req.params.userId);
        return res.status(201).json({
            success : true , 
            message : "Successfully fetched a user" , 
            data : response ,
            err : {
            }
        })        
    } catch (error){
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            err: error ,
            success : false
        })
    }
}


const signIn = async (req,res)=>{
        try {
            const response = await userService.signIn(req.body.email , req.body.password);
            return res.status(200).json({
                success : true , 
                data : response , 
                err : {} , 
                message : "Successfully signedIn"
            });
          
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({
                message : "Something went wrong while signingIn",
                data : {},
                err: error ,
                success : false
            })
        }
}
const isAuthenticated = async (req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err : {} , 
            data : response , 
            message : 'user is authenticated and token is valid'
        })
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            err: error ,
            success : false
        })
    }
    
}


const isAdmin = async (req,res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data : response ,
            err : {},
            success : true ,
            message : "successfully fetched weather user is admin or not"
        })
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            err: error ,
            success : false
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
    get
}