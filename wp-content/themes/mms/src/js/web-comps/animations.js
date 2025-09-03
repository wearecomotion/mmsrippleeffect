import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

if (window.matchMedia("(min-width: 1024px)").matches) {
  gsap.to(".video__player", {
    scale: 1,
    scrollTrigger: {
      trigger: ".video",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });
}

document.querySelectorAll("[data-ellipse-section]").forEach((section) => {
  const ellipse = section.querySelector("[data-ellipse]");

  if (ellipse) {
    gsap.to(ellipse, {
      clipPath: "ellipse(60% 40% at 50% 50%)",
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  }
});

document.querySelectorAll("[data-bg]").forEach((bgElement) => {
  gsap.to(bgElement, {
    scale: 1.2,
    scrollTrigger: {
      trigger: bgElement, // Trigger animation based on each individual element
      start: "top 80%", // Start when the top of the element is 80% down the viewport
      end: "bottom 20%", // End when the bottom of the element is 20% from the top of the viewport
      scrub: true, // Smooth scroll-based animation
      onEnter: () => gsap.to(bgElement, { scale: 1.2 }),
      onLeaveBack: () => gsap.to(bgElement, { scale: 0.7 }),
    },
  });
});

//Hide hero on scroll
function setupScrollTrigger() {
  ScrollTrigger.create({
    trigger: "body",
    start: "2000px", // Set the start point based on screen width
    onEnter: () => document.querySelector(".hero").classList.add("hide"), // Hide the hero section
    onLeaveBack: () => document.querySelector(".hero").classList.remove("hide"), // Show the hero section when scrolling back
    markers: false, // You can turn this on for debugging
  });
}

//Share animations
gsap.to(".share", {
  scrollTrigger: {
    trigger: ".share",
    start: "top 50%",
    toggleClass: "animate", // Add 'animate' class when the section comes into view
    once: true, // Only trigger once
  },
});

gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 75%", // when the top of the element hits 80% of the viewport height
      toggleActions: "play none none none", // only play the animation on scroll
    },
  });
});

setupScrollTrigger();

window.addEventListener("resize", () => {
  ScrollTrigger.refresh(); // Refresh the ScrollTrigger instance to adjust to viewport changes
  setupScrollTrigger(); // Recalculate the trigger points
});



document.querySelector(".form-popup__close").addEventListener("click", function () {
  const popup = document.querySelector(".form-popup");
  popup.style.opacity = "0";
  popup.style.zIndex = "0";
});
