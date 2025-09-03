class AccOrdion extends HTMLElement {
  constructor() {
    super();

    this.buttons = this.querySelectorAll("[data-button]");
    this.timeout = null;

    if (this.buttons) {
      this.buttons.forEach((button) => {
        button.addEventListener("click", () => {
          this.handleButtonClick(button);
        });

        let content = button.nextElementSibling;
        let inner = content.querySelector("[data-inner]");

        if (inner.scrollHeight < content.scrollHeight) {
          content.classList.remove('min-height');

          this.handleButtonClick(button);

          button.removeEventListener("click", (event) => {
            this.handleButtonClick(button);
          });
          button.style.pointerEvents = "none";
        }
      });
    }

    this.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", () => {
        let button = img.closest("[data-button]");
        if (button && button.classList.contains("active")) {
          let content = button.nextElementSibling;
          let inner = content.querySelector("[data-inner]");
          content.style.maxHeight = inner.scrollHeight + "px";
        }
      });
    });

    setTimeout(() => {
      if (!this.buttons[0].hasAttribute('data-button-esg')) {
        this.buttons[0].click();
      }
      clearTimeout(this.timeout);
    }, 50);
  }

  handleButtonClick(button) {
    let content = button.nextElementSibling;
    let inner = content.querySelector("[data-inner]");

    // Check if the clicked accordion is already active
    if (button.classList.contains("active")) {
      // If it's active, close it
      button.classList.remove("active");
      button.setAttribute("aria-expanded", false);
      content.style.maxHeight = null;
      content.setAttribute("aria-hidden", true);
    } else {
      // Otherwise, close all other accordions and open the clicked one
      this.closeAll();

      button.classList.add("active");
      button.setAttribute("aria-expanded", true);
      content.style.maxHeight = inner.scrollHeight + "px";
      content.setAttribute("aria-hidden", false);

      this.timeout = setTimeout(() => {
        let rect = button.getBoundingClientRect();
        let elemTop = rect.top;
        let elemBottom = rect.bottom;

        let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        if (!isVisible) {
          window.scrollTo({
            top: elemTop + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }, 301);
    }
  }

  closeAll() {
    this.buttons.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-expanded", false);
      button.nextElementSibling.style.maxHeight = null;
      button.nextElementSibling.setAttribute("aria-hidden", true);
    });
  }
}

customElements.define('acc-ordion', AccOrdion);
