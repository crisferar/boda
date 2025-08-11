document.addEventListener("DOMContentLoaded", () => {
  // Esperar a que la página esté completamente cargada
  window.addEventListener("load", () => {
    // document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = "hidden";

    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    setTimeout(() => {
      preloader.classList.add("hidden");
      mainContent.classList.add("visible");
    }, 500);

    AOS.init({
      duration: 2000,
    });

    // Inicializar Swiper
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: -30,
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
      },
    });

    // Pausa el autoplay cuando el mouse está sobre el slider
    const swiperContainer = document.querySelector(".swiper");
    swiperContainer.addEventListener("mouseenter", () => {
      swiper.autoplay.stop();
    });

    swiperContainer.addEventListener("mouseleave", () => {
      swiper.autoplay.start();
    });

    // Inicializar todos los tooltips en la página
    const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach(function (tooltipElement) {
      new bootstrap.Tooltip(tooltipElement);
    });

    // Inicializar el tooltip con opción manual
    const copyButton = document.getElementById("copyButton");
    const tooltipInstance = new bootstrap.Tooltip(copyButton, {
      trigger: "manual", // Esto desactiva el comportamiento por hover
    });

    document
      .getElementById("copyButton")
      .addEventListener("click", function () {
        const texto = "ES0915830001169125352225";

        navigator.clipboard
          .writeText(texto)
          .then(() => {
            const button = document.getElementById("copyButton");

            // Mostrar el tooltip manualmente
            tooltipInstance.show();

            // Ocultar el tooltip después de 2 segundos
            setTimeout(() => {
              tooltipInstance.hide();
            }, 2000);
          })
          .catch((err) => {
            console.error("Error al copiar al portapapeles:", err);
          });
      });

    // Timeline
    timeline(document.querySelectorAll(".timeline"), {
      forceVerticalMode: 992,
      mode: "horizontal",
      visibleItems: 5,
    });

    timeline(document.querySelectorAll(".vuelta"), {
      forceVerticalMode: 992,
      mode: "horizontal",
      visibleItems: 3,
    });

    // Enviar Formulario - VERSIÓN MEJORADA
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbykKlKFvAkW1xQ6sy8vydTrgo9DKQwSA-nP_-QEGOvhBcsn_6ChRMAmILa7sHQyk3iBjQ/exec";

    const form = document.forms["confirm-form"];
    let isSubmitting = false; // Variable para controlar si ya se está enviando

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Evitar envíos múltiples
      if (isSubmitting) {
        return;
      }

      isSubmitting = true;

      // Obtener el botón de envío
      const submitButton = form.querySelector('button[name="register"]');
      const originalButtonText = submitButton.innerHTML;

      // Deshabilitar el botón y cambiar el texto
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Enviando...';

      const formData = new FormData(form);
      console.log(formData);

      try {
        const response = await fetch(scriptURL, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // Éxito - cambiar botón a estado de éxito
          submitButton.innerHTML = '<i class="fa-solid fa-check me-2"></i>¡Enviado!';
          submitButton.classList.remove('btn-warning');
          submitButton.classList.add('btn-success');

          // Mostrar mensaje de éxito
          alert("¡Formulario enviado correctamente! Gracias por confirmar tu asistencia.");

          // Limpiar el formulario
          form.reset();

          // Restaurar botón después de 3 segundos
          setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-warning');
            submitButton.disabled = false;
            isSubmitting = false;
          }, 3000);
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
      } catch (error) {
        console.error("Error:", error);

        // Error - cambiar botón a estado de error
        submitButton.innerHTML = '<i class="fa-solid fa-times me-2"></i>Error';
        submitButton.classList.remove('btn-warning');
        submitButton.classList.add('btn-danger');

        alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");

        // Restaurar botón después de 3 segundos
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.classList.remove('btn-danger');
          submitButton.classList.add('btn-warning');
          submitButton.disabled = false;
          isSubmitting = false;
        }, 3000);
      }
    });
  });
});

const util = (() => {
  const animation = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#FFC0CB", "#FF1493", "#C71585"];

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
      matrix: [
        0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666,
        -5.533333333333333,
      ],
    });

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      colors.forEach((color) => {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: Math.max(50, 100 * (timeLeft / duration)),
          origin: {
            x: Math.random(),
            y: Math.abs(Math.random() - timeLeft / duration),
          },
          zIndex: 1057,
          colors: [color],
          shapes: [heart],
          drift: randomInRange(-0.5, 0.5),
          gravity: randomInRange(0.5, 1),
          scalar: randomInRange(0.5, 1),
        });
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const init = async (button) => {
    button.disabled = true;
    // document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = "auto"; // o 'scroll'
    // document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = "hidden";
    const mainContent = document.getElementById("main-content");
    const pageContent = document.getElementById("page-content");
    mainContent.classList.remove("visible");
    pageContent.classList.add("visible");

    audio.play();
    document.getElementById("btn-music").style.display = "block";
    timer();

    confetti({
      origin: { y: 0.9 },
      zIndex: 1057,
    });
    // await session.check();
    animation();
    AOS.refreshHard();
  };

  const timer = () => {
    let countDownDate = new Date(
      document
        .getElementById("tampilan-waktu")
        .getAttribute("data-waktu")
        .replace(" ", "T")
    ).getTime();

    setInterval(() => {
      let distance = Math.abs(countDownDate - new Date().getTime());

      document.getElementById("hari").innerText = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );
      document.getElementById("jam").innerText = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      document.getElementById("menit").innerText = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      document.getElementById("detik").innerText = Math.floor(
        (distance % (1000 * 60)) / 1000
      );
    }, 1000);
  };

  const music = (btn) => {
    if (btn.getAttribute("data-status") !== "true") {
      btn.setAttribute("data-status", "true");
      audio.play();
      btn.innerHTML = '<i class="fa-solid fa-circle-pause spin-button"></i>';
    } else {
      btn.setAttribute("data-status", "false");
      audio.pause();
      btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  };

  const animate = (svg, timeout, classes) => {
    let handler = null;

    handler = setTimeout(() => {
      svg.classList.add(classes);
      handler = null;
    }, timeout);
  };

  return {
    init,
    // modal,
    music,
    // salin,
    // escapeHtml,
    // show,
    animate,
  };
})();

const audio = (() => {
  let audio = null;

  const singleton = () => {
    if (!audio) {
      audio = new Audio();
      audio.src = document.getElementById("btn-music").getAttribute("data-url");
      audio.load();
      audio.currentTime = 0;
      audio.autoplay = true;
      audio.muted = false;
      audio.loop = true;
      audio.volume = 1;
    }

    return audio;
  };

  return {
    play: () => singleton().play(),
    pause: () => singleton().pause(),
  };
})();
