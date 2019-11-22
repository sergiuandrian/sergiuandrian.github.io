const express = require("express");

const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const repository = require('./server.js/repository');
const userOrderRepository = require('./server.js/userOrderRepository');
const userCurrentCart = require('./server.js/userDateOrder');
var engine = require('ejs-mate');
var router = require('./routes/api');
var web = require('./routes/web');
var Order = require('./models/order');
var book = require("./models/book");
const app = express();

mongoose.connect("mongodb://localhost:27017/libraryapp", { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
});
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set("view engine", "ejs");
app.use('/images', express.static('images'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/partials"));
app.use('/api', require('./routes/api'));
app.use('/',require('./routes/web'));
app.use('/', require('./routes/users'));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

web.use(function(req, res, next){
    console.log('Indeed, web router works');
    next();
});
router.use(function (req, res, next) {
    console.log('Middleware work');
    next();
});

app.get('/', async (req, res) => {
    var categories = await repository.getCategories();
    var authors = await repository.getAuthor();
    var category = null;
    for (let item of categories){
        if (item.name == req.query.category) {
            category = item;
            break;
        } 
    }

    var result = await repository.getPage(
        req.query.pageNumber,
        req.query.pageSize,
        {
            categoryId: category ? category._id : null,
            searchString: req.query.searchString
        });

    const bookTemplate = fs.readFileSync('views/partials/book.ejs');

    res.render('index', {
        records: result.data,
        totalRecords: result.totalCount,
        pageNumber: result.pageNumber,
        pageSize: result.pageSize,
        categories: categories,
        authors: authors,
        filters: {
            searchString: req.query.searchString,
            category: req.query.category
        },
        bookTemplate: bookTemplate
    });
});

// Add book to cart(response object)
app.post('/',function(req, res){
    var bookId = req.body.id;
    var result;
    for(var i = 0; i < data.book.length; i++){
        if(data.book[i].id == bookId){
            result = data.book[i];
        }
    }
    res.json(result);
});

app.post('/user', function(req,res){
    const purse = 1000;
    var items = userCurrentCart;
    var orderPrice = req.body.totalPriceBooks;
    //console.log(items);
    if(orderPrice <= purse && items.length != 0) {
        const order = new Order({items: items, orderPrice: orderPrice, name:'Artiom'});
       
        order.save(function (err){
            if (err) {
                return console.log(err);
            }
            //console.log('Сохранён объект Order', order);
        });
        res.send("Your order has been sent!!!");
       
        // for (var i = 0; i < userOrderRepository.length; i++) {
        //     if (userOrderRepository[i].id) {
        //         userOrderRepository.splice(i, userOrderRepository.length);
        //     }
        // }
    }
    else if (items.length == 0) {
        res.send("Cart empty!!! You have not made an order!!!");
    }
    else{   
        res.send("You do not have enough money in your account!!!");
    }
});

app.post('/users', function(req, res){
    var bookId = req.body.id;
    book.find({id:bookId}).populate('author').exec(function(err, result){
        if(err) {
            return console.log(err);
        }
        res.send(result);
        //console.log(result);
    });
});

app.post('/payment', function(req, res){
    var currentOrder = req.body.cart;
    var orderedBooks = req.body.allbook;
    
        for(var i = 0; i < currentOrder.length; i++){
            userCurrentCart.splice(i, userCurrentCart.length);
            userCurrentCart.push(currentOrder[i]);
        }
        for(var i = 0; i < orderedBooks.length; i++){
            orderedUserBooks.splice(i, orderedUserBooks.length);
            orderedUserBooks.push(orderedBooks[i]);
        }
});

app.listen(3000);