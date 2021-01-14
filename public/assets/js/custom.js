$(document).ready(function () {

  $(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle();
  });

  $("#owl-demo").owlCarousel({
    navigation: false, // hide next and prev buttons
    slideSpeed: 500,
    singleItem: true,
    items: 1,
    autoPlay: 5000,
    loop: true,
  });

  $("#myCarousel") >
    $(".list-inline-item").each(function (index) {
      $(this).on("click", function () {
        $(this).parent().find(".list-inline-item.active").removeClass("active");
        $(this).addClass("active");
        $("#myCarousel") >
          $(".carousel-item.active").fadeOut(500, function () {
            $("#myCarousel") >
              $(".carousel-item.active")
                .css("z-index", 1)
                .show()
                .removeClass("active");
            $("#myCarousel") >
              $(".carousel-item:eq(" + index + ")")
                .css("z-index", 2)
                .addClass("active");
          });
      });
    });

  $("#btn-add-cart").click(function () {
    const product_id = $("#btn-add-cart").data("button");
    const quantity = $(".cart").find(".quantity");
    const bookName = $(".product-sec").find("#book-name").html();
    const bookPrice = $(".price.final").html().replace("$", "");

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) {
      if (quantity.html() == 0) {
        quantity.css("display", "block");
      }
      let itemInCart = cartItems.find((item) => item.productId == product_id);

      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + 1;
      } else {
        cartItems.push({
          productId: product_id,
          quantity: 1,
          name: bookName,
          price: bookPrice,
        });
      }
    } else {
      quantity.css("display", "block");
      cartItems = [
        {
          productId: product_id,
          quantity: 1,
          name: bookName,
          price: bookPrice,
        },
      ];
    }
    quantity.html(parseInt(quantity.html()) + 1);

    localStorage.setItem("cartItemQuantity", JSON.stringify(quantity.html()));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });

  if (window.location.href.indexOf("shopping_cart") > -1) {

    getItemsFromCart();
    $('input[name="count"]').change(function () {
      const index = $(this).data("index");
      const newQuantity = $('input[name="count"]').eq(index).val();
      const price = parseFloat($(".price").eq(index).html().replace("$", ""));
      const name = $(".book-name").eq(index).html();
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const currentItem = cartItems.find((item) => item.name == name);
      let bookPrice = 0;
      let totalQuantity = 0
      $(".sum-price")
        .eq(index)
        .html("$" + (newQuantity * price).toFixed(2));
      $(".book-price")
        .eq(index)
        .html("$" + "");
      $("#cart-table tr").each(function (index) {
        if (index != 0) {
          totalQuantity += parseInt($(this).find('td input[name="count"]').val());
          bookPrice += parseFloat(
            $(this).find("td.sum-price").html().replace("$", "")
          );
        }
      });
      $('input[name="bookPrice"]').val(bookPrice.toFixed(2));
      currentItem.quantity = newQuantity;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartItemQuantity', JSON.stringify(updateCartItemQuantity()));
    });
  } else {
    showCartItemQuantity();
  }

});

const getItemsFromCart = function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  let bookPriceTotal = 0;
  cartItems.forEach(function (element, index) {
    const serial = index + 1;
    $("#cart-table")
      .find("tbody")
      .append(
        '<tr><th scope="row" id="serial">' +
          serial +
          '</th><td class="book-name">' +
          element.name +
          '</td><td class="price">$' +
          element.price +
          '</td><td><input type="number" name="count" min="0" value="' +
          element.quantity +
          '" data-index="' +
          index +
          '"></td><td class="sum-price">$' +
          element.price * element.quantity +
          "</td></tr>"
      );
    bookPriceTotal += element.price * element.quantity;
    $('input[name="bookPrice"]').val(bookPriceTotal.toFixed(2));
  });
};

const showCartItemQuantity = function () {
  const quantity = JSON.parse(localStorage.getItem("cartItemQuantity"));
  if (quantity > 0) {
    $(".cart").find(".quantity").css("display", "block");
    $(".cart").find(".quantity").html(quantity);
  }
};

const updateCartItemQuantity = function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  let total = 0;
  cartItems.forEach(function(item) {
    total += parseInt(item.quantity);
  });
  console.log(total);
  return total;
}
