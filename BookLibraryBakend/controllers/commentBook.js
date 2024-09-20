import { db } from "../config/DB.js";

const getReview = async (req, res) => {
  try {
    const { book_id } = req.params;
    const existingReview = await db.query('SELECT * FROM reviews WHERE book_id = $1', [book_id]);

    if (existingReview.rows.length === 0) {
      return res.status(404).json({ error: 'Error: No existe la reseña' });
    }

    return res.status(200).json({ review: existingReview.rows[0] });
  } catch (error) {
    console.error('Error fetching review:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};


const addOrUpdateReview = async (req, res) => {
  const { book_id } = req.params;
  const { review_text } = req.body;

  try {
    // Verificar si el libro existe
    const bookExists = await db.query('SELECT * FROM books WHERE id = $1', [book_id]);

    if (bookExists.rows.length === 0) {
      return res.status(404).json({ error: 'El libro no existe' });
    }

    // Verificar si ya existe una reseña para el libro
    const existingReview = await db.query('SELECT * FROM reviews WHERE book_id = $1', [book_id]);

    if (existingReview.rows.length > 0) {
      // Actualizar la reseña existente
      const result = await db.query(
        'UPDATE reviews SET review_text = $1, updated_at = CURRENT_TIMESTAMP WHERE book_id = $2 RETURNING *',
        [review_text, book_id]
      );
      return res.status(200).json({ message: 'Reseña actualizada', review: result.rows[0] });
    } else {
      // Crear una nueva reseña
      const result = await db.query(
        'INSERT INTO reviews (book_id, review_text) VALUES ($1, $2) RETURNING *',
        [book_id, review_text]
      );
      return res.status(201).json({ message: 'Reseña creada', review: result.rows[0] });
    }
  } catch (err) {
    console.error('Error al agregar o actualizar la reseña:', err);
    res.status(500).json({ error: 'Error al agregar o actualizar la reseña' });
  }
};


  export {
    addOrUpdateReview, 
    getReview
}