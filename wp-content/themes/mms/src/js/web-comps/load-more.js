class LoadMore extends HTMLElement {
  constructor() {
    super();

    this.loadMoreButton = this.querySelector("[data-load-more]");
    this.loadLessButton = this.querySelector("[data-load-less]");
    this.allCards = this.querySelectorAll('.card'); // Get all cards

    // Show only the first 9 cards initially
    this.showInitialCards();

    if (this.loadMoreButton) {
      this.loadMoreButton.addEventListener("click", this.loadAllCards.bind(this));
    }

    if (this.loadLessButton) {
      this.loadLessButton.addEventListener("click", this.loadInitialCards.bind(this));
    }
  }

  // Show the first 9 cards
  showInitialCards() {
    for (let i = 0; i < this.allCards.length; i++) {
      if (i < 9) {
        this.allCards[i].classList.remove('hidden');
      } else {
        this.allCards[i].classList.add('hidden');
      }
    }
    this.loadLessButton.style.display = 'none'; // Hide Load Less button initially
    if (this.allCards.length > 9) {
      this.loadMoreButton.style.display = 'block'; // Show Load More button if more than 9 cards
    } else {
      this.loadMoreButton.style.display = 'none'; // Hide Load More button if 9 or fewer cards
    }
  }

  // Load all cards when the "Load More" button is clicked
  loadAllCards() {
    for (let card of this.allCards) {
      card.classList.remove('hidden');
    }
    this.loadMoreButton.style.display = 'none'; // Hide Load More button
    this.loadLessButton.style.display = 'block'; // Show Load Less button
  }

  // Load initial 9 cards when the "Load Less" button is clicked
  loadInitialCards() {
    this.showInitialCards(); // Call the function to show the first 9 cards
    
    // Smoothly scroll to the Load More button
    this.scrollToLoadMoreButton();
  }

  scrollToLoadMoreButton() {
    if (this.loadMoreButton) {
      const buttonRect = this.loadMoreButton.getBoundingClientRect(); // Get the button's position
      const offset = 300; // Set the desired offset
      const scrollPosition = buttonRect.top + window.scrollY - offset; // Calculate the scroll position

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // Smooth scrolling
      });
    }
  }
}

// Define the custom element
customElements.define('load-more', LoadMore);
