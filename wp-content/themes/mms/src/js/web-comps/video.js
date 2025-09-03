import videojs from 'video.js';

class VideoJs extends HTMLElement {
  connectedCallback() {
    this.videoEl = this.querySelector('video');
    this.playBtn = this.querySelector('[data-v-play]');
    this.overlay = this.querySelector('[data-v-ov]');

    this.player = videojs(this.videoEl, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      controlBar: {
        volumePanel: {
          inline: false
        }
      }
    });

    if (this.playBtn) {
      this.playBtn.addEventListener('click', this.handleClick);
    }

    this.player.on('play', () => {
      if (this.overlay) {
        this.overlay.classList.add('hide');
      }
    });
    this.player.on('ended', this.handleEnded);

    if (this.hasAttribute('data-pause')) {
      this.player.on('pause', () => {
        if (this.overlay) {
          this.overlay.classList.remove('hide');
        }
      });
    }
  }

  handleClick = () => {
    this.player.play();
    this.overlay.classList.add('hide');
  }

  handleEnded = () => {
    if (this.overlay) {
      setTimeout(() => {
        this.overlay.classList.remove('hide');
      }, 300);
    }
  }
}

customElements.define('video-js', VideoJs);