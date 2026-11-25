const themeNav = document.querySelector(".site-header nav"); // Меню сайта, куда добавим кнопку

if (themeNav) {
  const themeButton = document.createElement("button");
  themeButton.type = "button";
  themeButton.className = "theme-toggle";

  const savedTheme = localStorage.getItem("shop-theme"); // Считываем тему из ls

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme"); // Добавляем класс темной темы - меняются цвета
  }

  function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-theme");

    themeButton.textContent = isDark ? "Светлая" : "Тёмная";
  }

  updateThemeButton();
  themeNav.append(themeButton); // Кнопка появится в меню

  themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    localStorage.setItem("shop-theme", isDark ? "dark" : "light");

    updateThemeButton();
  });
}
