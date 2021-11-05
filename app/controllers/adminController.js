const adminController = {
    accessControl: (req, res, next) => {
        const user = req.session.user;
        console.log("access control : ",user.email,user.role);
        if (user && user.role === "admin") {
            next();
        } else {
            res.status(401).send("E 401. Access denied.");
        }
    },
    adminRoot: (req, res) => {
        res.status(200).render("adminRoot");
    }
}

module.exports = adminController;