import { LitElement, html, css } from 'lit';
import { Router } from "@vaadin/router";
import { GetReview } from '../../dataManger/reviewsDM/get-reviews-dm.js';
import { GetBooksById } from '../../dataManger/booksDM/get-book-byId-dm.js';
import { CreateReview } from '../../dataManger/reviewsDM/create-edit-review-dm.js';

export class ReviewPage extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
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

        input, textarea, select {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            width: 100%;
        }

        textarea {
            resize: vertical;
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
    `;
  static get properties() {
    return {
        review: { type: Object },
        error: { type: String },
        title: { type: String },
        msg: { type: Object },
        existBook: { type: String }
    };
}

constructor() {
    super();
    this.existBook = "";
    this.bookId = null; 
    this.title = "";
    this.review = "";
    this.msg = {};
    this.createReview = new CreateReview();
    this.getReview = new GetReview();
    this.getBooksById = new GetBooksById();
}

async firstUpdated() {
    this.bookId = this.location.params.id;

    // Obtener información del libro antes de continuar
    await this.getBook();

    if (this.existBook.error === "Libro no encontrado") {
        Router.go(`/`);
        return;
    }

    // Si el libro existe, cargar o agregar la reseña
    this.getApi();
}

async getApi() {
    let response = await this.getReview.getApi(this.bookId);
    if (response.error) {
        this.title = "Agregar Reseña";
        return;
    }
    this.title = "Editar Reseña";
    this.review = response.review;
    this.shadowRoot.querySelector('#text').value = this.review.review_text;
}

handleSubmit(e) {
    e.preventDefault();
    
    let reviewText = this.shadowRoot.querySelector('#text').value;
    let objReview = { review_text: reviewText };

    this.putApi(objReview, this.bookId).then(() => {
        Router.go(`/book/${this.bookId}`);
    });
}

async putApi(review, id) {
    this.msg = await this.createReview.postApi(review, id);
}

async getBook() {
    this.existBook = await this.getBooksById.getApi(this.bookId);
}

goBack(e) {
    e.preventDefault();
    window.history.back();
  }

render() {
    return html`
        <div class="container">
            <h1>${this.title}</h1>
            <a href="#" @click="${this.goBack}">Atrás</a>
            <form @submit="${this.handleSubmit}">
                <label for="text">Texto de la reseña:</label>
                <textarea id="text" name="text" rows="5"></textarea>
                <button type="submit">${this.title}</button>
                <p> ${this.msg.message} </p>
            </form>
        </div>
    `;
}
}

customElements.define('review-page', ReviewPage);
