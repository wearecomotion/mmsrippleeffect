import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

class SplideSlider extends HTMLElement {
  constructor() {
    super();

    setTimeout(() => {
      this.init()
    }, 150);
  }

  init = () => {
    this.slider = new Splide(this)
    this.progressBar = this.querySelector('[data-progress-bar]')
    this.isAutoScroll = this.getAttribute('data-auto-scroll') == '1'
    this.counter = this.querySelector('[data-counter]')
    this.isSync = this.getAttribute('data-sync') || 0;
    this.isThumbnails = this.getAttribute('data-thumbnails') == '1'

  
    if (this.counter) {
      this.slider.on('mounted move', () => {
        this.counter.innerText = `${this.slider.index + 1} / ${this.slider.Components.Slides.getLength(true)}`
      })
    }

    if (this.progressBar) {
      this.slider.on('mounted move', () => {
        const end = this.slider.Components.Controller.getEnd() + 1
        const rate = Math.min((this.slider.index + 1) / end, 1)
        this.progressBar.style.width = `${100 * rate}%`
      })
    }

    if (this.isSync) {
      this.syncEl = document.querySelector(`#${this.isSync}`)

      if (this.syncEl) {
        if (this.syncEl.slider) {
          this.slider.sync(this.syncEl.slider)

          const syncElSlides = this.syncEl.querySelectorAll('.assets-carousel__asset-wrapper')

          syncElSlides.forEach((el, index) => {
            el.addEventListener('click', () => {
              this.dataOverlayId = this.getAttribute('data-overlay')
              if (!this.dataOverlayId) return
              const overlay = document.querySelector(`#${this.dataOverlayId}`)
              if (overlay) {
                overlay.open()
              }
            })
          })
        }
      }
    }

    if (this.isAutoScroll) {
      this.slider.mount({ AutoScroll });
    } else if (!this.isThumbnails) {
      this.slider.mount()

      if (this.isSync) {
        if (this.syncEl) {
          if (this.syncEl.slider) {
            this.syncEl.slider.mount()
          }
        }
      }
    }
  }
}
customElements.define('sp-lide', SplideSlider);