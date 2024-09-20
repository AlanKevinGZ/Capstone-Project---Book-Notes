import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { GetBooksById } from "../../dataManger/booksDM/get-book-byId-dm.js";
import { DeleteBook } from "../../dataManger/booksDM/delete-bookldm.js";
import "../../components/button/button.js";

export class BookDetailPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Helvetica Neue", Arial, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 2.5rem;
      color: #004b87;
      margin-bottom: 20px;
      text-align: center;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
    }

    .label {
      font-weight: bold;
      color: #004b87;
    }

    .loading {
      text-align: center;
      font-size: 1.5rem;
      color: #555;
    }
  `;

  static get properties() {
    return {
      book: { type: Object },
    };
  }

  constructor() {
    super();
    this.bookId = null;
    this.getBookById = new GetBooksById();
    this.delete = new DeleteBook();
  }

  firstUpdated() {
    // Accedemos a los parámetros de la ruta usando `this.location.params`
    this.bookId = this.location.params.id;
    this.apiGet(this.bookId);
  }

  async apiGet(id) {
    let info = await this.getBookById.getApi(id);
    if (info.error) {
       Router.go(`/`);
      return;
    }
    this.book = info;
  }

  handleRewieEdit(id) {
    Router.go(`/review-add/${id}`);
  }

  handleBookEdit() {
    Router.go(`/edit-book/${this.bookId}`);
  }

  handleBookDelete() {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este libro?');
  
  if (confirmed) {
    this.delete_Api();
  }
  }

  async delete_Api() {
    await this.delete.deleteApi(this.bookId);
    Router.go(`/`);
  }
  
  goBack(e) {
    e.preventDefault();
    window.history.back();
}


  get getBooInfo() {
    if (!this.book) {
      return html`<div class="loading">Cargando...</div>`;
    }

    return html`
      <div class="container">
        <h1>Detalles del libro</h1>
        <a href="#" @click="${this.goBack}">Atrás</a>
        <div class="options">
          <button-components
            text="Editar Libro"
            @click="${this.handleBookEdit}"
          ></button-components>
          <button-components
            text="Eliminar Libro"
            @click="${this.handleBookDelete}"
          ></button-components>
        </div>
        <img src="${this.book.cover_url}" alt="${this.book.title}" />
        <div class="info">
          <p><span class="label">Título:</span> ${this.book.title}</p>
          <p><span class="label">Autor:</span> ${this.book.author}</p>
          <p><span class="label">ISBN:</span> ${this.book.isbn}</p>
          <p>
            <span class="label">Publicado:</span> ${this.book.published_date}
          </p>
          <p><span class="label">Reseña:</span> ${this.book.review_text}</p>
        </div>

        ${this.book.review_text
          ? html`<button-components
              text="Editar Reseña"
              @click="${() => this.handleRewieEdit(this.book.id)}"
            ></button-components>`
          : html`<button-components
              text="Agregar Reseña"
              @click="${() => this.handleRewieEdit(this.book.id)}"
            ></button-components>`}
      </div>
    `;
  }

  render() {
    return html` ${this.getBooInfo} `;
  }
}

customElements.define("book-detail-page", BookDetailPage);
