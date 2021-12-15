const req = require('express/lib/request')
const res = require('express/lib/response')
const createError = require('http-errors')

let bookList = [];
let idno = 0;
bookStatus = "";


exports.index = function (req, res) {
    res.send(bookList)
}

exports.create = function (req, res, next) {
    if (!req.body.title) {
        return (next(createError(400, 'title is required')))
    }
    if (!req.body.author) {
        return (next(createError(400, 'author is required')))
    }
    if (!req.body.bookStatus) {
        return (next(createError(400, 'Book Status is required')))
    }

    bookList.push({
        id: idno,
        title: req.body.title,
        author: req.body.author,
        bookStatus: req.body.bookStatus
    });
    idno++;

    res.send({ result: "true" })
}
exports.show = function (req, res, next) {
    const bookItem = bookList.find((item) => item.id == req.params.id)
    if (!bookItem) {
        return (next(createError(404, "no book with that id")))
    }
    res.send(bookItem)
}
exports.byTitle = function (req, res, next) {
    const bookItem = bookList.find((item) => item.title == req.params.title)
    if (!bookItem) {
        return (next(createError(404, "no book with that title")))
    }
    res.send(bookItem)
}
exports.byAuthor = function (req, res, next) {
    const bookItem = bookList.find((item) => item.author == req.params.author)
    if (!bookItem) {
        return (next(createError(404, "no book with that author")))
    }
    res.send(bookItem)
}

exports.update = function (req, res, next) {
    //verifying
    const bookItem = bookList.find((item) => item.id == req.params.id)
    booksStatus = ["Read", "not Read"]

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
    bookList = bookList.map((item) => {

        if (item.id == req.params.id) {
            item.title = req.body.title,
                item.author = req.body.author,
                item.bookStatus = req.body.bookStatus
        }
        return item;
    })

    res.send({ result: true })
}
exports.delete = function (req, res, next) {
    const bookItem = bookList.find((item) => item.id == req.params.id)
    if (!bookItem) {
        return (next(createError(404, "no book with that id")))
    }
    bookList = bookList.filter((item) => item.id != req.params.id)
    res.send({ result: true })
}