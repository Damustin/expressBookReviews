const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const booksList = Object.values(books);

    const booksHTML = booksList.map((book) => {
      return `<div>
                <h2>${book.title}</h2>
                <p>${book.description}</p>
              </div>`;
    });

    const htmlResponse = `<h1>Lista de Libros</h1>${booksHTML.join('')}`;

    return res.status(200).send(htmlResponse);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor." });
  }
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  try {
    if (!book) {
      return res.status(404).json({ message: "El libro no está." });
    } else {
      return res.status(200).json(book);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor." });
  }
});




public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksList = Object.values(books);

  const booksByAuthor = booksList.filter((book) => book.author === author);

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "Autor no encontrado." });
  }

  return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here

  const title = req.params.title;
  const booksList = Object.values(books);

  const bookbytitle = booksList.filter((book) => book.title === title);

  if (bookbytitle.length === 0) {
    return res.status(404).json({ "error": "no ta" });

  }
  return res.status(200).json(bookbytitle);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = Object.values(books);
  const bookrev = book.filter((book)=>book.isbn === isbn);

  if (!bookrev) {
    return res.status(404).json({ message: 'book not exist' })
  }
  return res.status(200).send(bookrev.reviews)
    
  });
  

module.exports.general = public_users;
