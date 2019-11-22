var allbook = [];

var cart = [];
var booksToRemove = [];
var orderStatus = [];
var totalPriceBooks = 0;
var addBotton = $(".js-cart-add");


window.onload = function () {

    $(".span-bold").html(totalPriceBooks + '$');

    $(document).on('click', "#cart", function(){
        viewWindow();
        $(".backgroundCartHeader").show();
        $(".backgroundCartBody").show();
        $(".backgroundCartFooter").show();
        $(".windowCart").show();
    });

    // When You Press on background windowCart, window cart and background close
    $(document).on('click', ".backgroundCartHeader", function(){
        $(".windowCart").hide();
        $(".backgroundCartHeader").hide();
        $(".backgroundCartBody").hide();
        $(".backgroundCartFooter").hide();
    });

    $(document).on('click', ".backgroundCartBody", function(){
        $(".windowCart").hide();
        $(".backgroundCartHeader").hide();
        $(".backgroundCartBody").hide();
        $(".backgroundCartFooter").hide();
    });

    $(document).on('click', ".backgroundCartFooter", function(){
        $(".windowCart").hide();
        $(".backgroundCartHeader").hide();
        $(".backgroundCartBody").hide();
        $(".backgroundCartFooter").hide();
    });
    // Background categories switching
    $(".js_getpage li").on('click', function(event){
        var activeCategory = event.target;
        backgroundCategoriesSwitching(activeCategory);
    });

    $("div.sidebar.clear-floats h3").on('click', function(){
        $('div.sidebar.clear-floats h3').addClass('active');
        var $category = $('#genre li');
        for(var i = 0; i < $category.length; i++){
            $('a.js_getpage').css('color', '#7c7c7c');
            $category[i].classList.remove('active');
        }
        return false;
    });

    // When You Press Button "Continue", window cart and background close
    $("#buttonContinue").on('click', function() {
        closeWindowCart() 
        $(".backgroundCartHeader").hide();
        $(".backgroundCartBody").hide();
        $(".backgroundCartFooter").hide();
    });
     
    // When You Press Button "Remove", Book Removed
    $(document).on("click", '.deleteButton', function () {
        removeFromCart($(this).data('bookid'));
    });


    $(document).on('keydown', function(){
        if($(".windowCart").is(":visible") && (event.keyCode == 27))
        refreshCart();
    });
    //Deletion books when you press key "Delete"
    $(document).on('keydown', function(){
        if($(".windowCart").is(":visible") && (event.keyCode == 46)) {
            addSelectedBooks();
            confirm("You definitely want to delete these books?");
            removeSelectedBooks();
            refreshCartItemCounter();
        }
    });

    //Added Pagination Style
    var urlParams = new URLSearchParams(window.location.search);
    var pageNumber = urlParams.get('pageNumber');

    $(".pagination a").each(function(e) {        
        var linkPageNumber = $(this).data('filter');
        if (linkPageNumber == pageNumber){
            $(this).addClass('active');
        }
    });

    //Added books to cart
    $(document).on('click','.js-cart-add', function () {
        addToCart($(this).data('id'));
        //console.log(cart);

        refreshCartItemCounter();
        renderCart();
    });

    //Selected books using the shift and arrow keys
    $(document).on('keydown', function(event) {
        if (event.shiftKey && (event.keyCode == 40 || event.keyCode == 38)) {
            adjustCartItemSelection2(event);
            e.priventDefault();
        }
        else{
            adjustCartItemSelection3(event);
            }
    });
    //Toggled background of book using the arrow keys
    $(document).on('keydown', function(event) {
        if (adjustCartItemSelection1(event))
        return false;
    });


    //The active frame of the selected item
    $(document).on('keydown', function(){
        if (event.ctrlKey && (event.keyCode == 192 || event.keyCode == 49)) {
            addActivFrameSelectedBook(event);
            e.priventDefault();
        }
    });

    $(document).on('keydown', function(){
        if (event.keyCode == 32 && (event.keyCode != 192 || event.keyCode != 49 )) {
            addActiveFrameBooks()
            return false;
        }
    });
    
}

// View and Close Window Cart, Overwriting His Data
function viewWindow() {
    $(".windowCart").toggle();
    refreshCart();
}

// Close Window Cart when You Press a Button "Continue"
function closeWindowCart() {
    $(".windowCart").hide();
}

// Refresh the cart HTML if currently visible
function refreshCart() {
    if ($(".windowCart").is(":visible")) {
        renderCart();
    }
}

