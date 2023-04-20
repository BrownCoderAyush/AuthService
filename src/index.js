const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index'); 
const {PORT} = require('./config/serverConfig');
const db = require('./models/index');
const {User , Role} = require('./models/index');


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

        
        // const role = await Role.findByPk(1);
        // console.log(role);

        // const u1 = await User.findByPk(1);
        // u1.addRole(role);
        // console.log(u1);
        // u1.addRole()
        // const r = await Role.findByPk(1);
        // u1.addRole(r);
        // const z = await u1.getRoles();
        // await Role.create({name : 'Customer'});
        // const userService = new UserService();
        // const newToken = userService.createToken({email : 'sanket@admin.com' , id : 1 });
        // console.log("new token is " , newToken);
        // const response = userService.verifyToken(newToken);
        // console.log("after verification " , response);


    })
}

prepareAndStartServer();