import express from "express";
import { Router } from "express";

import { createBook, getBooks,getBooksById,getBookWithReview,editBook,deleteBook } from "../controllers/bookControllers.js";

const router = Router();

router.get('/', getBooks);
router.get('/get-book/:book_id', getBooksById);
router.get('/get-book-Review/:book_id', getBookWithReview);
router.post('/create-book', createBook);
router.put('/edit-book/:book_id', editBook);
router.delete('/delete-book/:book_id', deleteBook);

export default router;
