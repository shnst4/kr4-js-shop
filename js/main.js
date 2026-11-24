console.log("Добро пожаловать в Напиточную!");

// Находим нужный элемент по css селектору
const productsGrid = document.querySelector(".popular .products-grid");
function createProductCard(drink) {
  const productCard = document.createElement("article");
  productCard.className = "product-card";

  const productImage = document.createElement("img");
  productImage.src = drink.image; // Путь к файлу
  productImage.alt = drink.title;
  productImage.className = "product-image";

  // Создаем элемент h3 и вставляем текст (заголовок напитка)
  const productTitle = document.createElement("h3");
  const productLink = document.createElement("a");
  productLink.href = "product.html?id=" + drink.id;
  productLink.textContent = drink.title;
  productLink.className = "product-link";

  // Ссылку добавляем внутрь заголовка (теперь заголовок = кликабельная ссылка на информацию об объекте)
  productTitle.append(productLink);

  // Создаем описание к элементу
  const productDescription = document.createElement("p");
  productDescription.className = "product-description";
  productDescription.textContent = drink.description;

  const productPrice = document.createElement("p");
  productPrice.className = "product-price";

  const discountedPrice = calculateDiscount(drink.price, drink.discountPercent);

  if (drink.discountPercent > 0) {
    const oldPrice = document.createElement("del"); // del - удаленный или неактуальный текст, который по умолчанию будет зачеркнутым
    oldPrice.className = "product-old-price";
    oldPrice.textContent = formatPrice(drink.price);

    productPrice.append(oldPrice);
  }

  const currentPrice = document.createElement("span");
  currentPrice.textContent = formatPrice(discountedPrice);

  productPrice.append(currentPrice);

  const productAvailability = document.createElement("p");
  productAvailability.className = "product-availability";
  productAvailability.textContent = getAvailability(drink); // Функция, есть ли в начилии, из main.js

  // Создаем кнопку перехода в корзину
  const productButton = document.createElement("button");
  productButton.type = "button";
  productButton.className = "product-button";
  productButton.textContent = "В корзину";

  if (drink.isAvailable === false) {
    productButton.disabled = true; // Кнопка недоступна для нажатия
    productButton.textContent = "Недоступно";
  }

  // Обработчик события (по клику)
  productButton.addEventListener("click", () => {
    addToCart(drink.id); // Переходим к cart.js
    productButton.textContent = "Товар добавлен в корзину:)";
  });

  productCard.append(
    productImage,
    productTitle,
    productDescription,
    productPrice,
    productAvailability,
    productButton,
  );
  return productCard;
}

if (productsGrid) {
  const popularIds = [1, 3, 10]; //Сами выберем популярные товары магазина

  const popularProducts = products.filter((drink) => {
    // includes() проверяет, содержится ли определённое значение в массиве
    return popularIds.includes(drink.id);
  });

  for (const drink of popularProducts) {
    const productCard = createProductCard(drink);
    productsGrid.append(productCard);
  }
}
