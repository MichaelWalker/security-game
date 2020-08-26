import express from "express";
import {signedIn} from "./routeHelpers";

const router = express.Router();

router.get("/payment", signedIn((request, response) => {
    response.render("payment.njk")
}));

export default router;