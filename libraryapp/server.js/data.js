//Module data, must be in DB
 data = {};

// data.book = [
//     {
//         id: 1,
//         title: 'Road Ahead',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 1,
//         img: 'fant1.jpg'
//     },
//     {
//         id: 2,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book  about a great man, who had a long road of build ',
//         categoryId: 1,
//         img: 'fant2.jpg'
//     },
//     {
//         id: 3,
//         title: 'Hunger Games',
//         author: 'Suzanne Collins',
//         description: 'This book is about  great man, who had a long road of build ',
//         categoryId: 1,
//         img: 'fant3.jpg'
//     },
//     {
//         id: 4,
//         title: 'The Road',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a road of build ',
//         categoryId: 1,
//         img: 'fant4.jpg'
//     },
//     {
//         id: 5,
//         title: 'Stevenson Jobson',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of',
//         categoryId: 1,
//         img: 'fant5.png'
//     },
//     {
//         id: 6,
//         title: 'The Road2',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a road of build ',
//         categoryId: 1,
//         img: 'fant4.jpg'
//     },
//     {
//         id: 7,
//         title: 'Stevenson Jobson 2',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of',
//         categoryId: 1,
//         img: 'fant5.png'
//     },
//     {
//         id: 8,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 1,
//         img: 'det1.jpg'
//     },
//     {
//         id: 9,
//         title: 'Mockingjay: Final Games',
//         author: 'Suzanne Collins',
//         description: 'This road of build ',
//         categoryId: 1,
//         img: 'det2.jpg'
//     },
//     {
//         id: 10,
//         title: 'Jark Jarkoe',
//         author: 'Steven Sigal',
//         description: 'This book is about a great man, wdfjvbhfd dfbv dsrffgjk drfgbcf dgbdgbjf ',
//         categoryId: 1,
//         img: 'det3.jpg'
//     },
//     {
//         id: 11,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 1,
//         img: 'det4.jpg'
//     },
//     {
//         id: 12,
//         title: 'Mockingjay: The Final Book of The Hunger Games',
//         author: 'Suzanne Collins',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 1,
//         img: 'det5.jpg'
//     },
//     {
//         id: 13,
//         title: ' The Final Book of The Hunger Games',
//         author: 'Grigore Vieru',
//         description: 'This is about a great man, who had a long road of build ',
//         categoryId: 2,
//         img: 'chil1.png'
//     },
//     {
//         id: 14,
//         title: 'Road Ahead',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 2,
//         img: 'chil2.jpg'
//     },
//     {
//         id: 15,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 2,
//         img: 'chil3.jpg'
//     },
//     {
//         id: 16,
//         title: 'Mockingjay: The Final Book of The Hunger Games',
//         author: 'Suzanne Collins',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 2,
//         img: 'chil4.jpg'
//     },
//     {
//         id: 17,
//         title: 'Bill Gates',
//         author: 'Road Ahead',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 2,
//         img: 'chil5.jpg'
//     },
//     {
//         id: 18,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 3,
//         img: 'det1.jpg'
//     },
//     {
//         id: 19,
//         title: 'Mockingjay: Final Games',
//         author: 'Suzanne Collins',
//         description: 'This road of build ',
//         categoryId: 3,
//         img: 'det2.jpg'
//     },
//     {
//         id: 20,
//         title: 'Jark Jarkoe',
//         author: 'Steven Sigal',
//         description: 'This book is about a great man, wdfjvbhfd dfbv dsrffgjk drfgbcf dgbdgbjf ',
//         categoryId: 3,
//         img: 'det3.jpg'
//     },
//     {
//         id: 21,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 3,
//         img: 'det4.jpg'
//     },
//     {
//         id: 22,
//         title: 'Mockingjay: The Final Book of The Hunger Games',
//         author: 'Suzanne Collins',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 3,
//         img: 'det5.jpg'
//     },
//     {
//         id: 23,
//         title: 'Bill Gates',
//         author: 'Road Ahead',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'hist1.jpg'
//     },
//     {
//         id: 24,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'hist2.jpg'
//     },
//     {
//         id: 25,
//         title: 'Mockingjay: The Final Book of The Hunger Games',
//         author: 'Suzanne Collins',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'hist3.jpg'
//     },
//     {
//         id: 26,
//         title: 'Alo alo',
//         author: 'Road Ahead',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'hist4.jpg'
//     },
//     {
//         id: 27,
//         title: 'Mark fgbf',
//         author: 'John Doe',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'hist5.jpg'
//     },
//     {
//         id: 28,
//         title: 'Road Ahead',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'fant1.jpg'
//     },
//     {
//         id: 29,
//         title: 'Steve Jobs',
//         author: 'Walter Isaacson',
//         description: 'This book  about a great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'fant2.jpg'
//     },
//     {
//         id: 30,
//         title: 'Hunger Games',
//         author: 'Suzanne Collins',
//         description: 'This book is about  great man, who had a long road of build ',
//         categoryId: 4,
//         img: 'fant3.jpg'
//     },
//     {
//         id: 31,
//         title: 'The Road',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a road of build ',
//         categoryId: 4,
//         img: 'fant4.jpg'
//     },
//     {
//         id: 32,
//         title: 'Stevenson Jobson',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of',
//         categoryId: 4,
//         img: 'fant5.png'
//     },
//     {
//         id: 33,
//         title: 'The Road2',
//         author: 'Bill Gates',
//         description: 'This book is about a great man, who had a road of build ',
//         categoryId: 4,
//         img: 'fant4.jpg'
//     },
//     {
//         id: 34,
//         title: 'Stevenson Jobson 2',
//         author: 'Walter Isaacson',
//         description: 'This book is about a great man, who had a long road of',
//         categoryId: 4,
//         img: 'fant5.png'
//     },
// ];
// data.categories = [
//     {
//         name: 'Fantasy',
//         id: 1
//     },
//     {
//         name: 'Children',
//         id: 2
//     },
//     {
//         name: 'DetectiveStories',
//         id: 3
//     },
//     {
//         name: 'History',
//         id: 4
//     }
// ];
// data.orders = [];
// data.orders.getNextId = function() {
//     if (data.orders.length == 0)
//         return 1;
//     return data.orders[data.orders.length - 1].id + 1;
// }

//Export the module
// module.exports = data;