//Function wich Added Book Id and Quantity To Cart(Array(cart[]))
function addToCart(bookId) {
    // Try to find the book among existing elements in the Cart
    var cartItem = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == bookId) {
            cartItem = cart[i];
            break;
        }
    }

    if (!cartItem) {
        cartItem = {
            id: bookId,
            quantity: 1,
        };
        cart.push(cartItem);
    }
    else
        cartItem.quantity++;

    // Refresh the cart HTML if currently visible
    refreshCart();
}

//Function wich Removed Books From Cart
function removeFromCart(bookId) {
    // Find the element with the id = bookId in the cart
    for (var i = 0; i < cart.length; i++) {
        if (bookId == cart[i].id) {
            // If found - remove from cart and stop looking (break;)
            cart.splice(i, 1);
            break;
        }
    }
    // Refresh the cart HTML if currently visible
    refreshCart();
}

//Function wich Calculated Total Books Number In The Cart
function refreshCartItemCounter() {
    var booksNumber = 0;
    for (var i = 0; i < cart.length; i++) {
        booksNumber += cart[i].quantity;
    }
    renderTotalBooksNumber(booksNumber);
}

//Function wich Write Total Books Number On Main Page
function renderTotalBooksNumber(booksNumber) {
    $(".span-small").html(booksNumber + "(items)");
}

//Function wich Calculated Total Price Books; Writed and Rewrited Total Price Books and Information about Books
function renderCart() {
    var $cartItemsContainer = $('table.selectedBooks tbody.bookDescription');
    $cartItemsContainer.empty();
    var $cartTotalsContainer = $('table.selectedBooks tbody.totalBookCost');
    totalPriceBooks = 0;


    if (cart.length) {
        for (var i = 0; i < cart.length; i++) {
            for (var j = 0; j < allbook.length; j++) {
               if (cart[i].id == allbook[j].id) {
                    totalPriceBooks = totalPriceBooks + (allbook[j].price * cart[i].quantity);
                    //$(".span-bold").html(totalPriceBooks + allbook[j].unit);
                   $cartItemsContainer.prepend(`
                        <tr data-number="${cart[i].id}">
                            <td><img src= '/images/${allbook[j].img}' alt="Book"></td>
                            <td>${allbook[j].author.name}</td>
                            <td>${allbook[j].title}</td>
                            <td>${cart[i].quantity}</td>
                            <td>${allbook[j].price}${'$'}</td>
                            <td><button class="deleteButton" data-bookid="${cart[i].id}" type="button">Remove</button></td>
                        </tr>
                    `);
                    $cartTotalsContainer.html(`
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${"Total Cost:"}</td>
                            <td id="totalPriceBooks">${totalPriceBooks}${'$'}</td>
                            <td></td>
                        </tr>
                        `);
                    break;
                }
            }
        }

        $("table.selectedBooks").show();
        $(".windowCart .no-data-warning").hide();
        $('.windowCart .buyBooks').hide();

    }
    else {
        $("table.selectedBooks").hide();
        $('.windowCart .buyBooks').hide();
        $(".windowCart .no-data-warning").show();
    }
}


//Specify the variable way and applay this, event ".keydown"
//Associate a variable with button page down

/*Write a function which be add a class to a variable that does not 
have a class (then event ".keydown") and delete a class from a variable that has a class*/

function adjustCartItemSelection1(event) {
    if ($('.windowCart').is(':visible')) { 
        var $selectedRow = $(".bookDescription tr.selected");
        
        switch(event.keyCode)
        {
            case 40:
            var $nextRow;
            if ($selectedRow.length)
                $nextRow = $selectedRow.next('tr');
            else
                $nextRow = $('.bookDescription tr:first-child');
            if ($nextRow.length) {
                $selectedRow.removeClass('selected');
                $nextRow.addClass('selected');
            }
            return true;
            case 38:
            var $previousRow = $selectedRow.prev('tr');
            if ($previousRow.length) {
                $selectedRow.removeClass('selected');
                $previousRow.addClass('selected');
            }
            return true;
        }
    }
    return false;
}

function adjustCartItemSelection2(event) {
    if ($('.windowCart').is(':visible')) { 
        var $selectedRow = $(".bookDescription tr.selected");
        
        switch(event.keyCode)
        {
            case 40:
            var $nextRow;
            if ($selectedRow.length)
                $nextRow = $selectedRow.next('tr');
            else
                $nextRow = $('.bookDescription tr:first-child');
            if ($nextRow.length) {
                $nextRow.addClass('selected');
            }
            return true;
            case 38:
            var $previousRow = $selectedRow.prev('tr');
            if ($previousRow.length) {
                $previousRow.addClass('selected');
            }
            return true;
        }
    }
    return false;
}

