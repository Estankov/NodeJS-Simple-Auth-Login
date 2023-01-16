const bcrypt = require('bcrypt')


const comparePassword = async (password, hashed) => {

    return  await bcrypt.compare(password, hashed)

}

module.exports = comparePassword