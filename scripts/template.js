function renderBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const container = document.getElementById("books-container");
  container.innerHTML = "";

  books.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";

    bookElement.innerHTML = `
      <h2>${book.name}</h2>
      <p>Autor: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Veröffentlicht: ${book.publishedYear}</p>
      <p>Preis: ${book.price} €</p>
      <button class="like-button ${
        book.liked ? "liked" : ""
      }" onclick="toggleLike(${index})">❤️</button>
      <span>Likes: ${book.likes}</span>
      <div>
        <h3>Kommentare:</h3>
        <ul>
          ${book.comments
            .map(
              (comment) =>
                `<li><strong>${comment.name}:</strong> ${comment.comment}</li>`
            )
            .join("")}
        </ul>
        <input type="text" id="comment-name-${index}" placeholder="Dein Name">
        <textarea id="comment-text-${index}" placeholder="Dein Kommentar"></textarea>
        <button onclick="addComment(${index})">Kommentar hinzufügen</button>
      </div>
    `;

    container.appendChild(bookElement);
  });
}

// Funktion zum Liken/Disliken eines Buches
function toggleLike(index) {
  const books = JSON.parse(localStorage.getItem("books"));
  books[index].liked = !books[index].liked;
  books[index].likes += books[index].liked ? 1 : -1;
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

// Funktion zum Hinzufügen eines Kommentars
function addComment(index) {
  const books = JSON.parse(localStorage.getItem("books"));
  const name = document.getElementById(`comment-name-${index}`).value;
  const comment = document.getElementById(`comment-text-${index}`).value;

  if (name && comment) {
    books[index].comments.push({ name, comment });
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  } else {
    alert("Bitte sowohl den Namen als auch den Kommentar eingeben.");
  }
}

// Beim Laden der Seite die Bücher rendern
window.onload = renderBooks;
