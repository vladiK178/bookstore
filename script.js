document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify(books));
  }
  renderBooks();
});
