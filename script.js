class Accordion {
  constructor(node) {
    this.rootEl = node;
    this.headerEl = node.querySelector("button.faq__header");

    const controlsId = this.headerEl.getAttribute("aria-controls");
    this.panelEl = node.querySelector(`#${controlsId}`);

    this.open = this.headerEl.getAttribute("aria-expanded") === "true";

    this.headerEl.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    this.toggle(!this.open);
  }

  toggle(state) {
    if (state === this.open) {
      return;
    }

    accordionsInstance.forEach((a) => a.close());

    this.open = state;

    this.headerEl.setAttribute("aria-expanded", `${this.open}`);
    if (this.open) {
      this.panelEl.removeAttribute("aria-hidden");
    } else {
      this.panelEl.setAttribute("aria-hidden", "");
    }
  }

  close() {
    this.open = false;
    this.headerEl.setAttribute("aria-expanded", "false");
    this.panelEl.setAttribute("aria-hidden", "");
  }
}

const accordions = [...document.querySelectorAll(".faq__el")];
const accordionsInstance = accordions.map((a) => new Accordion(a));
