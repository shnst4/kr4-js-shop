// Работаем через localStorage (хранилище браузера)

function addToCart(productId) {
  const savedCart = localStorage.getItem("cart");

  // Если есть товары в корзине - превращаем строку обратно в массив (тк localStorage хранит строки id)
  const cart = savedCart ? JSON.parse(savedCart) : [];

  cart.push(productId);

  // setItem записывает данные в ls, stringify() преобразует массив в строку (формат для хранения в ls)
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Сюда будем добавлять выбранные напитки
const cartItems = document.querySelector(".cart-items");
// Подсчет цены для корзины
const cartTotal = document.querySelector("#cart-total");

if (cartItems && cartTotal) {
  // Читает сохранённую строку из localStorage и преобразуем её в массив
  const savedCart = localStorage.getItem("cart");
  const cartIds = savedCart ? JSON.parse(savedCart) : [];

  // Создаем коллекцию уникальных элементов, чтобы не было повторяющихся напитков в корзине (... - синтаксис развертывания значений из коллекции в новый массив)
  const uniqueIds = [...new Set(cartIds)];

  // reduce - метод, который проходится по всем эл-там из массива идентификаторов и накапливает результат
  let total = cartIds.reduce((sum, id) => {
    const drink = findProductById(id);
    if (!drink) {
      return sum;
    }

    const price = calculateDiscount(drink.price, drink.discountPercent);

    return sum + price;
  }, 0);

  cartTotal.textContent = formatPrice(total);

  if (cartIds.length === 0) {
    cartItems.textContent = "Корзина пуста. СРОЧНО ЗАКАЖИ ЧТО-НИБУДЬ!";
    clearCartButton.disabled = true;
  } else {
    for (const id of uniqueIds) {
      const drink = findProductById(id);

      if (drink) {
        const cartItem = document.createElement("article");
        cartItem.className = "cart-item";

        const cartImage = document.createElement("img");
        cartImage.src = drink.image;
        cartImage.alt = drink.title;
        cartImage.className = "cart-item-image";

        // Чтоб потом через flexbox разместить слева фото, а название и цену справа
        const cartInfo = document.createElement("div");

        const cartTitle = document.createElement("h2");
        cartTitle.textContent = drink.title;

        const cartPrice = document.createElement("p");
        const finalPrice = calculateDiscount(
          drink.price,
          drink.discountPercent,
        );
        cartPrice.textContent = formatPrice(finalPrice);
        cartPrice.className = "cart-item-price";

        // Фильтруем по id и выдаем кол-во (чтобы считать кол-во товаров в корзине)
        const quantity = cartIds.filter((cartId) => {
          return cartId === id;
        }).length;
        const cartQuantity = document.createElement("p");
        cartQuantity.className = "cart-item-quantity";
        cartQuantity.textContent = "Количество: " + quantity + " шт.";

        // Удаление товара из корзины (1 шт)
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "cart-remove";
        removeButton.textContent = "Удалить 1 шт.";

        removeButton.addEventListener("click", () => {
          const index = cartIds.indexOf(id);
          if (index === -1) {
            return;
          }

          // splice - метод изменения массива (с какого индекса удаляем, кол-во удалемых элементов)
          cartIds.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cartIds));

          // Пересчитываем кол-во
          const quantityLeft = cartIds.filter((cartId) => {
            return cartId === id;
          }).length;

          if (quantityLeft === 0) {
            cartItem.remove();
          } else {
            cartQuantity.textContent = "Количество: " + quantityLeft + " шт.";
          }

          total -= finalPrice;
          cartTotal.textContent = formatPrice(total);

          if (cartIds.length === 0) {
            cartItems.textContent = "Корзина пока пуста.";
          }
        });

        cartInfo.append(cartTitle, cartPrice, cartQuantity, removeButton);
        cartItem.append(cartImage, cartInfo);
        cartItems.append(cartItem);
      }
    }

    // Очистить всю корзину
    const clearCartButton = document.querySelector("#clear-cart");

    // Если корзина и так пустая, кнопка не рабочая
    clearCartButton.disabled = cartIds.length === 0;

    clearCartButton.addEventListener("click", () => {
      cartIds.length = 0;
      localStorage.removeItem("cart");

      cartItems.textContent =
        "Корзина пока пуста. СРОЧНО ЗАКАЖИ ЧТО-НИБУДЬ! БОЛЬШЕ ТРАТИШЬ - БОЛЬШЕ ПОЛУЧАЕШЬ:)";

      total = 0;
      cartTotal.textContent = formatPrice(total);

      clearCartButton.disabled = true;
    });
  }
}
