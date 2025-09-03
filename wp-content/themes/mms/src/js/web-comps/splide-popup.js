document.addEventListener("DOMContentLoaded", function() {
  function openVideoPopup(videoUrl) {
    var popup = document.getElementById('videoPopup');
    var iframe = document.getElementById('videoIframe');
    
    // Set the embed URL in the iframe and autoplay the video
    iframe.src = videoUrl.replace("watch?v=", "embed/") + "?autoplay=1";
    
    // Show the popup
    popup.style.display = "block";
  }

  window.closeVideoPopup = function() {
    var popup = document.getElementById('videoPopup');
    var iframe = document.getElementById('videoIframe');
    
    // Clear the iframe's source to stop the video
    iframe.src = "";
    
    // Hide the popup
    popup.style.display = "none";
  }

  // Add event listeners for posters to open the video popup
  document.querySelectorAll('.impact-section__poster').forEach(function(poster) {
    poster.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the video URL from the data-video-url attribute
      var videoUrl = this.getAttribute('data-video-url');
      
      // Open the video popup with the selected video
      openVideoPopup(videoUrl);
    });
  });

  // Close the popup when clicking on the popup content (except iframe or close button)
  document.getElementById('popupContent').addEventListener('click', function(e) {
    var iframe = document.getElementById('videoIframe');
    var closeBtn = document.querySelector('.video-popup__close');

    // Close the popup only if the click is not on the iframe or the close button
    if (e.target !== iframe && e.target !== closeBtn && !closeBtn.contains(e.target)) {
      closeVideoPopup();
    }
  });

  // Close the popup if the user clicks outside the popup content
  document.getElementById('videoPopup').addEventListener('click', function(e) {
    var popupContent = document.getElementById('popupContent');
    
    // Check if the clicked area is outside the content
    if (e.target === this) {
      closeVideoPopup();
    }
  });
});
