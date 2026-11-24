const params = new URLSearchParams(window.location.search); // Возвращает часть адреса страницы (для product.html?id=7 вернет ?id=7)

const productId = Number(params.get("id")); // Number преобразует id в число

// Возвращаемся к функции в data.js (возвращает объект)
const selectedProduct = findProductById(productId);

// Меняем заголовок на странице
const productHeading = document.querySelector("#product-heading");

const productDetails = document.querySelector(".product-details");

if (selectedProduct) {
  productHeading.textContent = selectedProduct.title;

  // Далее как при создании карточки каталога (main.js)
  const image = document.createElement("img");
  image.src = selectedProduct.image;
  image.alt = selectedProduct.title;
  image.className = "detail-image";

  const description = document.createElement("p");
  description.className = "detail-description";
  description.textContent = selectedProduct.description;

  const price = document.createElement("p");
  price.className = "detail-price";

  const finalPrice = calculateDiscount(
    selectedProduct.price,
    selectedProduct.discountPercent,
  );

  price.textContent = formatPrice(finalPrice);

  const availability = document.createElement("p");
  availability.textContent = getAvailability(selectedProduct);

  // Кнопка добавления товара в корзину
  const buyButton = document.createElement("button");
  buyButton.type = "button";
  buyButton.className = "product-button detail-button";
  buyButton.textContent = "В корзину";

  if (selectedProduct.isAvailable === false) {
    buyButton.disabled = true;
    buyButton.textContent = "Недоступно";
  }

  buyButton.addEventListener("click", () => {
    addToCart(selectedProduct.id); // Добавление товара в корзну через cart.js
    buyButton.textContent = "Товар добавлен в корзину";
  });

  productDetails.append(image, description, price, availability, buyButton);
} else {
  productHeading.textContent = "Напиток не найден";
}
