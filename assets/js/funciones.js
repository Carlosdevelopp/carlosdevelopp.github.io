$(function () {
  if ($("html").hasClass("dark-style")) {
    $(".footer").removeClass("bg-white").addClass("bg-dark");
  }

  // Navbar
  //

  var navbarScrollThreshold = 20;
  var navbarBreakpoint = 992;

  // Custom classes that will be applied depending on page scrollTop value
  var navbarCustomClasses = {
    // when user is on the top of the page
    default: {},

    // when page scrollTop value > navbarScrollThreshold
    alt: {},
  };

  // Set custom classes depending on landing variant
  if ($("html").hasClass("2")) {
    navbarCustomClasses = {
      default: {
        variant: "navbar-dark",
        classes: "pt-lg-4",
      },
      alt: {
        variant: "bg-dark",
        classes: "py-1",
      },
    };
  }

  // Navbar scroll behaviour
  //
  var $navbar = $(".landing-navbar");
  var $navbarCollapse = $("#landing-navbar-collapse");

  $(document).on("scroll", function (e) {
    var scrollTop = $(document).scrollTop();

    if (
      scrollTop > navbarScrollThreshold &&
      !$navbar.hasClass("landing-navbar-alt")
    ) {
      $navbar
        .addClass("landing-navbar-alt")
        .removeClass(
          navbarCustomClasses.default.variant +
            " " +
            navbarCustomClasses.default.classes
        )
        .addClass(
          navbarCustomClasses.alt.variant +
            " " +
            navbarCustomClasses.alt.classes
        )
        .find("> div")
        .removeClass("container-fluid")
        .addClass("container");
    } else if (
      scrollTop <= navbarScrollThreshold &&
      $navbar.hasClass("landing-navbar-alt")
    ) {
      $navbar
        .removeClass("landing-navbar-alt")
        .addClass(navbarCustomClasses.default.classes)
        .removeClass(navbarCustomClasses.alt.classes)
        .find("> div")
        .addClass("container-fluid")
        .removeClass("container");

      if (
        $(window).outerWidth() >= navbarBreakpoint ||
        !$navbarCollapse.hasClass("show")
      ) {
        $navbar
          .addClass(navbarCustomClasses.default.variant)
          .removeClass(navbarCustomClasses.alt.variant);
      }
    }
  });

  $navbarCollapse.on("show.bs.collapse hidden.bs.collapse", function (e) {
    if ($navbar.hasClass("landing-navbar-alt")) return;

    $navbar[e.type === "show" ? "removeClass" : "addClass"](
      navbarCustomClasses.default.variant
    );

    $navbar[e.type === "show" ? "addClass" : "removeClass"](
      navbarCustomClasses.alt.variant
    );
  });

  $(window).on("resize", function () {
    if ($navbar.hasClass("landing-navbar-alt")) return;

    var sm = $(this).outerWidth() < navbarBreakpoint;
    var alt = $navbar.hasClass(navbarCustomClasses.alt.variant);

    if (sm && !alt && $navbarCollapse.hasClass("show")) {
      $navbar
        .removeClass(navbarCustomClasses.default.variant)
        .addClass(navbarCustomClasses.alt.variant);
    } else if (!sm && alt) {
      $navbar
        .removeClass(navbarCustomClasses.alt.variant)
        .addClass(navbarCustomClasses.default.variant);
    }
  });

  // Anchor links
  //

  $("body").on("click", ".anchor-link", function (e) {
    e.preventDefault();
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop:
            Math.round($(this.getAttribute("href")).offset().top) + "px",
        },
        500
      );
  });

  // Reviews
  //

  $("#landing-testimonials-slider").each(function () {
    new Swiper(this, {
      navigation: {
        nextEl: "#landing-testimonials-slider-next",
        prevEl: "#landing-testimonials-slider-prev",
      },
    });
  });

  // Logos
  //

  $("#landing-logos-slider").each(function () {
    new Swiper(this, {
      slidesPerView: 6,
      spaceBetween: 30,
      breakpoints: {
        1500: {
          slidesPerView: 6,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        576: {
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 3,
        },
        360: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 2,
        },
        280: {
          slidesPerView: 2,
        },
      },
      navigation: {
        nextEl: "#landing-logos-slider-next",
        prevEl: "#landing-logos-slider-prev",
      },
    });
  });
});
