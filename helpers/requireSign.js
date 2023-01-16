const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const requireSign = async (req, res, next) => {

    try {

        const decoded = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch(error) {
        return res.status(401).json({error:"acesso negado"})
    }

}

module.exports = requireSign