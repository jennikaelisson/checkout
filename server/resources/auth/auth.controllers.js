const fetchUsers = require("../../utils/fetchUsers")

const register = async (req, res) => {
    // Validering först? 
    const {email, password} = req.body 

    const users = await fetchUsers()
    const userAlreadyExists = users.find(u => u.email === email)

    if (userAlreadyExists) {
        return res.status(400).json("User already exists")
    }

}

module.exports = {register} 