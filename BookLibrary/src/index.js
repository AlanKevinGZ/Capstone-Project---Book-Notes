import { LitElement, css, html } from 'lit';
import { Router } from '@vaadin/router';

import './pages/home/home-page.js';
import './pages/about/about-page.js';
import './pages/BookDetailPage/BookDetailPage.js';
import './pages/addBookPage/addBookPage.js';
import './pages/reviewPage/review-page.js';
import './pages/EditBook/edit-book-page.js';

import './components/menu/menu.js';


export class MyElement extends LitElement {


  constructor() {
    super()
    this.menu = [
      { url: '/', text: 'Home', component: 'home-page' },
      { url: '/about', text: 'About', component: 'about-page' },
    ];
    
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    
    // Define las rutas
    const routes = [
      ...this.menu.map((item) => ({
        path: item.url,
        component: item.component
      })),
      { path: '/book/:id', component: 'book-detail-page' },  // Ruta dinámica con ID
      { path: '/book-add', component: 'add-book-page' },
      { path: '/review-add/:id', component: 'review-page' },
      { path: '/edit-book/:id', component: 'edit-book-page' }
    ];

    router.setRoutes(routes);
    
  }

  render() {
    return html`
    <menu-components .menusItems="${this.menu}"></menu-components>
    <!-- Aquí se renderizan las vistas -->
    <div id="outlet"></div>
  `;
  }


}

customElements.define('my-app', MyElement)
