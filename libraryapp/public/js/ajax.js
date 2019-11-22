$(document).ready(function () {
  $(document).on('click', '.js_getpage', function () {
    var params = new window.URLSearchParams(window.location.search);

    var filterBase = {
      category: params.get('category'),
      searchString: params.get('searchString'),
      pageNumber: params.get('pageNumber'),
      pageSize: params.get('pageSize'),
    };

    var filterNew = $(this).data('filter');
    if (filterNew.searchString) {
      filterNew = $.extend({}, filterNew, { searchString: $(filterNew.searchString).val() });
    }

    var filter = $.extend({}, filterBase, filterNew);

    $.ajax({
      type: 'POST',
      url: '/api',
      data: filter,
      success: function (result) {
        // totalCount - int
        // data - []

        var bookHtmlTemplate = $('#book_template').html();

        $('.pagination').empty();
        var totalCount = result.totalCount;
        var pageSize = 10;
        var pageNumber = 0;
        var $prevLink = $('<a>Prev</a>');
        if(filter.pageNumber > 4){
          $('.pagination').append($prevLink);
        }
        

        for (var i = pageNumber; i <= (filter.pageNumber + 4) && i < totalCount / pageSize; i++) {
          var pageNumber = i + 1;
          
          var $pageLink = $('<a>');
          $pageLink
            .addClass('js_getpage')
            .attr('data-filter', `{ "pageNumber": ${pageNumber}}`)
            .attr('href', '?pageNumber=' + (pageNumber))
            .text(pageNumber);
          var linkPageNumber = filter.pageNumber;
          if (linkPageNumber == pageNumber) {
            $pageLink.addClass('active');
          }
       
          if (linkPageNumber < pageNumber + 4 && linkPageNumber > pageNumber - 4) {
            $('.pagination').append($pageLink);
          }
        }
        
        var $nextLink = $('<a>Next</a>');
        $nextLink
        .attr('data-filter', `{"pageNumber": ${pageNumber}}`)
        .attr('href', '?pageNumber=' + (pageNumber));
        if (pageNumber > filter.pageNumber) {
          $('.pagination').append($nextLink);
        }

        var bookListHtml = '';
        for (var book of result.data) {
          var bookHtml = ejs.render(bookHtmlTemplate, book);
          bookListHtml += bookHtml;
        }

        $('#books-list').html(bookListHtml);
        history.pushState(filter, document.title, '?' + $.param(filter));
      }
    });

    return false;
  });
  var totalPriceBooks = $('#totalPriceBooks').val();
});

function getBooksTitle() {
  $.ajax({
    type: 'POST',
    url: '/',
    data: {
      searchString: $('#search').val()
    },
    async: false,
    success: function (response) {
      //console.log(response);
    }
  });
}

                                          // Buy My Order

$(document).on('click', '#buttonBuyOrder', function(e){
  e.preventDefault();
  // get the data
  var request = new XMLHttpRequest();
  //send a request to the address /user
  request.open("POST", "/user", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    alert(request.response);
    cancelConfirmation (); 
    //removeOrderFromMyPayment();
  });
  request.send(JSON.stringify({
    cart: cart,
    totalPriceBooks: totalPriceBooks
  }));
});

                                        // Getting and Sending date ObjectId to Serve
$(document).on('click', ".js-cart-add", function(){
    var id = $(this).data('id');
    var request = new XMLHttpRequest();

    request.open('POST', "/users", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener('load', function(){
      var book = JSON.parse(request.response);
      for(i = 0; i < book.length; i++) {
      allbook.push(book[i]);
      }
    });
    request.send(JSON.stringify({
      id:id
    }));
});


$(document).on('click', '#buttonCheckout', function(e){
  var request = new XMLHttpRequest();

  request.open("POST", "/payment", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    alert(request.response);
    cancelConfirmation (); 
    removeOrderFromMyPayment();
     
  });
  request.send(JSON.stringify({
    cart: cart,
    allbook: allbook,
    //totalPriceBooks: totalPriceBooks
  }));
  //alert(cart);
});


$(document).on('click', '.checkout', function(e){
  var request = new XMLHttpRequest();

  request.open("POST", "/payment", true);
  request.setRequestHeader("Content-Type", "application/json");
  //request.addEventListener("load", function () {
    // alert(request.response);
    // cancelConfirmation ();      
  //});
  request.send(JSON.stringify({
    cart: cart,
    allbook: allbook
    //totalPriceBooks: totalPriceBooks
  }));
  alert(cart);
});









