const orderForm = document.querySelector("#order-form");
const orderMessage = document.querySelector("#order-message");

// submit срабатывает при попытке отправить форму
orderForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Чтобы браузер по умолчанию не перешел на другую страницу или не было перезагрузки страницы

  const name = document.querySelector("#customer-name").value.trim();
  const phone = document.querySelector("#customer-phone").value.trim();
  const address = document.querySelector("#customer-address").value.trim();

  // Все символы кроме цифр убираем (меняем на "")
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.length < 2) {
    orderMessage.textContent = "Введите имя не короче 2 символов.";
    return;
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    orderMessage.textContent = "Введите корректный номер телефона.";
    return;
  }
  if (address.length < 5) {
    orderMessage.textContent = "Введите более подробный адрес.";
    return;
  }

  // Непосредственно оформление заказа (извлечение данных из корзины)
  const savedCart = localStorage.getItem("cart");
  const cartIds = savedCart ? JSON.parse(savedCart) : [];

  if (cartIds.length === 0) {
    orderMessage.textContent = "Корзина пустая. Сначала добавьте напитки.";
    return;
  }

  localStorage.removeItem("cart");
  orderForm.reset();
  orderMessage.textContent = "Заказ оформлен! Спасибо за жизнь!";
});
