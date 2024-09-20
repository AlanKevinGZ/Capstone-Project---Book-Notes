import express from "express";
import cors from "cors";
import { db } from "./config/DB.js";

import bookRoutes from './routers/booksRouter.js'; 
import commentsRoutes from './routers/commentsBookRouter.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

db.connect((err) => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to database');
    }
  });

app.use('/books', bookRoutes)
app.use('/books-comments', commentsRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  