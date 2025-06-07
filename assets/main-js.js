//Light Mode / Dark Mode

console.log("js is running");

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const toggleBtn = document.getElementById('mode-toggle');

  // Safety check to ensure the button exists
  if (!toggleBtn) return;

  // Load user's saved preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
  } else {
    toggleBtn.textContent = 'Dark Mode';
  }

  // Toggle dark mode on click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);

    // Update button text and save theme to localStorage
    if (body.classList.contains('dark-mode')) {
      toggleBtn.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
});


//Cat Cards

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

// Email Icon

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
        // Once animation completes forward, open email
        window.location.href = 'mailto:jonathonblevins@gmail.com';
      });
    }

    $(this).toggleClass('toggled');
  });
});