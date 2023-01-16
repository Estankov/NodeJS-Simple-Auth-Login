const user = require('../models/user')
const User = require('../models/user')


const isAdmin = async (req, res, next) => {

    try {

        const user = await User.findById(req.user._id)

        if (user.role !== 1) {
            return res.status(401).send('Acesso não autorizado!')
        } else {
            next()
        }

    } catch (err) {
        console.log(err)
    }

}

module.exports = isAdmin