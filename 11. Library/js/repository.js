class Repository {
    constrtuctor() {

    }
    getCategories(id,name) {
        for (var i = 0; i < window.Categories.length; i++) {
            if (window.Categories[i].id === id) {
                return window.Categories[i];
            }
        }
    }

    getPage(pageNumber,pageSize,filters){
        var booksFiltered = [];
        for(var i = 0; i < window.Book.length; i++){
            var book = window.Book[i];
            
            var doesGenreMatch = !filters.categoryId
                || (window.Book[i].genreId == filters.categoryId);
            var doesSearchMatch = !filters.searchString 
                || (window.Book[i].title.toLowerCase().indexOf(filters.searchString.toLowerCase()) >= 0)
                || (window.Book[i].author.toLowerCase().indexOf(filters.searchString.toLowerCase()) >= 0);

              if (doesGenreMatch && doesSearchMatch) {
                booksFiltered.push(book);
            }
        }
        var startIndex = pageNumber * pageSize;
        var result = [];
        for (var i = startIndex; 
                 i < booksFiltered.length && i < startIndex + pageSize; 
                 i++) {
            result.push(booksFiltered[i]);
        }

        return {
            totalCount: booksFiltered.length,
            data: result
        }
    }
};
