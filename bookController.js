const createError = require('http-errors')
const ObjectId = require('mongodb').ObjectId;
const { Book } = require('./models/books')
const uri = "mongodb+srv://mongo-DevAcademy:sheffield22@cluster0.buz9v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


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
        .then(() => res.send({ result: true }))
}
exports.show = async function (req, res, next) {
    Book.findOne({ _id: ObjectId(req.params.id) })
        .then((bookItem) => {
            if (!bookItem) {
                return (next(createError(404, "no book with that id")))
            }
            res.send(bookItem);
        })
    }
exports.byTitle = async function (req, res, next) {
    Book.find({ title:req.params.title})
        .then((bookItem) => {
            console.log(bookItem)
            if (!bookItem) {
                return (next(createError(404, "no book with that title")))
            }
            res.send(bookItem)
        })
}
exports.byAuthor = async function (req, res, next) {
    Book.findOne({ author:req.params.author})
        .then((bookItem) => {
            if (!bookItem) {
                return (next(createError(404, "no book with that author")))
            }
            res.send(bookItem)
        })
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
exports.delete = async function (req, res, next) {
    Book.deleteOne({ _id: ObjectId(req.params.id) })
        .then((r) => {
            if (r.deletedCount) {
                return res.send({ result: true });
            }
            return (next(createError(404, "no book with that id")))        
        })
    }
            