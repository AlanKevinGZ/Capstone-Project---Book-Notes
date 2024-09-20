import { LitElement, html, css } from 'lit';

export class Title extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            title: { type: String },
        };
    }

    constructor(){
        super()
        this.title="Title"
    }

    render() {
        return html`
          <h1>${this.title}</h1>
        
        `;
    }
}
customElements.define('title-componts', Title);
