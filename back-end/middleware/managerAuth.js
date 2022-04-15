const jwt = require('jsonwebtoken');

function managerAuth(req, res, next) {
    const token = req.header('x-manager-token');
    if (!token) return res.status(401).send("Access denied");
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        res.status(400).send('Invalid token')
    }
}

module.exports = managerAuth;