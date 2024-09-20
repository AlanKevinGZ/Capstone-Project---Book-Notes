import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { GetBookById } from "../../dataManger/booksDM/get-bookId-dm.js";
import { EditBook } from "../../dataManger/booksDM/edit-book-dm.js";

export class EditBookPage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: "Helvetica Neue", Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        font-size: 2rem;
        color: #004b87;
        margin-bottom: 20px;
        text-align: center;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      label {
        font-weight: bold;
        color: #004b87;
      }

      input,
      textarea {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        width: 100%;
      }

      button {
        padding: 10px 15px;
        background-color: #004b87;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
      }

      button:hover {
        background-color: #003366;
      }

      .error {
        color: red;
        font-size: 0.875rem;
      }
    `,
  ];

  static get properties() {
    return {
      book: { type: Object },
      getResponse: { type: Object },
      error: { type: String },
      msg: { type: Object },
    };
  }

  constructor() {
    super();
    this.bookId = null;
    this.msg = {};
    this.getBook = new GetBookById();
    this.editBook = new EditBook();
    this.book = {
      title: "",
      author: "",
      isbn: "",
      published_date: "",
    };
    this.error = "";
  }

  firstUpdated() {
    // Accedemos a los parámetros de la ruta usando `this.location.params`
    this.bookId = this.location.params.id;
    this.getBookById();
  }

  formatDate(value) {
    // Remove non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Format the numbers into YYYY-MM-DD
    let formattedDate = "";

    if (numbers.length > 0) {
      formattedDate = numbers.substring(0, 4);
    }
    if (numbers.length > 4) {
      formattedDate += "-" + numbers.substring(4, 6);
    }
    if (numbers.length > 6) {
      formattedDate += "-" + numbers.substring(6, 8);
    }

    return formattedDate;
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "published_date") {
      this.book = { ...this.book, [name]: this.formatDate(value) };
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let titleInput = this.shadowRoot.querySelector("#title").value.trim();
    let authorInput = this.shadowRoot.querySelector("#author").value.trim();
    let isbnInput = this.shadowRoot.querySelector("#isbn").value.trim();
    let published_dateInput = this.shadowRoot
      .querySelector("#published_date")
      .value.trim();

    this.book = {
      title: titleInput,
      author: authorInput,
      isbn: isbnInput,
      published_date: published_dateInput,
    };

    // Simple validation
    if (
      !this.book.title ||
      !this.book.author ||
      !this.book.isbn ||
      !this.book.published_date
    ) {
      this.error = "Llene Todos Los Campos.";
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(this.book.published_date)) {
      this.error = "Formato de fecha inválido. Use YYYY-MM-DD.";
      return;
    }

    this.error = "";

    this.postBookEdit();

    setTimeout(() => {
      Router.go(`/book/${this.bookId}`);
    }, 1500);
  }

  async getBookById() {
    let res = await this.getBook.getApi(this.bookId);
    this.getResponse = res;

    this.getInput();
  }

  getInput() {
    let { title, author, isbn, published_date } = this.getResponse;
    let formattedDate = new Date(published_date).toISOString().split("T")[0];

    this.shadowRoot.querySelector("#title").value = title;
    this.shadowRoot.querySelector("#author").value = author;
    this.shadowRoot.querySelector("#isbn").value = isbn;
    this.shadowRoot.querySelector("#published_date").value = formattedDate;
  }

  async postBookEdit() {
    this.msg = await this.editBook.putApi(this.book, this.bookId);
  }

  goBack(e) {
    e.preventDefault();
    window.history.back();
  }

  render() {
    return html`
      <div class="container">
        <h1>Edit New Book</h1>
        <a href="#" @click="${this.goBack}">Atrás</a>
        <form @submit="${this.handleSubmit}">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            .value="${this.book.title}"
          />

          <label for="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            .value="${this.book.author}"
          />

          <label for="isbn">ISBN:</label>
          <input type="text" id="isbn" name="isbn" .value="${this.book.isbn}" />

          <label for="published_date">Published Date (YYYY-MM-DD):</label>
          <input
            type="text"
            id="published_date"
            name="published_date"
            .value="${this.book.published_date}"
            @input="${this.handleInputChange}"
          />

          <button type="submit">Guardar</button>
          ${this.error ? html`<p class="error">${this.error}</p>` : ""}
          <p>${this.msg.message}</p>
        </form>
      </div>
    `;
  }
}
customElements.define("edit-book-page", EditBookPage);
