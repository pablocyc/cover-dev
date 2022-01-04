import "./CoverHTML.js";
import "./CoverCSS.js";
import "./CoverJS.js";
import "./CoverTerminal.js";
import { LOGOS } from "../modules/logos.js";

class CoverBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 800px;
        --height: 400px;
        --cover-size: 400px;
      }
      
      .container {
        width: var(--width);
        height: var(--height);
        position: relative;
      }

      .container .box {
        width: var(--cover-size);
        height: var(--cover-size);
        background-color: #000;
        z-index: 5;
      }

      .container svg {
        width: var(--cover-size);
        height: var(--cover-size);
        transition: transform 0.5s;
      }

      .container svg,
      .container .box {
        position: absolute;
      }

      .container .box:hover + svg {
        transform: translateX(280px);
      }
    `;
  }

  connectedCallback() {
    this.logo = this.getAttribute("logo");
    this.render();

    const container = this.shadowRoot.querySelector(".container");
    const cover = document.createElement(`cover-${this.logo}`);
    cover.classList.add("box");
    container.insertAdjacentElement("afterbegin", cover);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CoverBox.styles}</style>

    <div class="container">
      ${LOGOS[this.logo]}
    </div>`;
  }
}

customElements.define("cover-box", CoverBox);
