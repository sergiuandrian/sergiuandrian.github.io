// var _data = require('./data');


// var repository = new Repository();
// var pageNumber = 0;
// const pageSize = 5;
// var selectBox;
// var searchBox;
// var bbox;

// window.onload = function () {
//     selectBox = document.getElementById('genre');
//     searchBox = document.getElementById('search');
//     var optionall = document.createElement('option');
//     optionall.innerText = 'All categories';
//     optionall.value = "";
//     selectBox.appendChild(optionall);

//     for (var j = 0; j < _data.Categories.length; j++) {
//         var option = document.createElement('option');
//         option.value = _data.Categories[j].id;
//         option.innerHTML = _data.Categories[j].name;
//         selectBox.appendChild(option);
//     }
    
//     searchBooks(0);
// }

// function searchBooks(pageNumber) {
//     if (!pageNumber) {
//         pageNumber = 0;
//     }
//     var filters = {
//         categoryId: selectBox.value,
//         searchString: searchBox.value.trim()
//     };
   
//     var results = repository.getPage(pageNumber, pageSize, filters);
//     drawBooks(results.data);

//     function clearBox(elementID) {
//         document.getElementById('pagination').innerHTML = "";
//     }
//     clearBox('pagination');

//     for(var i = 0; i < results.totalCount / pageSize; i++){
//         var pagination = document.getElementById('pagination');
//         var link = document.createElement("a");
//         link.setAttribute("href", "/index");
        
//         link.setAttribute('onclick','searchBooks('+i+')');
//         link.innerHTML = i+1;
//         pagination.appendChild(link);
//     }
// }

// function drawBooks(data) {

//     function clearBox(elementID) {
//         document.getElementById('bbox').innerHTML = "";
//     }
//     clearBox('bbox');

//     for (var i = 0; i < pageSize; i++) {
//         bbox = document.getElementById('bbox');
//         var title_div = document.createElement('div');
//         var author_div = document.createElement('div');
//         var description_div = document.createElement('div');
//         var img = document.createElement('img');

//         img.src = data[i].imgUrl;
//         title_div.innerHTML = 'Title: ' + '<i>'+data[i].title;
//         author_div.innerHTML = 'Author: ' +'<i>'+ data[i].author;
//         description_div.innerHTML = 'Description: ' + '<i>'+data[i].decription + '<br><br><br>';
//         bbox.appendChild(img);
//         bbox.appendChild(title_div);
//         bbox.appendChild(author_div);
//         bbox.appendChild(description_div);
//     }
// }


// var count = 100000;
// var books = [];

// function generateBooks(){
// var book = {
//     title:'',
//     author: {type: Schema.ObjectId, ref: 'Author', required: true},
//     description: '',
//     categoryId: {type: Schema.ObjectId},
//     img: String,
//     id: ''
// }
// }