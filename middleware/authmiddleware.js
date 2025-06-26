const jwt = require('jsonwebtoken');

function authmiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg: "Authorization header is missing"});
    }
    const token = authHeader.split("")[1];

    try {
        const [username, userid] = jwt.verify(token, process.env.JOURNAL);
        
        req.user = { username, userid };
        next();
    } catch (error) {
        return res.status(401).json({msg: "Invalid token"});
    }
}

module.exports = authmiddleware;