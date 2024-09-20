import { LitElement, html, css } from 'lit';

export class Menu extends LitElement {
    static styles = css`
        :host {
            display: block;
            --primary-color: #003b56; /* Color de fondo del menú */
            --accent-color: #0099d3; /* Color de acento para enlaces */
            --text-color: #ffffff; /* Color del texto */
            --hover-color: #005b8d; /* Color de fondo en hover */
            --border-radius: 4px; /* Radio de borde */
            --padding: 10px; /* Espaciado interno */
        }

        nav {
            background-color: var(--primary-color);
            padding: var(--padding);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: var(--border-radius);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        a {
            color: var(--text-color);
            text-decoration: none;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: 500;
            border-radius: var(--border-radius);
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        a:hover {
            background-color: var(--hover-color);
            color: var(--accent-color);
        }
    `;

    static get properties() {
        return {
            menusItems: { type: Array },
        };
    }

    constructor() {
        super();
        this.menusItems = [];
    }

    render() {
        return html`
            <nav>
                ${this.menusItems.map((menu) => html`
                    <a href=${menu.url}>${menu.text}</a>
                `)}
            </nav>
        `;
    }
}
customElements.define('menu-components', Menu);
