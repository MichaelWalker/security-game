import express from "express";
import {signedIn} from "./routeHelpers";
import {addCoinsToMember, addDiamondsToMember} from "../database/members";

const router = express.Router();

router.get("/", signedIn((request, response, currentMember) => {
    const model = {
        currentMember: currentMember
    }
    response.render("game.njk", model)
}));

router.post("/record-win", signedIn(async (request, response, currentMember) => {
    await addCoinsToMember(currentMember.id, 30);
    response.redirect("/game");
}));

router.post("/record-jackpot", signedIn(async (request, response, currentMember) => {
    await addDiamondsToMember(currentMember.id, 1);
    response.redirect("/game");
}));

router.post("/record-loss", signedIn(async (request, response, currentMember) => {
    await addCoinsToMember(currentMember.id, -10);
    response.redirect("/game");
}));

export default router;
