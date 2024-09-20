export class CreateReview {
  async postApi(body, id) {
    let data = await this.makeRequest(
      `http://localhost:3000/books-comments/${id}/review`,
      "PUT",
      body
    );
    return data;
  }

  // varbos y opciones
  async makeRequest(url, method, body) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        // Verifica si la respuesta es 404
        if (response.status === 404) {
          throw new Error("Reseña no encontrada");
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }
}
