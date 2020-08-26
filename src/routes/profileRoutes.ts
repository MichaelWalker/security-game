import express from "express";
import {signedIn} from "./routeHelpers";
import {fetchItemsForMember} from "../database/ownedItems";
import {updateMember} from "../database/members";
import {UpdateMember} from "../models/requestModels";

const router = express.Router();

router.get("/", signedIn(async (request, response, currentMember) => {
    const model = {
        items: await fetchItemsForMember(currentMember.id),
        currentMember: currentMember
    }
    response.render("profile.njk", model)
}));

router.post("/", signedIn(async (request, response, currentMember) => {
    const update = request.body as UpdateMember;
    await updateMember(currentMember.id, update);
    response.redirect("/profile")
}))

export default router;