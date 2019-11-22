var express = require('express');
var router = express.Router();

//const bodyParser = require('body-parser');
const repository = require('../server.js/repository');
const userCurrentCart = require('../server.js/userDateOrder');

var order = require('../models/order');

router.use(express.json());
//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());


router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

//@TODO
//to read about template engine json+tempate=html
router.get('/details/:book_id', async (req, res) => {
    var bookId = req.params.book_id;
    var result = await repository.getById(bookId);
    var authors = "";
    var pageNumber = 0;
    var pageSize = 0;
    res.render('details', {
        book: result,
        pageNumber: pageNumber,
        pageSize: pageSize,
        authors: authors,
        filters: {
            searchString: '',
            categoryId: null
        }
    });
});

                                                    //Page My account Routs

router.get('/account', function(req, res) {
    var currentLocation = req.route.path;
        res.render('account/account', {
        filters: {
            searchString: '',
            categoryId: null,
        },
        currentRoute: currentLocation
    });
});

router.get('/settings', function(req, res, next){
    var currentLocation = req.route.path;
    res.render('account/settings', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation,
    });
});

router.get('/addresses', function(req, res){
    var currentLocation = req.route.path;
    res.render('account/addresses', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/orders', function(req, res){
    var userOrders = [];
    var currentLocation = req.route.path;
    var userName = 'Artiom';

    order.find({name:userName}, function(err, doc){
        if(err){
            return console.log('error');
        }
        for(i = 0; i < doc.length; i++){
            userOrders.push(doc[i]);
        }
        res.render('account/orders', {
            filters: {
                searchString: '',
                categoryId: null
            },
            result: userOrders,
            currentRoute: currentLocation
        });
    });
});



router.get('/payment', function(req, res){
    var currentLocation = req.route.path;

    res.render('account/payment', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation,
        userCurrentCart:  userCurrentCart,
        orderedUserBooks: orderedUserBooks
    });
    console.log(userCurrentCart);
    console.log(orderedUserBooks);

});

router.get('/wishlist', function(req, res){
    var currentLocation = req.route.path;
    res.render('account/wishlist', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/reviews', function(req, res){
    var currentLocation = req.route.path;
    res.render('account/reviews', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

//Page Contacts Routs
router.get('/contacts', function(req, res){
    var currentLocation = req.route.path;
    res.render('contacts/contacts', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/contactUs', function(req, res){
    var currentLocation = req.route.path;
    res.render('contacts/contactUs', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

                                                    //Page Help Routs
router.get('/help', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/help', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/delivery', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/delivery', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/priceAndPayment', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/priceAndPayment', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/preOrders', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/preOrders', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/returns', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/returns', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/complains', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/complains', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/discountCodes', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/discountCodes', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/security', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/security', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/search', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/search', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/survey', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/survey', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

router.get('/wishlists', function(req, res){
    var currentLocation = req.route.path;
    res.render('help/wishlists', {
        filters: {
            searchString: '',
            categoryId: null
        },
        currentRoute: currentLocation
    });
});

module.exports = router;