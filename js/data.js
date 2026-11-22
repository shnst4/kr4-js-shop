const product = {
  id: 1,
  title: "Тирамису колд-брю",
  category: "coffee",
  price: 290,
  discountPercent: 10,
  description: "Холодный кофе с нежным кремом и нотками какао.",
  image: "img/tiramisu_cold_brew.png",
  isAvailable: true,
};

const products = [product]; // const - нельзя присваивать переменной другой массив, но можно менять этот
products.push({
  id: 2,
  title: "Бамбл-кофе",
  category: "coffee",
  price: 320,
  discountPercent: 0,
  description: "Холодный кофе с апельсиновым соком и льдом.",
  image: "img/bumble_coffee.png",
  isAvailable: true,
});

products.push(
  {
    id: 3,
    title: "Ореховый айс-латте",
    category: "coffee",
    price: 350,
    discountPercent: 5,
    description: "Холодный латте с ореховыми нотками и нежными сливками.",
    image: "img/hazelnut_iced_latte.png",
    isAvailable: true,
  },
  {
    id: 4,
    title: "Вишнёвый White Russian",
    category: "cocktails",
    price: 390,
    discountPercent: 0,
    description: "Сливочный коктейль с насыщенным вишнёвым вкусом.",
    image: "img/cherry_white_russian.png",
    isAvailable: true,
  },
  {
    id: 5,
    title: "Радужный ягодный моктейль",
    category: "cocktails",
    price: 280,
    discountPercent: 0,
    description: "Яркий безалкогольный коктейль с ягодными нотками.",
    image: "img/candy_mocktail.png",
    isAvailable: true,
  },
);

products.push(
  {
    id: 6,
    title: "Берёзовый сок",
    category: "cold",
    price: 160,
    discountPercent: 0,
    description: "Натуральный освежающий напиток с мягким вкусом.",
    image: "img/birch_juice.png",
    isAvailable: true,
  },
  {
    id: 7,
    title: "Цикорий",
    category: "hot",
    price: 190,
    discountPercent: 0,
    description: "Ароматный горячий напиток с насыщенным вкусом.",
    image: "img/chicory_drink.png",
    isAvailable: true,
  },
  {
    id: 8,
    title: "Тыквенно-ванильный смузи",
    category: "cold",
    price: 310,
    discountPercent: 5,
    description: "Нежный смузи с тыквой, ванилью и пряностями.",
    image: "img/pumpkin_vanilla_smoothie.png",
    isAvailable: true,
  },
  {
    id: 9,
    title: "Яблочный сбитень",
    category: "hot",
    price: 240,
    discountPercent: 0,
    description: "Согревающий напиток с яблоком, мёдом и корицей.",
    image: "img/apple_sbiten.png",
    isAvailable: true,
  },
  {
    id: 10,
    title: "Горячий шоколад",
    category: "hot",
    price: 270,
    discountPercent: 10,
    description: "Густой горячий шоколад с маршмеллоу и корицей.",
    image: "img/hot_chocolate.png",
    isAvailable: true,
  },
);

console.log(products);
console.log(products.length);

// Рассчитываем скидку
function calculateDiscount(price, percent) {
  const discount = (price * percent) / 100;
  return price - discount;
}

// Форматируем цену
function formatPrice(price) {
  return price.toLocaleString("ru-RU") + " Руб.";
}

// Есть ли товар в наличии
function getAvailability(product) {
  if (product.isAvailable) {
    return "В наличии";
  } else {
    return "Нет в наличии";
  }
}

const finalPrice = calculateDiscount(product.price, product.discountPercent);

console.log("Цена со скидкой:", formatPrice(finalPrice));
console.log("Наличие:", getAvailability(product));
console.log(product.description);
