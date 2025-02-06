function renderBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const container = document.getElementById("books-container");
  container.innerHTML = "";

  books.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
            <h2>${book.name}</h2>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Price: ${book.price} €</p>
            <p>Published: ${book.publishedYear}</p>
            <button onclick="toggleLike(${index})">${
      book.liked ? "Dislike" : "Like"
    }</button>
            <span>Likes: ${book.likes}</span>
            <div>
                <h3>Comments:</h3>
                <ul>
                    ${book.comments
                      .map(
                        (comment) =>
                          `<li><strong>${comment.name}:</strong> ${comment.comment}</li>`
                      )
                      .join("")}
                </ul>
                <input type="text" id="comment-name-${index}" placeholder="Your name">
                <textarea id="comment-text-${index}" placeholder="Your comment"></textarea>
                <button onclick="addComment(${index})">Add Comment</button>
            </div>
        `;
    container.appendChild(bookElement);
  });
}

function toggleLike(index) {
  const books = JSON.parse(localStorage.getItem("books"));
  books[index].liked = !books[index].liked;
  books[index].likes += books[index].liked ? 1 : -1;
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function addComment(index) {
  const books = JSON.parse(localStorage.getItem("books"));
  const name = document.getElementById(`comment-name-${index}`).value;
  const comment = document.getElementById(`comment-text-${index}`).value;
  if (name && comment) {
    books[index].comments.push({ name, comment });
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  }
}
