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

  if (!slider || !leftArrow || !rightArrow) {
    console.warn('Slider elements not found.');
    return;
  }

  const jobCard = document.querySelector('.job');

  leftArrow.addEventListener('click', () => {
    slider.scrollBy({ left: -(jobCard.offsetWidth + 24), behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    slider.scrollBy({ left: jobCard.offsetWidth + 24, behavior: 'smooth' });
  });

  /*
  // Autoplay with pause on hover
  let autoScroll = setInterval(() => {
    slider.scrollBy({ left: slider.offsetWidth * 0.9, behavior: 'smooth' });
  }, 8000);

  slider.addEventListener('mouseenter', () => {
    clearInterval(autoScroll);
  });

  slider.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      slider.scrollBy({ left: slider.offsetWidth * 0.9, behavior: 'smooth' });
    }, 8000);
  });
  */
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
        window.location.href = 'mailto:jonathonblevins@gmail.com';
      });
    }

    $(this).toggleClass('toggled');
  });
});