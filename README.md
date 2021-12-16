
heroku deploy : http://booklistmongoose.herokuapp.com


get All Books - http://booklistmongoose.herokuapp.com/book <-- find all books

createBook - http://booklistmongoose.herokuapp.com/book/create/ <-- create book with JSON content Ex:
{
	"title" : "The Odyddey",
	"author": "Homer",
	"bookStatus": "not Read"
}

updateBook -http://booklistmongoose.herokuapp.com/book/61ba230baed5fbef1219d493<-- book id to update

deleteBook - http://booklistmongoose.herokuapp.com/book/61bb408e0f2ce7057bb2f5e8 <-- book id to delete

Book By Title - http://booklistmongoose.herokuapp.com/book/bytitle/The Odyddey <-- title of the book

Book by Author - http://booklistmongoose.herokuapp.com/book/byauthor/Homer <-- author of the book

Book By Id - http://booklistmongoose.herokuapp.com/book/61ba40fc8bdd2c2a709425d7 <-- find a book if input id
