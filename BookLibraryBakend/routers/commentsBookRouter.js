import express from "express";
import { Router } from "express";

import { addOrUpdateReview,getReview } from "../controllers/commentBook.js";

const router = Router();

router.get('/get-review/:book_id', getReview);
router.put('/:book_id/review', addOrUpdateReview);


export default router;