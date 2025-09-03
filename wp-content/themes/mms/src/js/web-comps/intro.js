import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable"; // Import the Draggable plugin

gsap.registerPlugin(ScrollTrigger, Draggable);

const isTouchDevice = 'ontouchstart' in window;

window.addEventListener("beforeunload", function () {
  sessionStorage.setItem("isReloaded", "true");
});

window.addEventListener("load", function () {
  if (sessionStorage.getItem("isReloaded") === "true") {
    console.log("Page reloaded");
    sessionStorage.removeItem("isReloaded"); // Clear the reload flag
    triggerSkipButton(); 
  } else if (window.location.hash) { // Check for hash in URL
    console.log("Navigated to section: " + window.location.hash);
    triggerSkipButton();
  }
});

const createCursorFollower = () => {
  const $el = document.querySelector(".cursor-follower"); // Ensure this element is in your HTML

  window.addEventListener("mousemove", (e) => {
    const { target, x, y } = e;
    const isTargetLinkOrBtn = target?.closest("a") || target?.closest("button");
    gsap.to($el, {
      x: x + 3,
      y: y + 3,
      duration: 0.7,
      ease: "power4",
      opacity: isTargetLinkOrBtn ? 0.2 : 1,
      transform: `scale(${isTargetLinkOrBtn ? 1.2 : 1})`,
    });
  });

  document.addEventListener("mouseleave", (e) => {
    gsap.to($el, { duration: 0.7, opacity: 0 });
  });
};

function initializeSkipButton() {
  const skipButton = document.querySelector(".hero__skip");
  const formPopup = document.querySelector(".form-popup");
  const scrollButton = document.querySelector(".hero__scroll");
  const intro = document.querySelector(".hero__intro");
  const firstEllipse =
    document.documentElement.querySelector(".video__ellipse");
  const cursorFollower = document.querySelector(".cursor-follower"); // Select the cursor follower

  const redDot = document.querySelector(".red-dot");
  const blueDot1 = document.querySelector(".blue-dot-1");
  const blueDot2 = document.querySelector(".blue-dot-2");
  const greenDot = document.querySelector(".green-dot");
  const purpleDot = document.querySelector(".purple-dot");

  skipButton.addEventListener("click", function () {
    // tl.kill();
    // gsap.globalTimeline.clear();

    const elementsToHide = document.querySelectorAll(
      ".wave-7, .one-cent, .one-prenatal, .one-huge, .toss, .arrow, .movement, .splash, .pill, .wave-10, .coin, .wave"
    );

    const ripples = document.querySelectorAll(".ripple");
    const dots = document.querySelectorAll(".dot");
    const header = document.querySelector("header");
    const topText = document.querySelectorAll(".hero__top");
    const bottomText = document.querySelectorAll(".hero__bottom");

    gsap.to(elementsToHide, { opacity: 0, duration: 0.5, display: "none" });

    gsap.to(topText, {
      opacity: 1,
      duration: 3,
      transform: "translateY(0)",
      ease: "power2.out",
    });
    gsap.to(bottomText, {
      opacity: 1,
      duration: 3,
      transform: "translateY(0)",
      ease: "power2.out",
      delay: 0.2,
    });

    gsap.to(intro, { scale: 1.1, duration: 1 });
    gsap.to(ripples, { opacity: 0.2, duration: 0.8 });

    // Handle the dot animations
    gsap.to(redDot, {
      duration: 1,
      opacity: 1,
      scale: 0.7,
      x: "-33vw",
      y: "-20vh",
      ease: "power3.out",
      delay: 0.1,
    });
    gsap.to(purpleDot, {
      duration: 1,
      opacity: 1,
      scale: 0.7,
      x: "80vh",
      y: "13vh",
      ease: "power3.out",
      delay: 0.1,
    });
    gsap.to(blueDot1, {
      duration: 1,
      opacity: 1,
      scale: 0.7,
      x: "-65vh",
      y: "38vh",
      ease: "power3.out",
      delay: 0.1,
    });
    gsap.to(greenDot, {
      duration: 1,
      opacity: 1,
      scale: 0.7,
      x: "55vh",
      y: "20vh",
      ease: "power3.out",
      delay: 0.1,
    });
    gsap.to(blueDot2, {
      duration: 1,
      opacity: 1,
      scale: 0.7,
      x: "40vh",
      y: "-15vh",
      ease: "power3.out",
      delay: 0.1,
    });

    // Show header and scroll button
    gsap.to(header, { opacity: 1, duration: 1, transform: "translateY(0)" });
    gsap.to(scrollButton, {
      opacity: 1,
      duration: 1,
      transform: "translateX(-50%) translateY(0)",
    });

    skipButton.style.opacity = "0";
    document.body.style.overflowY = "auto";
    cursorFollower.style.display = "block";
    firstEllipse.style.opacity = 1;
    formPopup.style.opacity = 1;
    formPopup.style.zIndex = 99;


  });
}

