const { Tag } = require("../models");

const adminController = {
    accessControl: (req, res, next) => {
        const user = req.session.user;
        console.log("access control : ", user.email, user.role);
        if (user && user.role === "admin") {
            next();
        } else {
            res.status(401).send("E 401. Access denied.");
        }
    },
    adminRoot: async (req, res) => {
        try {
                const tags = await Tag.findAll();
            // if(!found[1]){
            //     found[0].save()
            // }
            res.status(200).render("adminRoot",{tags});
        } catch (e) {
            console.error(e);
        };


    },
    updateTags: async (req, res) => {
        try {
            console.log(req.body);
            if (!req.body.id) {
                const found = await Tag.findOrCreate(
                    {
                        where: {
                            name: req.body.tagName,
                        }
                    }
                );
            } else {

            };

            // if(!found[1]){
            //     found[0].save()
            // }
            res.redirect("/admin");
        } catch (e) {
            console.error(e);
        };
    },
    // addTag: async (req, res) => {
    //     try {
    //         const found= await Tag.findOrCreate(
    //             {
    //                 where:{
    //                     name:req.body.name,
    //                 }
    //             }
    //         );
    //         // if(!found[1]){
    //         //     found[0].save()
    //         // }

    //     } catch (e) {
    //         console.error(e);
    //     };
    // },
}

module.exports = adminController;