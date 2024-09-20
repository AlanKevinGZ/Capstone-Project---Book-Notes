import { LitElement, html, css } from "lit";
import { Router } from '@vaadin/router';

import "../../components/banner/banner.js";
import "../../components/title/title.js";
import "../../components/cards/cards.js";
import '../../components/button/button.js';


import { GetBooks } from "../../dataManger/booksDM/get-books-dm.js";

export class HomePage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
      }
      .header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .header title-componts {
        position: absolute;

        text-align: center;
        background-color: rgba(0, 0, 0, 0.691);
        color: white;
        padding: 2rem;
      }

      /* Spinner CSS */
      .spinner {
        border: 8px solid rgba(0, 0, 0, 0.1); /* Light grey */
        border-top: 8px solid var(--accent-color, #0099d3); /* Blue */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 50px auto;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loading-text {
        text-align: center;
        font-size: 1.5rem;
        color: #555;
      }
    `,
  ];

  static get properties() {
    return {
        spinner: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.getBooks=new GetBooks();
    this.bannerImages = [
      "./src/assets/img/book-2378479_1280.jpg",
      "./src/assets/img/couch-1868755_1280.jpg",
    ];

    this.card = [];

    this.spinner = false;
  }

  firstUpdated() {
    this.apiResponse();
}

async apiResponse(){
    let res=await this.getBooks.getApi();
    this.card=res;
    this.spinner = await true;
    
}

handleVerResena(event) {
  const card = event.detail.card;
  Router.go(`/book/${card.id}`);  //método adecuado para navegar a diferentes rutas dentro de tu aplicación.
}

handleAddBook(){
  Router.go(`/book-add`);

}

connectedCallback() { //se ejecuta cuando el componente se agrega al DOM, por lo que es el mejor lugar para registrar oyentes de eventos como addEventListener.
    super.connectedCallback();
    this.addEventListener('ver-resena', this.handleVerResena);
}

disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('ver-resena', this.handleVerResena);
}

  render() {
    return html`
      <div class="header">
        <banner-components .images="${this.bannerImages}"></banner-components>
        <title-componts title="Bienvenido. Reseñas de Libros"></title-componts>
      </div>

      <div class="container">
        <title-componts title="Mis Reseñas"></title-componts>
        <button-components text="Ir a agregar libro" @click=${this.handleAddBook}></button-components>
        <div class="col_reseñas">
          ${!this.spinner
            ? html` 
                <div class="spinner"></div>
                <div class="loading-text">Cargando...</div>`
            : html`<cards-components .card="${this.card}"></cards-components>`}
        </div>
      </div>
    `;
  }
}
customElements.define("home-page", HomePage);
