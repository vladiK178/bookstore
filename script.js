document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("books")) {
    // Initialisiere die Bücherdaten, falls noch nicht geschehen
    const books = [
      // ... (Bücherdaten wie in db.js)
    ];
    localStorage.setItem("books", JSON.stringify(books));
  }
  renderBooks();
});
