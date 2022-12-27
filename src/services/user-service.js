const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user){
        try {
            const  result =  jwt.sign(user , JWT_KEY , { expiresIn : '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in Token Creation ");
            throw error;
        }
    }

    verifyToken(Token){
        try {
            const result = jwt.verify(Token , JWT_KEY);
            console.log(result);
            return result;
        } catch (error) {
            console.log("Something went wrong in Token verification " , error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword , encryptedPassword ){
        try {
            return bcrypt.compareSync(userInputPlainPassword , encryptedPassword);
        } catch (error) {
            console.log("Something went wrong while comparing passwords ");
            return error;
        }
    }

    async signIn(email , Plainpassword ){
        try {
            // step 1 -> fetch the user using the email 
            const user = await this.UserRepository.findByEmail(email);
            const passwordMatch = this.checkPassword( Plainpassword , user.password);

            console.log(passwordMatch);
            // step 2 -> comapre incoming password with stored encrypted Password
            if(!passwordMatch){
                console.log("password dosen't match");
                throw { error : 'Incorrect Password '};
            }
            // step 3 -> if password match then create a token and send it to the user 
            const newJwtToken = this.createToken({email : user.email , id : user.id});
            console.log('new token is ' , newJwtToken);
            return newJwtToken;

        } catch (error) {
            console.log("Something went wrong while signIn Process " , error);
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error:"Invalid token"}
            } 
            const user = this.UserRepository.findById(response.id);
            if(!user){
                throw {error:"No user with the corresponding token exist"}
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth Process ");
            throw error;
        }
    }
}

module.exports = UserService;