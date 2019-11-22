var data = require('./data');
var Book = require('../models/book');
var Category = require('../models/category');
var Author = require('../models/author');

class Repository {
    constrtuctor() {

    }

    getCategories() {
        return Category.find({}).exec().then(function (categories) {
            return categories;
        });
    }

    getAuthor(){
        return Author.find({}).exec().then(function(authors){
            return authors;
            console.log(authors);
        });
    }

    async getCategoryByName(categoryName) {
        return await Category.findOne({ name: categoryName }).exec();
    }

    getById(id) {
        return Book.findOne({ _id: id }).populate('author').exec().then(function (books) {
            return books;
        });
    }

    async getPage(pageNumber, pageSize, filters) {
        var queryConditions = {};
        if (filters.categoryId)
            queryConditions.categoryId = filters.categoryId;
        if (filters.searchString)
            queryConditions.searchString = filters.searchString;

        pageNumber = pageNumber ? pageNumber : 1;
        pageSize = pageSize ? pageSize : 10;
        var skipCount = (pageNumber - 1) * pageSize;
        var searchFilterRegex =
            filters.searchString
            ? `.*${filters.searchString}.*`
            : '.*';
        var categoryFilterStatement = filters.categoryId ? filters.categoryId : null;
            var filter = {
                $or: [
                    {
                        "authors.name": {
                            $regex: searchFilterRegex, $options:"$i"
                        }
                    },
                    {
                        "title": {
                            $regex: searchFilterRegex, $options:"$i"
                        }
                    }
                ]
            };
            if (categoryFilterStatement) {
                filter = {
                    $and: [
                        { "categoryId": categoryFilterStatement },
                        {
                            $or: [
                                {
                                    "authors.name": {
                                        $regex: searchFilterRegex, $options:"$i"
                                    }
                                },
                                {
                                    "title": {
                                        $regex: searchFilterRegex, $options:"$i"
                                    }
                                }
                            ]
                        }
                    ]
                };
            }
            
        var result = await Book.aggregate([
            { $lookup: {
                from: Author.collection.name,
                localField: 'author',
                foreignField: '_id',
                as: 'authors'
            }},
            { $unwind: {
                path: '$authors'
            }},

            { $match: filter},

            { $skip: skipCount },
            { $limit: pageSize }
        ]);

        var totalCount = await Book.find(queryConditions)
            .countDocuments()
            .exec();

        return await {
            totalCount: totalCount,
            data: result,
            pageNumber: pageNumber,
            pageSize: pageSize
        }
    }
};

var repository = new Repository();

module.exports = repository;