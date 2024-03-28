const fetchUsers = require("../../utils/fetchUsers")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    // Validering först? 
    const {email, password} = req.body 

    const users = await fetchUsers()
    const userAlreadyExists = users.find(u => u.email === email)

    if (userAlreadyExists) {
        return res.status(400).json("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    

}

module.exports = {register} 