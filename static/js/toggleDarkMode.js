function toggleDarkMode() {
  let [oldIconClass, newIconClass] = document
    .querySelector("body")
    .classList.contains("dark-mode")
    ? ["bi-brightness-high-fill", "bi-moon"]
    : ["bi-moon", "bi-brightness-high-fill"];

  halfmoon.toggleDarkMode();

  document
    .getElementById("toggle-dark-mode-button-icon")
    .classList.replace(oldIconClass, newIconClass);
}
