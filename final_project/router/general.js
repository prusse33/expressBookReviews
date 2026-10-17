const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();
const axios = require('axios');

// Регистрация пользователя
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    res.json({message: "User successfully registered"});
  } else {
    res.json({message: "Error registering user"});
  }
});

// Task 10: Получить список всех книг с использованием async/await (эмуляция Axios)
public_users.get('/', async function (req, res) {
  try {
    let getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    let response = await getBooks;
    res.status(200).send(JSON.stringify(response, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error retrieving books"});
  }
});

// Task 11: Получить книгу по ISBN с использованием Promise/Axios
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  let getBookByISBN = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({status: 404, message: "Book not found"});
    }
  });

  getBookByISBN.then(
    (book) => res.status(200).send(JSON.stringify(book, null, 4)),
    (error) => res.status(error.status).json({message: error.message})
  );
});

// Task 12: Получить книги по автору с использованием async/await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    let getBooksByAuthor = new Promise((resolve, reject) => {
      let filtered_books = [];
      let keys = Object.keys(books);
      keys.forEach((key) => {
        if(books[key].author === author) {
          filtered_books.push({
            isbn: key,
            author: books[key].author,
            title: books[key].title,
            reviews: books[key].reviews
          });
        }
      });
      resolve(filtered_books);
    });

    let result = await getBooksByAuthor;
    res.status(200).send(JSON.stringify({booksbyauthor: result}, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error retrieving books by author"});
  }
});

// Task 13: Получить книги по названию с использованием async/await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    let getBooksByTitle = new Promise((resolve, reject) => {
      let filtered_books = [];
      let keys = Object.keys(books);
      keys.forEach((key) => {
        if(books[key].title === title) {
          filtered_books.push({
            isbn: key,
            author: books[key].author,
            title: books[key].title,
            reviews: books[key].reviews
          });
        }
      });
      resolve(filtered_books);
    });

    let result = await getBooksByTitle;
    res.status(200).send(JSON.stringify({booksbytitle: result}, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error retrieving books by title"});
  }
});

// Получить отзыв по ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn]) {
    res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
