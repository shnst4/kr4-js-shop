const orderForm = document.querySelector("#order-form");

// submit срабатывает при попытке отправить форму
orderForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Чтобы браузер по умолчанию не перешел на другую страницу или не было перезагрузки страницы

  const name = document.querySelector("#customer-name").value.trim();
  const phone = document.querySelector("#customer-phone").value.trim();
  const address = document.querySelector("#customer-address").value.trim();

  console.log("Имя:", name);
  console.log("Телефон:", phone);
  console.log("Адрес:", address);
});
