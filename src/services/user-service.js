const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');

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
            return result;
        } catch (error) {
            console.log("Something went wrong in Token verification " , error);
            throw error;
        }
    }
}

module.exports = UserService;