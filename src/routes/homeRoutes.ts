import express from "express";
import {signedIn} from "./routeHelpers";

const router = express.Router();

router.get("/", signedIn((request, response, currentMember) => {
    const model = {
        currentMember: currentMember
    }
    response.render("home.njk", model)
}));

export default router;