// When you keydown key 40 || 38, class "Selected" deleted;
function adjustCartItemSelection3(event) {
    if ($('.windowCart').is(':visible')) { 
        var $selectedRow = $(".bookDescription tr.selected");
        
        switch(event.keyCode)
        {
            case 40:
            var $nextRow;
            if ($selectedRow.length)
                $nextRow = $selectedRow.next('tr');
            else
                $nextRow = $('.bookDescription tr:first-child');
            if ($nextRow.length) {
                $nextRow.removeClass('selected');
            }
            return true;
            case 38:
            var $previousRow = $selectedRow.prev('tr');
            if ($previousRow.length) {
                $previousRow.removeClass('selected');
            }
            return true;
        }
    }
    return false;
}

//Added Active Frame Selected Book
function addActivFrameSelectedBook(event) {
    if ($('.windowCart').is(':visible')) { 
        var $selectedRow = $(".bookDescription tr.activeFrame");
        
        switch(event.keyCode)
        {
            case 192:
            var $nextRow;
            if ($selectedRow.length)
                $nextRow = $selectedRow.next('tr');
            else
                $nextRow = $('.bookDescription tr:first-child');
            if ($nextRow.length) {
                $nextRow.addClass('activeFrame');
            }
            return true;
            case 49:
            var $previousRow = $selectedRow.prev('tr');
            if ($previousRow.length) {
                $selectedRow.removeClass('activeFrame');
                $previousRow.addClass('activeFrame');
            }
            return true;
        }
    }
    return false;
}

//Add Selected Books
function addSelectedBooks() {
    var selectedBooks = $('.bookDescription tr');
    for (var i = 0; i < selectedBooks.length; i++) {
        if($((selectedBooks)[i]).hasClass('selected')) {
           booksToRemove.push(cart[i].id);
        }
    }
}
//Add Active Frame Books
//Add Class "Selected" Active Frame Books
function addActiveFrameBooks() {
    var selectedBooks = $('.bookDescription tr');
    for (var i = 0; i < selectedBooks.length; i++) {
        if($((selectedBooks)[i]).hasClass('activeFrame')) {
          // booksToRemove.push(cart[i].id);
          $((selectedBooks)[i]).removeClass('activeFrame');
          $((selectedBooks)[i]).addClass('selected');
        }
    }
}


//Remove Selected Books 
function removeSelectedBooks() {
    for (var i = 0; i < booksToRemove.length; i++) {
        for (var j = 0; j < cart.length; j++) {
            if(booksToRemove[i] == cart[j].id) {
                cart.splice(j, booksToRemove.length);
                booksToRemove.splice(i, booksToRemove.length);
            }
        }
    }
    refreshCart();
}

//Request Ajax - Remove Order Books From Cart
function removeOrderBooksFromCart() {
    var initialTotalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id) {
            cart.splice(i, cart.length);
        }
    }
    refreshCart();
    $('.windowCart').hide();
    refreshCartItemCounter ();
    $(".span-bold").html(initialTotalPrice + '$');
}

//Cancel Confirmation
function cancelConfirmation () {
    if(confirm("You want to make another order?") == false) {
      $('.windowCart').hide();
      $(".backgroundCartHeader").hide();
      $(".backgroundCartBody").hide();
      $(".backgroundCartFooter").hide();
      removeOrderBooksFromCart();
    }
    else{
        $('.windowCart').hide();
        $(".backgroundCartHeader").hide();
        $(".backgroundCartBody").hide();
        $(".backgroundCartFooter").hide();
      }

}

// Background Categories Switching
function backgroundCategoriesSwitching (activeCategory) {
    var $category = $('.js_getpage li');
    var activeCategory = event.target;
    $('div.sidebar.clear-floats h3').removeClass('active');

    for (var i = 0; i <= $category.length; i++) {
        $('.active a').css('color', 'white');
        if($category[i].innerText == activeCategory.innerText) {
            $category[i].classList.add('active');
        }
        else{
            $('.js_getpage li a').css('color', '#7c7c7c');
            $category[i].classList.remove('active');
        }
    }
}

function showForm() {
    $('#login').toggle();
    $('#login').removeClass('show');
}

