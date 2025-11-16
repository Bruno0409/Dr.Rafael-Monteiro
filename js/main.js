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

    // Quando o usuário pressiona a barra de arraste
    $beforeAfterBar.on("mousedown", function (e) {
      isMouseDown = true;
      $("body").css("user-select", "none"); // Impede a seleção de texto
    });

    // Quando o usuário move o mouse
    $(document).on("mousemove", function (e) {
      if (isMouseDown) {
        var sliderOffsetX = $slider.offset().left;
        var sliderWidth = $slider.width();
        var offsetX = e.pageX - sliderOffsetX;

        // Limita o movimento da barra dentro dos limites do slider
        offsetX = Math.min(Math.max(0, offsetX), sliderWidth);

        // Altera o "clip-path" da imagem "depois" com base no movimento da barra
        $beforeAfterImg.css(
          "clip-path",
          "inset(0 " + (100 - (offsetX / sliderWidth) * 100) + "% 0 0)"
        );

        // Atualiza a posição da barra de arraste
        $beforeAfterBar.css("left", offsetX + "px");
      }
    });

    // Quando o usuário solta o mouse
    $(document).on("mouseup", function () {
      isMouseDown = false;
      $("body").css("user-select", ""); // Restaura a seleção de texto
    });
  });
})(jQuery);
