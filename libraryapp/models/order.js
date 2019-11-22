const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
    items: Array,
    orderPrice: Number,
    name: {
        type: String, 
        minlenght: 2,
        maxlenght: 20,
        required: true
    },
},
{
    versionKey: false 
});

OrderSchema
.virtual('url')
.get(function() {
    return '/order/' + this._id;
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;