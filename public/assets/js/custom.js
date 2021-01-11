$(document).ready(function () {
     $('.navbar-toggler').click(function () {
          $('.navbar-collapse').slideToggle();
     });



     $("#owl-demo").owlCarousel({
          navigation: false, // hide next and prev buttons
          slideSpeed: 300,
          singleItem: true,
          items: 1,
          autoPlay: 5000,
          loop: true,


     });

     $("#myCarousel") > $(".list-inline-item").each(function(index) {
          $(this).on("click", function() {
               $(this).parent().find(".list-inline-item.active").removeClass("active");
               $(this).addClass("active");
               $("#myCarousel") > $(".carousel-item.active").fadeOut(500, function() {
                    $("#myCarousel") > $(".carousel-item.active").css("z-index", 1).show().removeClass("active");
                    $("#myCarousel") > $(".carousel-item:eq("+index+")").css("z-index", 2).addClass("active");
               });                                         
          });
     });

});



