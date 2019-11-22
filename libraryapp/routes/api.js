var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var repository = require('../server.js/repository');

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

/* GET home page. */
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


//Function to return filtred books(JSON)
router.post('/', async function (req, res) {
    var category = await repository.getCategoryByName(req.body.category);

    var result = await repository.getPage(
        req.body.pageNumber,
        req.body.pageSize,
        {
            categoryId: category ? category._id : null,
            searchString: req.body.searchString
        });

    res.json(result);
});

        //   ROUTES WITH DB (API)
router.get('/books', function (req, res) {
    Book.find(function (err, books) {
        if (err) {
            res.send(err);
        }
        res.json(books);
    });
});

router.post('/books', function (req, res) {
    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.description = req.body.description;
    book.genreId = req.body.genreId;
    book.img = req.body.img;
    book.bookId = req.body.bookId;

    book.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Book created!' });
    });
});

// Routes for a single item
router.get('/books/:book_id', function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            res.send(err);
        }
        res.json(book);
    });
});

router.put('/books/:book_id', function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            res.send(err);
        }
        book.title = req.body.title;
        // save the book
        book.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Book updated!' });
        });
    });
});

router.delete('/books/:book_id', function (req, res) {
    Book.remove({
        _id: req.params.book_id
    }, function (err, book) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;    