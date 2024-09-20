import { LitElement, html, css } from 'lit';

export class Cards extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .card {
            display: flex;
            flex-direction: row;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin: 20px 0;
            max-width: 800px;
            width: 100%;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }

        .img_card {
            flex: 0 0 150px;
            height: 100%;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .img_card img {
            width: 100px;
            border-radius: 10px;
        }

        .info_card {
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
        }

        .info_card h3 {
            font-size: 1.6rem;
            margin: 0 0 10px 0;
            color: #333;
        }

        .info_card p {
            margin: 5px 0;
            color: #555;
        }

        .info_card p span {
            font-weight: bold;
            color: #0099d3; 
        }

        .btn-resena {
            margin-top: 15px;
            padding: 10px ;
            background-color: var(--accent-color, #0099d3);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s ease;
        }


        .btn-resena:hover {
            background-color: #007bb5; 
          
        }
    `;

    static get properties() {
        return {
            card: { type: Array },
        };
    }

    constructor() {
        super();
        this.card = [];
    }

    handleVerResena(card) {
        const event = new CustomEvent('ver-resena', {
            detail: { card }, 
            bubbles: true, 
            composed: true
        });

        
        this.dispatchEvent(event);
    }

    render() {
        return html`
            ${this.card.map((card) => {
                return html`
                    <div class="card">
                        <div class="img_card">
                            <img src="${card.cover_url}" alt="Portada del libro">
                        </div>
                        <div class="info_card">
                            <h3>${card.title}</h3>
                            <p><span>Autor:</span> ${card.author}</p>
                            <p><span>ISBN:</span> ${card.isbn}</p>
                            <p><span>Publicado:</span> ${new Date(card.published_date).toLocaleDateString()}</p>
                             <button class="btn-resena" @click="${() => this.handleVerResena(card)}">
                                Ver Reseña
                            </button>
                        </div>
                    </div>
                `;
            })}
        `;
    }
}
customElements.define('cards-components', Cards);
