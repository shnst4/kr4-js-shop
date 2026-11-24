// Находим наши html элементы (по css классу и по id)
const catalogGrid = document.querySelector(".catalog .products-grid");
const searchInput = document.querySelector("#product-search");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-order");
const productsCount = document.querySelector("#products-count");
const resetButton = document.querySelector("#reset-filters");

// Функция для отображения каталога (+ обработка случая, если ничего не найдено)
function renderCatalog(drinks) {
  catalogGrid.textContent = "";
  productsCount.textContent = drinks.length;

  if (drinks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "catalog-empty";
    emptyMessage.textContent = "Ничего не найдено:(";

    catalogGrid.append(emptyMessage);
  } else {
    for (const drink of drinks) {
      const productCard = createProductCard(drink);
      catalogGrid.append(productCard);
    }
  }
}

// Функция для финальной цены (по скидке, если есть)
function getFinalPrice(drink) {
  return calculateDiscount(drink.price, drink.discountPercent);
}

// Функция фильтрации (учитывает введенный текст и категорию)

function updateCatalog() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortOrder = sortSelect.value;

  const filteredProducts = products.filter((drink) => {
    const matchesSearch = drink.title.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" || drink.category === selectedCategory;

    // Напиток нам подходит, если выполнены 2 условия: подходит под поисковый запрос и под фильтр категории
    return matchesSearch && matchesCategory;
  });

  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => {
      return getFinalPrice(a) - getFinalPrice(b);
    });
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => {
      return getFinalPrice(b) - getFinalPrice(a);
    });
  }

  renderCatalog(filteredProducts);
}

if (
  catalogGrid &&
  searchInput &&
  categoryFilter &&
  sortSelect &&
  productsCount &&
  resetButton
) {
  updateCatalog();

  searchInput.addEventListener("input", updateCatalog);
  categoryFilter.addEventListener("change", updateCatalog);
  sortSelect.addEventListener("change", updateCatalog);

  // Для кнопки сброса
  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    sortSelect.value = "default";

    updateCatalog();
  });
}
