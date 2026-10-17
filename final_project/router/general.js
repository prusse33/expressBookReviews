const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Получить список всех книг (Task 10 / Task 1)
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Получить книгу по ISBN (Task 11 / Task 2)
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Получить книги по автору (Task 12 / Task 3)
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = [];
  let keys = Object.keys(books);
  keys.forEach((key) => {
    if(books[key].author === author) {
      filtered_books.push(books[key]);
    }
  });
  res.send(JSON.stringify({booksbyauthor: filtered_books}, null, 4));
});

// Получить книги по названию (Task 13 / Task 4)
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = [];
  let keys = Object.keys(books);
  keys.forEach((key) => {
    if(books[key].title === title) {
      filtered_books.push(books[key]);
    }
  });
  res.send(JSON.stringify({booksbytitle: filtered_books}, null, 4));
});

// Получить отзывы по книге
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
