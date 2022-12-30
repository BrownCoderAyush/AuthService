const ValidationError = require('../utils/validation-error');
const { User, Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const { StatusCodes } = require('http-status-codes');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name = 'SequelizeValidationError'){
                console.log('creating new validation error');
                throw new ValidationError(error);
            }    
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async delete(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            }
            )
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async findById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async findByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email send in the request',
                    'Check email , no user record found',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log("invalid email" , error);
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);

        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

}

module.exports = UserRepository;