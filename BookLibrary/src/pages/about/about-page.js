import { LitElement, html, css } from 'lit';

export class AboutPage extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<h1>Acerca de nosotros</h1>`;
    }
}
customElements.define('about-page', AboutPage);
