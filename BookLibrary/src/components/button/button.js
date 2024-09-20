import { LitElement, html, css } from "lit";

export class Button extends LitElement {
  static styles = [
    css`
      :host {
       
      }

      button {
        padding: 10px 20px;
        margin:1rem 0;
        background-color: #004b87; /* Color principal */
        color: #ffffff;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      button:hover {
        background-color: #003366; /* Color en hover */
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      }

      button:focus {
        outline: none;
        background-color: #002244; /* Color en focus */
        box-shadow: 0 0 0 3px rgba(0, 75, 135, 0.5); /* Efecto en focus */
      }

      button:active {
        background-color: #001122;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
      }
    `,
  ];

  static get properties() {
    return {
      text: { type: String },
    };
  }

  constructor() {
    super();
    this.text = "button";
  }

  render() {
    return html` <button>${this.text}</button> `;
  }
}
customElements.define("button-components", Button);
