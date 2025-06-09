// Light Mode / Dark Mode

console.log("Welcome to the resume page!");

document.addEventListener('DOMContentLoaded', function () {
  // --- Dark Mode Logic ---
  const body = document.body;
  const toggleBtn = document.getElementById('mode-toggle');

  if (toggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      toggleBtn.textContent = 'Light Mode';
    } else {
      toggleBtn.textContent = 'Dark Mode';
    }

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });
  }

  // --- Slider JS ---
  const slider = document.querySelector('.slider-track');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const dotsContainer = document.querySelector('.slider-dots');
  const jobCards = Array.from(document.querySelectorAll('.job'));

  if (!slider || !leftArrow || !rightArrow || !dotsContainer) {
    console.warn('Slider or dot elements not found.');
    return;
  }

  const jobCard = jobCards[0];
  let currentIndex = 0;

  function updateDots(index) {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function scrollToIndex(index) {
    const offset = index * (jobCard.offsetWidth + 24); // adjust 24px margin as needed
    slider.scrollTo({ left: offset, behavior: 'smooth' });
    currentIndex = index;
    updateDots(currentIndex);
  }

  function createDots() {
    jobCards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToIndex(index));
      dotsContainer.appendChild(dot);
    });
  }

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    } else {
      scrollToIndex(jobCards.length - 1);
    }
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex < jobCards.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      scrollToIndex(0);
    }
  });

  slider.addEventListener('scroll', () => {
    const scrollLeft = slider.scrollLeft;
    const cardWidth = jobCard.offsetWidth + 24;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots(currentIndex);
    }
  });

  window.addEventListener('resize', () => {
    scrollToIndex(currentIndex);
  });

  createDots();
});

// --- Cat Cards ---

$(document).ready(function () {
  var color = "one";
  var counter = 0;
  $(".desc").hide();
  $(".hexagon").hover(
    function () {
      $(this).find(".desc").fadeIn("fast");
      counter++;
      if (counter === 0) {
        color = "base";
      } else if (counter === 1) {
        color = "one";
      } else if (counter === 2) {
        color = "two";
      } else if (counter === 3) {
        color = "three";
      } else if (counter >= 4) {
        counter = 0;
        color = "base";
      }
      $(this).find(".desc").addClass(color);
    },
    function () {
      $(this)
        .find(".desc")
        .fadeOut("fast", function () {
          $(this).removeClass(color);
        });
    }
  );
});

// --- Email Icon Animation ---

$(document).ready(function () {
  const line1 = $('#env-line-1');
  const line2 = $('#env-line-2');
  const line3 = $('#env-line-3');
  const mailIcon = $('#mail-icon');
  const envLid = $('#env-lid');
  const envPaper = $('#env-paper');

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "back.out(1.7)" }
  });

  tl.to(envLid, {
      duration: 0.3,
      scaleY: -1,
      y: 1.5
    })
    .fromTo(envPaper, {
      transformOrigin: "50% 100%",
      scaleY: 0
    }, {
      duration: 0.4,
      scaleY: 1
    }, "-=0.25")
    .fromTo([line1, line2, line3], {
      transformOrigin: "50% 50%",
      scaleX: 0
    }, {
      duration: 0.3,
      scaleX: 1,
      stagger: -0.09
    });

  $(mailIcon).on('click', function (e) {
    e.preventDefault();

    const isToggled = $(this).hasClass('toggled');

    if (isToggled) {
      tl.reverse();
    } else {
      tl.play().then(() => {
        window.location.href = 'mailto:jonathonblevins@example.com';
      });
    }

    $(this).toggleClass('toggled');
  });
});
