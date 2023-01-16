const User = require('../models/user')
const hashPassword = require('../helpers/hashPassword')
const comparePassword = require('../helpers/comparePassword')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = class AuthController {

    static async registerUser(req, res) {
        
        try {

            const { name, email, password } = req.body
            
            if (!name) {
                return res.status(400).json({error: "Nome é obrigatório"})
            }

            if (!email) {
                return res.status(400).json({error: "E-mail é obrigatório"})
            }

            if (!password || password.lenght < 6) {
                return res.status(400).json({error: "Senha deve ter no mínimo 6 caracteres"})
            }

            const existeUser = await User.findOne({email:email})

            if (existeUser) {
                return res.status(400).json({error:"Utilize outro e-mail"})
            }

            const hashedPassword = await hashPassword(password)

            const user = await new User({name, email , password: hashedPassword}).save()

            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

            res.json({
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            })

        } catch (err) {
            console.log(err)
        }
        
    }

    static async login(req, res) {

        try {

            const {email, password} = req.body

        if (!email) {
            return res.status(400).json({error:"Informar E-mail"})
        }

        if (!password) {
            return res.status(400).json({error:"Informar senha"})
        }

        const user = await User.findOne({email:email})

        if (!user) {
            return res.status(400).json({error:"Usuário não encontrado"})
        }

        const match = await comparePassword(password, user.password)
        console.log(match)

        if (!match) {
            return res.status(400).json({error:"Senha inválida"})
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })


        } catch (err) {
            console.log(err)
        }

    }

    static async secret(req, res) {
        res.json({currentUser: req.user})
    }

}