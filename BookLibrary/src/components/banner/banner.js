import { LitElement, html, css } from 'lit';

export class Banner extends LitElement {
    static styles = css`
        :host {
            display: block;
            overflow: hidden;
            width: 100%;
            height:500px;
            position: relative;
        }
        .carousel {
            display: flex;
            transition: transform 0.5s ease-in-out;
            width: 100%;
        }

        .carousel img {
            min-width: 100%;
            width: 100%;
            border-radius: 10px;
            object-fit: cover;
        }

        .dots {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
        }

        .dot {
            height: 10px;
            width: 10px;
            margin: 0 5px;
            background-color: white;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            opacity: 0.5;
        }

        .dot.active {
            opacity: 1;
            background-color: var(--accent-color, #0099d3);
        }
    `;

    static get properties() {
        return {
            images: { type: Array },
            currentIndex: { type: Number }
        };
    }

    constructor() {
        super();
        this.images = [];
        this.currentIndex = 0;
    }

    firstUpdated() {
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 3000); // Cambiar cada 3 segundos
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    selectSlide(index) {
        this.currentIndex = index;
    }

    render() {
        return html`
            <div class="carousel" style="transform: translateX(-${this.currentIndex * 100}%);">
                ${this.images.map(image => html`<img src=${image} alt="Banner Image">`)}
            </div>

            <!-- Indicadores de los puntos del carrusel -->
            <div class="dots">
                ${this.images.map((_, index) => html`
                    <span class="dot ${this.currentIndex === index ? 'active' : ''}" @click="${() => this.selectSlide(index)}"></span>
                `)}
            </div>
        `;
    }
}

customElements.define('banner-components', Banner);
