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
      webGL.render(); // immediately update background colors
    });
  }

  // --- Slider JS ---
  const slider = document.querySelector('.slider-track');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const dotsContainer = document.querySelector('.slider-dots');
  const jobCards = Array.from(document.querySelectorAll('.job'));

  if (slider && leftArrow && rightArrow && dotsContainer && jobCards.length) {
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
      scrollToIndex((currentIndex - 1 + jobCards.length) % jobCards.length);
    });

    rightArrow.addEventListener('click', () => {
      scrollToIndex((currentIndex + 1) % jobCards.length);
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
  }

  // --- Cat Cards ---
  $(".desc").hide();
  let color = "one";
  let counter = 0;

  $(".hexagon").hover(
    function () {
      $(this).find(".desc").fadeIn("fast");
      counter = (counter + 1) % 5;
      switch (counter) {
        case 0: color = "base"; break;
        case 1: color = "one"; break;
        case 2: color = "two"; break;
        case 3: color = "three"; break;
        default: color = "base"; break;
      }
      $(this).find(".desc").addClass(color);
    },
    function () {
      $(this).find(".desc").fadeOut("fast", function () {
        $(this).removeClass(color);
      });
    }
  );

  // --- Email Icon Animation ---
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

  // --- Arrow Symbol Toggle ---
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.title-arrow');

    card.addEventListener('mouseover', () => {
      title.classList.add('flipped');
    });

    card.addEventListener('mouseout', () => {
      title.classList.remove('flipped');
    });
  });


  // --- Glowing WebGL Background ---
  const header = document.querySelector('.burner');
  if (header) {
    const canvas = document.createElement('canvas');
    header.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    header.style.position = 'relative';
    header.style.overflow = 'hidden';

    const fragmentShaderSource = `#version 300 es
    precision highp float;
    uniform float time;
    uniform vec2 vp;
    uniform vec3 color1;
    uniform vec3 color2;
    in vec2 uv;
    out vec4 fragColor;

    float rand(vec2 p) {
        return fract(sin(dot(p.xy, vec2(1., 300.))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = rand(i);
        float b = rand(i + vec2(1.0, 0.0));
        float c = rand(i + vec2(0.0, 1.0));
        float d = rand(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    #define OCTAVES 5
    float fbm(vec2 p) {
        float value = 0.;
        float amplitude = .4;
        for (int i = 0; i < OCTAVES; i++) {
            value += amplitude * noise(p);
            p *= 2.;
            amplitude *= .4;
        }
        return value;
    }

    void main() {
        vec2 p = uv.xy;
        p.x *= vp.x / vp.y;
        float gradient = mix(p.y*.6 + .1, p.y*1.2 + .9, fbm(p));
        float speed = 0.2;
        float details = 7.;
        float force = 1.1; // from 0.9
        float shift = 0.6; // from 0.5
        vec2 fast = vec2(p.x, p.y - time*speed) * details;
        float ns_a = fbm(fast);
        float ns_b = force * fbm(fast + ns_a + time) - shift;
        float nns = force * fbm(vec2(ns_a, ns_b));
        float ins = fbm(vec2(ns_b, ns_a));
        vec3 c1 = mix(color1, color2, ins + shift);
        fragColor = vec4(c1 + vec3(ins - gradient), 1.0);
    }`;

    class WebGLHandler {
      vertexShaderSource = `#version 300 es
      precision mediump float;
      const vec2 positions[6] = vec2[6](
        vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
        vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0)
      );
      out vec2 uv;
      void main() {
        uv = positions[gl_VertexID];
        gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
      }`;

      constructor(canvas, fragmentShaderSource) {
        this.cn = canvas;
        this.gl = canvas.getContext('webgl2');
        this.startTime = Date.now();

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.program = this.gl.createProgram();
        this.compileShader(this.vertexShaderSource, this.gl.VERTEX_SHADER);
        this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        this.timeLocation = this.gl.getUniformLocation(this.program, 'time');
        this.resolutionLocation = this.gl.getUniformLocation(this.program, 'vp');

        this.color1Location = this.gl.getUniformLocation(this.program, 'color1');
        this.color2Location = this.gl.getUniformLocation(this.program, 'color2');

        this.render();
      }

      resize() {
        const rect = this.cn.getBoundingClientRect();
        this.cn.width = rect.width;
        this.cn.height = rect.height;
        this.gl.viewport(0, 0, this.cn.width, this.cn.height);
      }

      compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error(this.gl.getShaderInfoLog(shader));
          this.gl.deleteShader(shader);
          return null;
        }
        this.gl.attachShader(this.program, shader);
      }

      render = () => {
        this.gl.uniform1f(this.timeLocation, (Date.now() - this.startTime) / 1000);
        this.gl.uniform2fv(this.resolutionLocation, [this.cn.width, this.cn.height]);

        const isDarkMode = document.body.classList.contains('dark-mode');
        const color1 = isDarkMode
        ? [0.32, 0.45, 0.65]  // #5173a6 — brighter blue
        : [0.675, 0.757, 0.847]; // #adc1d8

      const color2 = isDarkMode
        ? [0.051, 0.106, 0.165] // #0d1b2a
        : [0.878, 0.882, 0.867]; // #e0e1dd


        this.gl.uniform3fv(this.color1Location, color1);
        this.gl.uniform3fv(this.color2Location, color2);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        window.requestAnimationFrame(this.render);
      }
    }

    new WebGLHandler(canvas, fragmentShaderSource);
  }

});

