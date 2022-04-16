const jwt = require("jsonwebtoken");

function customerOrManagerAuth(req, res, next) {
    const customerToken = req.header("x-customer-token");
    const managerToken = req.header('x-manager-token');

    if (!(customerToken || managerToken)) return res.status(401).send("Access denied");
    try {
        if (customerToken)
            jwt.verify(customerToken, process.env.JWT_KEY);
        else if(managerToken)
            jwt.verify(managerToken, process.env.JWT_KEY);
        next();
    } catch (e) {
        res.status(400).send("Invalid token");
    }
}

module.exports = customerOrManagerAuth;