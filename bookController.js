const req = require('express/lib/request')
const res = require('express/lib/response')
const createError = require('http-errors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const ObjectTitle = require('mongodb').ObjectTitle;
const ObjectAuthor = require('mongodb').ObjectAuthor;
const { Book } = require('./models/books')
const { isValidObjectId } = require('mongoose');
const uri = "mongodb+srv://mongo-DevAcademy:sheffield22@cluster0.buz9v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//let bookList = [];
//let idno = 0;
//bookStatus = "";


exports.index = async function (req, res) {
    Book.find()
        .then(book => res.send(book))
}

exports.create = async function (req, res, next) {
    if (!req.body.title) {
        return (next(createError(400, 'title is required')))
    }
    if (!req.body.author) {
        return (next(createError(400, 'author is required')))
    }
    if (!req.body.bookStatus) {
        return (next(createError(400, 'Book Status is required')))
    }
    const books = new Book({
        title: req.body.title,
        author: req.body.author,
        bookStatus: req.body.bookStatus
    })
    books.save()
        .then(() => res.send({ result: "true" }))
}
exports.show = async function (req, res, next) {

    Book.findOne({ _id: ObjectId(req.params.id) })
        .then((bookItem))
    if (!bookItem) {
        return (next(createError(404, "no book with that id")))
    }
    res.send(bookItem)
}
exports.byTitle = async function (req, res, next) {
    Book.findOne({ title: ObjectTitle(req.params.title) })
        .then((bookItem))
    if (!bookItem) {
        return (next(createError(404, "no book with that title")))
    }
    res.send(bookItem)
}
exports.byAuthor = async function (req, res, next) {
    Book.findOne({ author: ObjectAuthor(req.params.author) })
        .then((bookItem))
    if (!bookItem) {
        return (next(createError(404, "no book with that author")))
    }
    const bookItem = bookList.find((item) => item.author == req.params.author)
    if (!bookItem) {
        return (next(createError(404, "no book with that author")))
    }
    res.send(bookItem)
}

exports.update = async function (req, res, next) {
    Book.findOne({ _id: ObjectId(req.params.id) })
        .then((bookItem) => {
            if (!bookItem) {
                return (next(createError(404, "no book with that id")))
            }
            //verifying
            booksStatus = ["Read", "not Read", "In progress"]

            if (!req.body.title) {
                return (next(createError(400, "title is required")))
            }
            if (!req.body.author) {
                return (next(createError(400, "author is required")))
            }

            if (!bookItem) {
                return (next(createError(404, "no book with that id")))
            }
            if (!(req.body.bookStatus == booksStatus[0] || req.body.bookStatus == booksStatus[1])) {
                return (next(createError(400, "you must update status: Read or not Read")))
            }
            //updating
            bookItem.id == req.params.id
            bookItem.title = req.body.title,
            bookItem.author = req.body.author,
            bookItem.bookStatus = req.body.bookStatus
            bookItem.save()
                .then(() => res.send({ result: true }))
        })
}
exports.delete = function (req, res, next) {
    Book.deleteOne({ _id: ObjectId(req.params.id) })
        .then((r) => {
            if (r.deleteCount) {
                return res.send({ result: true });
            }
            return (next(createError(404, "no book with that id")))
        })
        .catch((err) => console.log(err))
}