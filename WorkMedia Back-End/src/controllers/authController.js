const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

// Access Routes Control

class authController{
    // Authorization for users still logged RF 01
    static async authLogged(req, res){  
        const token = req.body.token;
        if(!token) return res.status(403).send("Acess Denied");
        try{
            const userVerifed = jwt.verify(token, process.env.SECRET_TOKEN);
            if(!userVerifed) return res.status(403).send("Access Denied");
            req.user = userVerifed;
            res.status(202).send("Access authorized");
        } catch(err){
            res.status(403).send("Acess Denied");
        }
    }
    // Authorization for admin routes RF 02
    static async authAdmin(req, res){ 
        const token = req.body.token;
        if(!token) return res.status(403).send("Access Denied");
        try {
            const userSelected = await userModel.findOne({email: req.body.email});
            if(userSelected.admin !== true) return res.status(403).send('Access Denied');
            const userVerifed = jwt.verify(token, process.env.SECRET_TOKEN);
            if(!userVerifed) return res.status(403).send('Access Denied');
            res.status(202).send("Access Granted");
        } catch (error) {
            res.status(403).send("Access Denied");
        }
    }
    // Authorization for private user pages RF 03
    static async authPrivatePage(req, res){
 
        const token = req.body.token;
        const {id} = req.params;
        if(!token) return res.status(403).send('Access Denied4');
        try {
            const authorization = jwt.verify(token, process.env.SECRET_TOKEN);
            
            if(!authorization) return res.status(403).send('Access Denied2');
            
            const user = await userModel.findOne({email: req.body.email});
            
            if(!user)return res.status(403).send('Access Denied3');

            if(id != user._id) return res.status(403).send('Access Denied1');
            
            res.status(202).send('Access Granted');
        } catch (error) {
            res.status(403).send('Access Denied10' + error);            
        }

    }
}
module.exports = authController;