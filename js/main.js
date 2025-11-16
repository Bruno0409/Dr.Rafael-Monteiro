(function ($) {
  "use strict";

  // Spinner
  window.onload = function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  };

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".sticky-top").addClass("transparent");
    } else {
      $(".sticky-top").removeClass("transparent");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Before-After Slider
  $(".before-after-slider").each(function () {
    var $slider = $(this);
    var $beforeAfterImg = $slider.find(".before-after-img img:nth-child(2)");
    var $beforeAfterBar = $slider.find(".before-after-bar");
    var isMouseDown = false;

    // Função para lidar com o movimento da barra de arraste
    var moveSlider = function (e) {
      if (isMouseDown) {
        // Calcula a posição do clique ou toque
        var sliderOffsetX = $slider.offset().left;
        var sliderWidth = $slider.width();
        var offsetX;

        if (e.type.startsWith("touch")) {
          // Se for um evento de toque, pega a posição do toque
          offsetX = e.originalEvent.touches[0].pageX - sliderOffsetX;
        } else {
          // Se for um evento de mouse, pega a posição do clique
          offsetX = e.pageX - sliderOffsetX;
        }

        // Limita o movimento da barra dentro dos limites do slider
        offsetX = Math.min(Math.max(0, offsetX), sliderWidth);

        // Atualiza o "clip-path" da imagem "depois" com base no movimento da barra
        $beforeAfterImg.css(
          "clip-path",
          "inset(0 " + (100 - (offsetX / sliderWidth) * 100) + "% 0 0)"
        );

        // Atualiza a posição da barra de arraste
        $beforeAfterBar.css("left", offsetX + "px");
      }
    };

    // Quando o usuário pressiona a barra de arraste
    $beforeAfterBar.on("mousedown touchstart", function (e) {
      isMouseDown = true;
      $("body").css("user-select", "none"); // Impede a seleção de texto
      // Previne o comportamento padrão (evita o scroll em dispositivos móveis)
      e.preventDefault();
    });

    // Quando o usuário move o mouse ou toca
    $(document).on("mousemove touchmove", function (e) {
      moveSlider(e);
    });

    // Quando o usuário solta o mouse ou o toque
    $(document).on("mouseup touchend", function () {
      isMouseDown = false;
      $("body").css("user-select", ""); // Restaura a seleção de texto
    });
  });
})(jQuery);
