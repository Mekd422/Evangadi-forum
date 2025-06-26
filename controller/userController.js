const dbconnection = require('../db/dbconfig');
const bcrypt = require('bcrypt');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');


async function register(req, res){
    const { username, firstname, lastname, email, password } = req.body;

    if (!username || !firstname || !lastname || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "All fields are required"});
    }

    try {
        const [user] = await dbconnection.query("SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email]
        );
        if (user.length > 0) {
            return res.status(400).json({msg: "Username or email already exists"});
        }
        if (password.length < 6) {
            return res.status(400).json({msg: "Password must be at least 6 characters long"});
        }
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        await dbconnection.query("INSERT INTO users(username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
            [username, firstname, lastname, email, hashedPassword]
        );
        return res.status(201).json({msg: "User registered successfully"});
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg: "Internal server error"});
    }
}

    

async function login(req, res){
    const { username, password, email } = req.body;

    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Username and password are required"});
    }

    try {
        const [user] = await dbconnection.query("SELECT username, userid, password from users where email = ?", [email]);
        if (user.length === 0) {
            return res.status(400).json({msg: "Invalid username or password"});
        }

        const isMatched = await bcrypt.compare(password, user[0].password)
        if (!isMatched) {
            return res.status(400).json({msg: "Invalid username or password"});
        }
        // Here you would typically generate a token and send it back to the client
        const userid = user[0].userid;
        const userName = user[0].username;
        const token = jwt.sign({ userid, userName }, "secret", { expiresIn: '1h' });
        return res.status(200).json({ msg: "Login successful", token });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg: "Internal server error"});
    }
}

async function check(req, res){
    const username = req.user.username;
    const userid = req.user.userid;
    return res.status(200).json({msg: "User is authenticated", username, userid});
}

module.exports = {register, login, check};