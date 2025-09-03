document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("close-popup");
  const popupWhatsup = document.querySelector('.popup__whatsup');
  const popupSocials = document.querySelector('.popup__socials');
  const copyButton = document.querySelector('.popup__copy');
  const copiedMessage = document.querySelector('.popup__copied'); 


  // Function to close the popup
  function closePopupFunction() {
      popup.style.display = "none";
      popupWhatsup.style.display = "none";
      popupSocials.style.display = "none";
      copiedMessage.style.display = 'none'; 

  }

  // Close popup when clicking the close button
  closePopup.addEventListener("click", closePopupFunction);

  // Click event listener for the SVG paths
  const paths = document.querySelectorAll("path[data-open]");
  paths.forEach(path => {
      path.addEventListener("click", function() {
          const contentKey = this.getAttribute("data-content");
          
          // Hide all popup contents initially
          popupWhatsup.style.display = "none";
          popupSocials.style.display = "none";

          // Show the appropriate content based on the clicked path
          if (contentKey === 'whatsup') {
              popupWhatsup.style.display = "block"; // Show whatsup content
          } else if (contentKey === 'socials') {
              popupSocials.style.display = "block"; // Show socials content
          }

          popup.style.display = "flex"; // Show the popup
      });
  });

  // Copy text to clipboard when the button is clicked
  copyButton.addEventListener("click", function() {
    const activeContent = popupWhatsup.style.display === "block" ? popupWhatsup.innerText : popupSocials.innerText;
    navigator.clipboard.writeText(activeContent).then(() => {
        // Show the copied message
        copiedMessage.style.opacity = '1';
        // Hide the message after 4 seconds
        setTimeout(() => {
            copiedMessage.style.opacity = '0';
        }, 3000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
});

  // Close popup when clicking outside of popup__content
  popup.addEventListener("click", function(event) {
      if (event.target === popup) {
          closePopupFunction();
      }
  });

  // Close popup when pressing the Escape key
  document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
          closePopupFunction();
      }
  });
});
