// Работаем через localStorage (хранилище браузера)

function addToCart(productId) {
  const savedCart = localStorage.getItem("cart");

  // Если есть товары в корзине - превращаем строку обратно в массив (тк localStorage хранит строки id)
  const cart = savedCart ? JSON.parse(savedCart) : [];

  cart.push(productId);

  // setItem записывает данные в ls, stringify() преобразует массив в строку (формат для хранения в ls)
  localStorage.setItem("cart", JSON.stringify(cart));
}
