import express from "express";
import getAllItems from "./getAllItems.js";
import injectItems from "./injectItems.js";

const router = express.Router();

router.use('/item', getAllItems);
router.use('/inject', injectItems);

export default router;

