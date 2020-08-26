import express from "express";
import passport from "passport";
import {RegisterRequest} from "../models/requestModels";
import {generateSaltAndHash} from "../services/auth";
import {insertMember} from "../database/members";

const router = express.Router();

router.get("/login", (request, response) => {
    response.render("login.njk")
});

router.post("/login", passport.authenticate('local', { 
    successRedirect: "/",
    failureRedirect: "/auth/login" 
}));


router.get("/register", (request, response) => {
    response.render("register.njk")
});

router.post("/register", async (request, response) => {
    const registerRequest = request.body as RegisterRequest;
    const hashResult = generateSaltAndHash(registerRequest.password);
    const member = await insertMember({
        name: registerRequest.name,
        email: registerRequest.email,
        salt: hashResult.salt,
        hashedPassword: hashResult.hash
    });
    request.logIn(member, () => response.redirect("/"));
})

export default router;