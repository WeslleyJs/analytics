const User = require('../models/Users');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');


module.exports = class UserController {
    static async register(req, res) {
        const {
            name,
            email,
            phone,
            password,
            confirmpassword } = req.body;

        //validações

        if (!name) {
            res
                .status(422)
                .json({ message: "Nome Obrigatório" });
            return;
        }
        if (!email) {
            res
                .status(422)
                .json({ message: "Email obrigatório" });
            return;
        }
        if (!password) {
            res
                .status(422)
                .json({ message: "Senha obrigatória" });
            return;
        }
        if (!confirmpassword) {
            res
                .status(422)
                .json({ message: "Confirmação de senha obrigatória" });
            return;
        }
        if (confirmpassword !== password) {
            res
                .status(422)
                .json({ message: "Senhas diferentes" });
            return;
        }
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            res
                .status(422)
                .json({ message: "E-mail já cadastro, por favor utilize outro" });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash,
            phone,
        })
        try {
            const newUser = await user.save();
            await createUserToken(newUser, req, res);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
    static async login(req, res){
        const email = req.body.email;
        const password = req.body.password;
        
        if(!email){
            res.status(422).json({message: "Email não localizado"});
            return;
        }
        if(!password){
            res.status(422).json({message: "Senha obrigatoria"});
            return;
        }
        //check email
        const user = await User.findOne({email: email});
        if(!user){
            res.status(422).json({message: "Usuário não cadastrado"});
            return;
        }
        //check password 
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
           res.status(422).json({message: "Senha não localizada"}); 
            return;
        }
        res.redirect('/');
    }
    static async checkUser(req, res){
        let currentUser;

        if(req.headers.authorization){
            const token = getToken(req);
            const decoded = jwt.verify(token, '45&3NJIDdE2x');

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        }else{
            currentUser = null
        }

        res.status(200).send(currentUser);
    }
    static async getUserById(req, res){
        const id = req.params.id;

        const user = await user.findById(id).select('-password');

        if(!user){
            res.status(422).json({
                message: 'Usuário não encontrado'
            })
            return
        }
        res.status(200).json({ user });
    }
}
