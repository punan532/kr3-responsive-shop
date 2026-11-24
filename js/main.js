const navigation = document.querySelector(".site-nav");
const menu = document.querySelector(".menu-toggle");
const desktop = window.matchMedia("(min-width: 40rem)");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  navigation.hidden = !desktop.matches && !open;
}
function syncMenu() {
  menu.hidden = desktop.matches;
  setMenu(false);
}
menu.addEventListener("click", () => setMenu(navigation.hidden));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menu.hidden && !navigation.hidden) {
    setMenu(false);
    menu.focus();
  }
});
desktop.addEventListener("change", syncMenu);
syncMenu();

const dialog = document.querySelector(".order-dialog");
if (dialog) {
  document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const select = dialog.querySelector("select");
      const option = Array.from(select.options).find((item) => item.text === button.dataset.product);
      if (option) select.value = option.value;
      dialog.showModal();
    });
  });
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
}

const itemField = document.querySelector("#item");
const itemId = new URLSearchParams(location.search).get("item");
if (itemField && Array.from(itemField.options).some((option) => option.value === itemId)) {
  itemField.value = itemId;
}
document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (dialog && dialog.contains(form)) {
      dialog.close();
      document.querySelector("#quick-status").textContent = "Заявка подготовлена.";
    } else {
      document.querySelector("[data-form-status]").textContent = form.elements.message
        ? "Сообщение подготовлено." : "Заявка подготовлена.";
    }
    form.reset();
  });
});
