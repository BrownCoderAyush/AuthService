const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index'); 
const {PORT} = require('./config/serverConfig');
const db = require('./models/index');
const {User , Role} = require('./models/index');
const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');
const app = express();

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));    

    app.use('/api/', apiRoutes);

    app.listen(PORT ,async ()=>{

        console.log(`Server Started on Port : ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter:false});
        }
        const u1 = await User.findByPk(11);
        const r = await Role.findByPk(1);
        u1.addRole(r);
        // const z = await u1.getRoles();
        // const userService = new UserService();
        // const newToken = userService.createToken({email : 'sanket@admin.com' , id : 1 });
        // console.log("new token is " , newToken);
        // const response = userService.verifyToken(newToken);
        // console.log("after verification " , response);


    })
}

prepareAndStartServer();