
import { db } from "../config/DB.js";

// Obtener todos los libros
 const getBooks = async (req, res) => {
   try {
    const result = await db.query('SELECT * FROM books ORDER BY created_at ASC');
    res.json(result.rows)
   } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
   }
    
  };

  const getBooksById = async (req, res) => {
    const { book_id } = req.params;

    try {
      
      const result = await db.query('SELECT title, author, isbn, to_char(published_date, \'YYYY-MM-DD\') as published_date FROM books WHERE id = $1', [book_id]);

      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener el libro con su reseña:', error);
      res.status(500).json({ error: 'Error al obtener el libro con su reseña' });
    }

  }

   const createBook = async (req, res) => {
    const { title, author, isbn, published_date } = req.body;
    try {
        let cover_url=`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
        const result = await db.query(
            'INSERT INTO books (title, author, isbn, published_date, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, isbn, published_date, cover_url]
          );
          res.status(201).json(result.rows[0]);   
    } catch (err) {
        console.log(err);    
      res.status(500).json({ error: 'Error al agregar el libro' });
    }
  };

  const getBookWithReview = async (req, res) => {
    const { book_id } = req.params;
  
    try {
      // Hacer un LEFT JOIN para obtener el libro y su reseña (si existe)
      const result = await db.query(
  `SELECT 
      books.*, 
      to_char(books.published_date, 'YYYY-MM-DD') as published_date, 
      reviews.review_text, 
      to_char(reviews.created_at, 'YYYY-MM-DD') as created_at, 
      to_char(reviews.updated_at, 'YYYY-MM-DD') as updated_at
   FROM books
   LEFT JOIN reviews ON books.id = reviews.book_id
   WHERE books.id = $1`, 
   [book_id]
);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener el libro con su reseña:', error);
      res.status(500).json({ error: 'Error al obtener el libro con su reseña' });
    }
  };
  

  const editBook = async (req, res) => {
    const { book_id } = req.params;
    const { title, author, isbn, published_date } = req.body;
    try {
        let cover_url=`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
      const existingBook = await db.query('SELECT * FROM books WHERE id = $1', [book_id]);

      if (existingBook.rows.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }

      const result = await db.query(
        `UPDATE books
         SET title = $1, author = $2, isbn = $3, published_date = $4, cover_url = $5
         WHERE id = $6 RETURNING *`,
        [title, author, isbn, published_date, cover_url, book_id]
      );
  
      res.json({ message: 'Libro actualizado', book: result.rows[0] });

         
    } catch (err) {
      console.log(err);
      
      res.status(500).json({ error: 'Error al actualizar el libro' });
    }
  };


  const deleteBook = async (req, res) => {
    const { book_id } = req.params;
    try {
      const existingBook = await db.query('SELECT * FROM books WHERE id = $1', [book_id]);

      if (existingBook.rows.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }

      await db.query('DELETE FROM books WHERE id = $1', [book_id]);
  
      res.json({ message: 'Libro Eliminado'});

         
    } catch (err) {
      console.log(err);
      
      res.status(500).json({ error: 'Error al actualizar el libro' });
    }
  };



export {
    getBooks, 
    getBooksById,
    createBook,
    editBook,
    deleteBook,
    getBookWithReview
}