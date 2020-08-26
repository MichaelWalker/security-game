import express from "express";
import {addCoinsToMember, addDiamondsToMember, fetchAllMembers, fetchMemberById} from "../database/members";
import {adminOnly} from "./routeHelpers";
import {fetchAllItems, insertItem} from "../database/items";
import {NewItem} from "../models/requestModels";

const router = express.Router();

router.get("/", adminOnly(async (request, response) => {
    const model = {
        members: await fetchAllMembers(),
        items: await fetchAllItems(),
    }
    response.render("adminHome.njk", model)
}));

router.post("/add-item", adminOnly(async (request, response) => {
    const newItem = request.body as NewItem;
    await insertItem(newItem);
    response.redirect("/admin");
}));

router.get("/members/:id", adminOnly(async (request, response) => {
    const id = parseInt(request.params.id);
    const model = {
        member: await fetchMemberById(id)
    };
    response.render("adminMember.njk", model)
}));

router.post("/members/:id/add-coins", adminOnly(async (request, response) => {
    const id = parseInt(request.params.id);
    const coinsToAdd = request.body.coins;
    await addCoinsToMember(id, coinsToAdd);
    response.redirect(`/admin/members/${id}`);
}));

router.post("/members/:id/add-diamonds", adminOnly(async (request, response) => {
    const id = parseInt(request.params.id);
    const diamondsToAdd = request.body.diamonds;
    await addDiamondsToMember(id, diamondsToAdd);
    response.redirect(`/admin/members/${id}`);
}));

export default router;
