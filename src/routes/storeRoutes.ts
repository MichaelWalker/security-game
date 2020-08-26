import express from "express";
import {signedIn} from "./routeHelpers";
import {fetchAllItems, fetchItemById} from "../database/items";
import {addCoinsToMember, addDiamondsToMember} from "../database/members";
import {addOwnedItem} from "../database/ownedItems";

const router = express.Router();

router.get("/", signedIn(async (request, response, currentMember) => {
    const model = {
        items: await fetchAllItems(),
        currentMember: currentMember
    }
    response.render("store.njk", model)
}));

router.post("/", signedIn(async (request, response, currentMember) => {
    const itemId = request.body.itemId;
    const item = await fetchItemById(itemId);
    await addOwnedItem(currentMember.id, itemId);
    if (item.price_coins > 0) {
        await addCoinsToMember(currentMember.id, -1 * item.price_coins);
    }
    if (item.price_diamonds > 0) {
        await addDiamondsToMember(currentMember.id, -1 * item.price_diamonds);
    }
    response.redirect("/store");
}));

export default router;