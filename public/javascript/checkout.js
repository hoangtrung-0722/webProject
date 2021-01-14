$().ready(function () {
  const phoneRegex = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
  $("#billForm").submit(function (event) {
    const phone = $("#billForm").find('input[name="phone"]').val();
    if (!phone.match(phoneRegex)) {
        $("#billForm").prepend('<div class="alert alert-danger" role="alert">Phone number does not look right</div>')
      event.preventDefault();
    }
    const cartItems = localStorage.getItem('cartItems');
    const input = $("<input />").attr("type", "hidden").attr("name", "products").attr("value", cartItems);
    $('#billForm').append(input);
  });
});