function triggerSkipButton() {
  const skipButton = document.querySelector(".hero__skip");
  if (skipButton) {
    skipButton.click();
  }
}

if (!isTouchDevice) {
  createCursorFollower();
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 1024) {
    return;
  }

  const firstEllipse = this.documentElement.querySelector(".video__ellipse");
  const cursorFollower = document.querySelector(".cursor-follower"); // Select the cursor follower
  cursorFollower.style.display = "none"; // Hide the cursor follower initially
  const skipButton = document.querySelector(".hero__skip");
  const scrollButton = document.querySelector(".hero__scroll");
  const intro = document.querySelector(".hero__intro");
  const formPopup = document.querySelector(".form-popup");

  document.body.style.overflowY = "hidden";
  firstEllipse.style.opacity = 0;

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflowY = "auto";
      firstEllipse.style.opacity = 1;
      cursorFollower.style.display = "block";
      createCursorFollower();
    },
  });

  initializeSkipButton();

  tl.to(".wave-first", {
    opacity: 1,
    y: 15,
    duration: 1,
    stagger: 0.08,
    ease: "power2.out",
    delay: 0.5,
    onStart: () => {
      gsap.set(".wave-first", { y: 0 });
    },
  })
    .to("#coin", {
      opacity: 1,
      y: 30,
      duration: 0.5,
      delay: 0.2,
      ease: "power2.out",
      onStart: () => {
        gsap.set("#coin", { y: 0 });
      },
    })
    .to(".wave-7", {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
      onComplete: () => {
        document.querySelector(".wave-7").style.display = "none";
      },
    })
    .to(".one-cent", { opacity: 1, duration: 0.3 })
    .to(".one-cent", { opacity: 0, duration: 0.3, delay: 2 })
    .to(".wave-6", { opacity: 0, duration: 0.1 }, "-=0.3")
    .to(".wave-8", { opacity: 0, duration: 0 }, "-=0.3")
    .to(".one-prenatal", { opacity: 1, duration: 0.3 })
    .to(".one-prenatal", { opacity: 0, duration: 0.3, delay: 2 })
    .to(".one-huge", { opacity: 1, duration: 0.3 })
    .to(".one-huge", { opacity: 0, duration: 0.3, delay: 2 })
    .to(".toss", { opacity: 1, duration: 0.3 })
    .to(".arrow", {
      opacity: 1,
      duration: 0.3,
    })
    .to(".arrow", {
      y: -2,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
    .to(".movement", { opacity: 1, duration: 1, stagger: 0.1 })
    .call(() => {
      const coin = document.querySelector("#coin");
      gsap.to(coin, {
        repeat: 2,
        yoyo: true,
        duration: 0.1,
        stagger: 0.05,
        keyframes: {
          "0%": { x: 0 },
          "25%": { x: -2 },
          "50%": { x: 2 },
          "75%": { x: -2 },
          "100%": { x: 0 },
        },
      });
    })
    .call(makeCoinDraggable);

  function makeCoinDraggable() {
    const coin = document.querySelector("#coin");
    const movementElements = document.querySelectorAll(".movement");
    const toss = document.querySelector(".toss");
    const arrow = document.querySelector(".arrow");
    const arrow2 = document.querySelector(".arrow-2");

    const splash = document.querySelectorAll(".splash");
    const wave8 = document.querySelector(".wave-10");
    const pill = document.querySelector(".pill");

    Draggable.create(coin, {
      type: "y",
      bounds: { minY: 0, maxY: 150 },
      onDragStart: function () {
        gsap.to(movementElements, { opacity: 0, duration: 0.5 });
        gsap.to(arrow2, { opacity: 0, duration: 0.1 });
      },
      onDragEnd: function () {
        gsap.to([toss, arrow, coin], { opacity: 0, duration: 0.2 });
        gsap.to(wave8, { opacity: 1, duration: 0.1 });

        gsap.fromTo(
          splash,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            stagger: 0.1,
            onComplete: () => {
              gsap.delayedCall(0.2, () => {
                gsap.to(wave8, { opacity: 1, duration: 0.1 });

                gsap.to(splash, {
                  opacity: 0,
                  duration: 0.2,
                  onComplete: () => {
                    gsap.fromTo(
                      pill,
                      { opacity: 0 },
                      {
                        opacity: 1,
                        duration: 0.2,
                        onComplete: () => {
                          finalAnimation();
                        },
                      }
                    );
                  },
                });
              });
            },
          }
        );
      },
    });
  }

  function finalAnimation() {
    const waves = document.querySelectorAll(".wave"); // Get all wave elements
    const pill = document.querySelector(".pill");
    const leftPill = document.querySelector(".left-pill");
    const rightPill = document.querySelector(".right-pill");
    const dots = document.querySelectorAll(".dot"); // Get all dot elements
    const ripples = document.querySelectorAll(".ripple"); // Get all ripple elements
    const header = document.querySelector("header"); // Assuming you want to show a header
    const topText = document.querySelectorAll(".hero__top"); // Get all ripple elements
    const bottomText = document.querySelectorAll(".hero__bottom"); // Get all ripple elements

    const redDot = document.querySelector(".red-dot");
    const blueDot1 = document.querySelector(".blue-dot-1");
    const blueDot2 = document.querySelector(".blue-dot-2");
    const greenDot = document.querySelector(".green-dot");
    const purpleDot = document.querySelector(".purple-dot");

    const tl = gsap.timeline();

    tl.to(waves, { opacity: 0, duration: 0.5 })
      // Step 2: Hide the pill
      .to(pill, { opacity: 0, duration: 0.3 })
      // Step 3: Show the left-pill, right-pill, and dots with stagger
      .to(leftPill, { opacity: 1, duration: 0.3 }) // Show left-pill
      .to(rightPill, { opacity: 1, duration: 0.3 }, "-=0.3") // Show right-pill at the same time
      .to(dots, { opacity: 1, duration: 0.2, stagger: 0.1 }) // Show all dot elements
      .to(ripples, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: "power4.out",
      })

      .to(intro, { scale: 1.1, duration: 1 })
      .to(ripples, { opacity: 0.2, duration: 0.5 })
      .to([leftPill, rightPill], { opacity: 0, duration: 0.2 })

      .to([redDot, purpleDot, blueDot1, greenDot, blueDot2], {
        duration: 1,
        scale: 0.7,
        opacity: 1,
        stagger: 0, // No stagger, all happen at the same time
        x: function (i) {
          // X positions for each dot based on their index
          return [
            "-33vw", // redDot
            "80vh", // purpleDot
            "-65vh", // blueDot1
            "55vh", // greenDot
            "40vh", // blueDot2
          ][i];
        },
        y: function (i) {
          // Y positions for each dot based on their index
          return [
            "-20vh", // redDot
            "13vh", // purpleDot
            "38vh", // blueDot1
            "20vh", // greenDot
            "-15vh", // blueDot2
          ][i];
        },
      })

      .to(topText, {
        opacity: 1,
        duration: 1,
        transform: "translateY(0)",
        ease: "power2.out",
      })
      .to(bottomText, {
        opacity: 1,
        duration: 1,
        transform: "translateY(0)",
        ease: "power2.out",
      }) // Assuming header is hidden by default
      .to(header, { opacity: 1, duration: 1, transform: "translateY(0)" }) // Assuming header is hidden by default
      .to(scrollButton, {
        opacity: 1,
        duration: 1,
        transform: "translateX(-50%) translateY(0)",
      }) 
      .call(() => {
        skipButton.style.opacity = "0";
        document.body.style.overflowY = "auto";
        firstEllipse.style.opacity = 1;
        cursorFollower.style.display = "block";
        formPopup.style.opacity = 1;
        formPopup.style.zIndex = 99;
     });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 1024) {
    return;
  }

  // MOBILE ANIMATIONS
  const redDot = document.querySelector(".red-dot-m");
  const blueDot1 = document.querySelector(".blue-dot-1-m");
  const blueDot2 = document.querySelector(".blue-dot-2-m");
  const greenDot = document.querySelector(".green-dot-m");
  const purpleDot = document.querySelector(".purple-dot-m");

  const intro = document.querySelector(".hero__intro");

  const firstEllipse = document.querySelector(".video__ellipse");
  document.body.style.overflowY = "hidden";
  firstEllipse.style.opacity = 0;


  const skipButton = document.querySelector(".hero__skip");
  const scrollButton = document.querySelector(".hero__scroll");
  const formPopup = document.querySelector(".form-popup");

  skipButton.addEventListener("click", function () {
    tl.kill();
    gsap.globalTimeline.clear();

    const elementsToHide = document.querySelectorAll(
      ".one-cent-m, .one-prenatal-m, .one-huge-m, .toss-m, .arrow-m, .movement-m, .splash-m, .pill-m, .coin-m, .wave-m"
    );

    const ripples = document.querySelectorAll(".ripple-m");
    const dots = document.querySelectorAll(".dot-m");
    const header = document.querySelector("header");
    const topText = document.querySelectorAll(".hero__top");
    const bottomText = document.querySelectorAll(".hero__bottom");

    gsap.to(elementsToHide, { opacity: 0, duration: 0.5, display: "none" });
    gsap.to(topText, {
      opacity: 1,
      duration: 3,
      transform: "translateY(0)",
      ease: "power2.out",
    });
    gsap.to(bottomText, {
      opacity: 1,
      duration: 3,
      transform: "translateY(0)",
      ease: "power2.out",
      delay: 0.2,
    });

    gsap.to(intro, { scale: 1.1, duration: 1 });
    gsap.to(ripples, { opacity: 0.2, duration: 0.8 });

    gsap.to(redDot, {
      duration: 1,
      opacity: 1,
      scale: 0.8,

      x: "-33vw",
      y: "-20vh",
      ease: "power3.out",
      delay: 0.1,
    });
    gsap.to(purpleDot, {
      duration: 1,
      opacity: 1,
      scale: 0.8,

      x: "18vh",
      y: "-6vh",
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.to(blueDot1, {
      duration: 1,
      opacity: 1,
      scale: 0.8,

      x: "-10vh",
      y: "38vh",
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.to(greenDot, {
      duration: 1,
      opacity: 1,
      scale: 0.8,

      x: "10vh",
      y: "20vh",
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.to(blueDot2, {
      duration: 1,
      opacity: 1,
      scale: 0.8,

      x: "-5vh",
      y: "-32vh",
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.to(header, { opacity: 1, duration: 1, transform: "translateY(0)" });
    gsap.to(scrollButton, {
      opacity: 1,
      duration: 1,
      transform: "translateX(-50%) translateY(0)",
    });

    skipButton.style.opacity = "0";
    document.body.style.overflowY = "auto";
    firstEllipse.style.opacity = 1;
    formPopup.style.opacity = 1;
    formPopup.style.zIndex = 99;
  });


  const tl = gsap.timeline();


  tl.to(".wave-first-m", {
    opacity: 1,
    y: 15,
    duration: 1,
    stagger: 0.08,
    ease: "power2.out",
    delay: 1,
    onStart: () => {
      gsap.set(".wave-first-m", { y: 0 });
    },
  })
    .to(".coin-m", {
      opacity: 1,
      y: 30,
      duration: 0.5,
      delay: 0.2,
      ease: "power2.out",
      onStart: () => {
        gsap.set(".coin-m", { y: 0 });
      },
    })
    .to(".wave-4-m", {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
      onComplete: () => {
        document.querySelector(".wave-4-m").style.display = "none";
      },
    })
    .to(".one-cent-m", { opacity: 1, duration: 0.3 })
    .to(".one-cent-m", { opacity: 0, duration: 0.3, delay: 2 })
    .to(".one-prenatal-m", { opacity: 1, duration: 0.3 })
    .to(".one-prenatal-m", { opacity: 0, duration: 0.3, delay: 2 })
    .to(".one-huge-m", { opacity: 1, duration: 0.3 })
    .to(".one-huge-m", { opacity: 0, duration: 0.3, delay: 2 })
    .to(".wave-8-m", {
      opacity: 0,
      duration: 0,
      delay: 0.1,
      onComplete: () => {
        document.querySelector(".wave-4-m").style.display = "none";
      },
    })
    .to(".wave-7-m", {
      opacity: 0,
      duration: 0,
      delay: 0.1,
      onComplete: () => {
        document.querySelector(".wave-4-m").style.display = "none";
      },
    })
    .to(".wave-6-m", {
      opacity: 0,
      duration: 0,
      delay: 0.1,
      onComplete: () => {
        document.querySelector(".wave-4-m").style.display = "none";
      },
    })
    .to(".wave-5-m", {
      opacity: 0,
      duration: 0,
      delay: 0,
      onComplete: () => {
        document.querySelector(".wave-4-m").style.display = "none";
      },
    })
    .to(".toss-m", { opacity: 1, duration: 0.3 })
    .to(".arrow-m", {
      opacity: 1,
      duration: 0.3,
    })
    .to(".arrow-m", {
      y: -2,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
    .to(".movement-m", { opacity: 1, duration: 1, stagger: 0.1 })
    .call(() => {
      const coin = document.querySelector(".coin-m");
      gsap.to(coin, {
        repeat: 2,
        yoyo: true,
        duration: 0.1,
        stagger: 0.05,
        keyframes: {
          "0%": { x: 0 },
          "25%": { x: -2 },
          "50%": { x: 2 },
          "75%": { x: -2 },
          "100%": { x: 0 },
        },
      });
    })
    .call(makeMobileCoinDraggable);

    function makeMobileCoinDraggable() {
      const coin = document.querySelector(".coin-m");
      const movementElements = document.querySelectorAll(".movement-m");
      const toss = document.querySelector(".toss-m");
      const arrow = document.querySelector(".arrow-m");
      const splash = document.querySelectorAll(".splash-m");
      const pill = document.querySelector(".pill-m");
    
      let hasPlayedFinalAnimation = false; // Flag to ensure animation is played only once
    
      Draggable.create(coin, {
        type: "y",
        bounds: { minY: 0, maxY: 150 },
        onDragStart: function () {
          gsap.to(movementElements, { opacity: 0, duration: 0.5 });
          gsap.to(arrow, { opacity: 0, duration: 0.1 });
        },
        onDragEnd: function () {
          if (hasPlayedFinalAnimation) return; // Prevent the animation from replaying
    
          gsap.to([toss, coin], { opacity: 0, duration: 0.2 });
          gsap.fromTo(
            splash,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.2,
              stagger: 0.1,
              onComplete: () => {
                gsap.delayedCall(0.2, () => {
                  gsap.to(splash, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                      gsap.fromTo(
                        pill,
                        { opacity: 0 },
                        {
                          opacity: 1,
                          duration: 0.2,
                          onComplete: () => {
                            if (!hasPlayedFinalAnimation) {
                              finalMobileAnimation(); // Call the animation
                              hasPlayedFinalAnimation = true; // Set the flag to true to prevent future calls
                            }
                          },
                        }
                      );
                    },
                  });
                });
              },
            }
          );
        },
      });
    }
    

  function finalMobileAnimation() {
    console.log("played")
    const waves = document.querySelectorAll(".wave-m");
    const pill = document.querySelector(".pill-m");
    const leftPill = document.querySelector(".left-pill-m");
    const rightPill = document.querySelector(".right-pill-m");
    const dots = document.querySelectorAll(".dot-m");
    const ripples = document.querySelectorAll(".ripple-m");
    const topText = document.querySelectorAll(".hero__top");
    const bottomText = document.querySelectorAll(".hero__bottom");
    const scrollButton = document.querySelector(".hero__scroll");
    const intro = document.querySelector(".hero__intro");

    const tl = gsap.timeline();

    tl.to(waves, { opacity: 0, duration: 0.5 })
      .to(pill, { opacity: 0, duration: 0.3 })
      .to(leftPill, { opacity: 1, duration: 0.3 })
      .to(rightPill, { opacity: 1, duration: 0.3 }, "-=0.3")
      .to(dots, { opacity: 1, duration: 0.2, stagger: 0.1 })
      .to(ripples, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: "power4.out",
      })
      .to(intro, { scale: 1.1, duration: 1 })
      .to(ripples, { opacity: 0.2, duration: 0.8 })
      .to(leftPill, { opacity: 0, duration: 0.3 })
      .to(rightPill, { opacity: 0, duration: 0.3 }, "-=0.3")
      .to([redDot, purpleDot, blueDot1, greenDot, blueDot2], {
        duration: 1,
        opacity: 1,
        scale: 0.8,
        stagger: 0, // No stagger, all happen at the same time
        x: function (i) {
          return [
            "-33vw", // redDot
            "18vh", // purpleDot
            "-10vh", // blueDot1
            "10vh", // greenDot
            "-5vh", // blueDot2
          ][i];
        },
        y: function (i) {
          return [
            "-20vh", // redDot
            "-6vh", // purpleDot
            "38vh", // blueDot1
            "20vh", // greenDot
            "-32vh", // blueDot2
          ][i];
        },
      })
      .to(topText, {
        opacity: 1,
        duration: 1,
        transform: "translateY(0)",
        ease: "power2.out",
      })

      
      .to(bottomText, {
        opacity: 1,
        duration: 1,
        transform: "translateY(0)",
        ease: "power2.out",
        delay: 0.2,
      })
      .to(scrollButton, {
        opacity: 1,
        duration: 1,
        transform: "translateX(-50%) translateY(0)",
      })
      document.body.style.overflowY = "scroll";
      skipButton.style.opacity = "0";
      firstEllipse.style.opacity = 1;
      formPopup.style.opacity = 1;
      formPopup.style.zIndex = 99;
  }
});
