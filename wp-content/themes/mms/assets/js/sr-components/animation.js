document.addEventListener("DOMContentLoaded", function () {


  if (!localStorage.getItem("cookieAccepted")) {
    var cookiePopup = document.getElementById("cookie-popup");
    if (cookiePopup) {
      cookiePopup.style.display = "block";
    }
  }

  var acceptButton = document.getElementById("accept-cookie");
  if (acceptButton) {
    acceptButton.addEventListener("click", function () {
      var cookiePopup = document.getElementById("cookie-popup");
      if (cookiePopup) {
        cookiePopup.style.display = "none";
      }

      localStorage.setItem("cookieAccepted", true);
    });
  }

  if (document.body.classList.contains("home")) {
    const swiper = new Swiper(".swiper", {
      autoplay: {
        delay: 8000,
      },
      speed: 800,
      autoplayDisableOnInteraction: false,
      parallax: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });

    const swiperContainer = document.querySelector(".swiper-container");
    observer.observe(swiperContainer);
  }

const sliderElement = document.querySelector(".swiper");
if (sliderElement) {
  const swiper = new Swiper(".swiper", {
    speed: 600,
    slidesPerView: "auto",
    setWrapperSize: true,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Initialize popup functionality if elements exist
const images = document.querySelectorAll(".about__slider-image");
const popup = document.querySelector(".about__popup");
const closeButton = document.getElementById("close-enlarge");

if (popup && closeButton && images.length > 0) {
  const popupImage = document.createElement("img");

  // Add click event listener to each image for opening the popup
  images.forEach((image) => {
    image.addEventListener("click", function () {
      popupImage.src = image.src;
      popup.innerHTML = "";
      popup.appendChild(popupImage);
      popup.appendChild(closeButton);
      popup.classList.add("show");
    });
  });

  // Close button hides the popup
  closeButton.addEventListener("click", function () {
    popup.classList.remove("show");
  });

  // Hide popup when clicking outside the image
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.classList.remove("show");
    }
  });
} else {
  if (!popup) console.error("Popup element not found!");
  if (!closeButton) console.error("Close button element not found!");
  if (images.length === 0) console.error("No images found to attach click event for popup!");
}


});






function showSubmenu() {
  var submenu = document.querySelector(".subnavigation");
  submenu.style.display = "flex";
}

function hideSubmenu() {
  var submenu = document.querySelector(".subnavigation");
  submenu.style.display = "none";
}

function cancelHide() {
  var submenu = document.querySelector(".subnavigation");
  submenu.style.display = "flex";
}
