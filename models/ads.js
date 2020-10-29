const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adsSchema = new Schema({
    banner:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    paid:{
        type:Boolean,
        default:false
    },
    duration:{
        type:Number,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Seller"
    },
    price : {
        type:Number,
        required:true
    }
})
const ads = mongoose.model('Ads',adsSchema);
module.exports = ads;