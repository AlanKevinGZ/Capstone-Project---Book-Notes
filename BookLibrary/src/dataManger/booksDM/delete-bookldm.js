export class DeleteBook {

  async deleteApi(id) {
    let data = await this.makeRequest(
      `http://localhost:3000/books/delete-book/${id}`,
      "DELETE",
    );
    return data;
  }

  // varbos y opciones
  async makeRequest(url, method,) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // Manejar el error según el código de estado
        const errorMessage = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${errorMessage}`
        );
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }
}
