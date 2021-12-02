const userController = {
    accessControl: (req, res, next) => {
        const user = req.session.user;
        if (user) {
            next();
        } else {
            res.status(401).send("E 401. Access denied.");
        }
    },
}

module.exports = userController;