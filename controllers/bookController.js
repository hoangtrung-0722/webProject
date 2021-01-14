const mongoose = require("mongoose");

const bookService = require("../models/services/bookService");
const categoryService = require("../models/services/categoryService");
const User = require("../models/User");
const Book = require("../models/Book");

const BOOKS_PER_PAGE = 12;

module.exports.products = async (req, res, next) => {
  const page = +req.query.page || 1;
  const sort_value = +req.query.sort;
  const category_value = req.query.category;

  let q = req.query.q;

  let paginate = await bookService.list(page, BOOKS_PER_PAGE);

  const categories = await categoryService.get_categories();

  if (q) {
    paginate = await bookService.search(page, BOOKS_PER_PAGE, q);
    if (category_value) {
      if (sort_value) {
        paginate = await bookService.category_sort_list(
          page,
          BOOKS_PER_PAGE,
          sort_value,
          category_value
        );
      } else {
        paginate = await bookService.category_list(
          page,
          BOOKS_PER_PAGE,
          category_value
        );
      }
    } else {
      if (sort_value)
        paginate = await bookService.sort_list(
          page,
          BOOKS_PER_PAGE,
          sort_value
        );
    }
  } else {
    if (category_value) {
      if (sort_value) {
        paginate = await bookService.category_sort_list(
          page,
          BOOKS_PER_PAGE,
          sort_value,
          category_value
        );
      } else {
        paginate = await bookService.category_list(
          page,
          BOOKS_PER_PAGE,
          category_value
        );
      }
    } else {
      if (sort_value)
        paginate = await bookService.sort_list(
          page,
          BOOKS_PER_PAGE,
          sort_value
        );
    }
  }

  res.render("products", {
    title: "List of Products",
    book: paginate.docs,
    isFirstPage: paginate.page == 1,
    hasNextPage: paginate.hasNextPage,
    hasPrevPage: paginate.hasPrevPage,
    hasNextNextPage:
      paginate.nextPage != null && paginate.nextPage < paginate.totalPages,
    hasPrevPrevPage: paginate.prevPage > 1,
    page: paginate.page,
    nextPage: paginate.nextPage,
    prevPage: paginate.prevPage,
    nextNextPage:
      paginate.nextPage != null && paginate.nextPage < paginate.totalPages
        ? paginate.nextPage + 1
        : null,
    prevPrevPage: paginate.prevPage > 1 ? paginate.prevPage - 1 : null,
    isLastPage: paginate.page == paginate.totalPages,
    totalPages: paginate.totalPages,
    sort_value: sort_value,
    hasSort: sort_value != null,
    category: category_value,
    hasCategory: category_value != null,
    category_list: categories,
    q: q,
    hasQ: q != null,
  });
};

module.exports.detail = async (req, res) => {
  const book_id = req.params.id;
  const user = req.user;
  const body = req.body.comment;

  const book = await bookService.get(book_id);
  const books_related = await bookService.related_list(
    book.category,
    book.name
  );

  const comment = {};
  comment.user = user.username;
  comment.body = body;

  if (body != undefined) {
    book.comments.push(comment);

    const comments = book.comments;

    await Book.updateOne(
      {
        _id: mongoose.Types.ObjectId(book._id),
      },
      {
        $set: {
          comments: comments,
        },
      }
    );
  }

  res.render("product_detail", {
    title: book.name,
    book: book,
    books_related: books_related,
  });
};

module.exports.shopping_cart = (req, res) => {
  res.render("shopping_cart", { title: "Shopping cart" });
};
