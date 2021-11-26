// const mongoose = require('mongoose');

//Start Block Schema Creating
// const PackageSchema = mongoose.Schema({
//     PackageName: { type: String, required: true },
//     PackagePrice: { type: Number, required: true },
//     AdsLimit: { type: Number, required: true },
//     ClickRate: { type: Number, required: true },
//     MinimumWithdrawl: { type: Number, required: true },
//     ReferralClick: { type: Number, required: true },
//     ReferralLimit: { type: Number, required: true },
//     Duration: { type: Number, required: true },
//     DailyEarnings: { type: Number, required: true },
// })
//End Block Schema Creating

//Exporting The Schema
// module.exports = mongoose.model('PackageCollection', PackageSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = 10;
const _TestingAndLearningSchema = mongoose.Schema({
    Name: { type: String, required: true },
    MobileNumber: { type: Number },
    Address: { type: String },
    Email:{ type:String , required: true, unique: true},
    EncryptedPassword: { type: String , required: true },
    ImageUrl: { type: String },
    ImageName: { type: String },
    ImageMimeType: { type: String },
    SaltString:{type:String},
    OriginalPassword: { type:String, required: true }
})

_TestingAndLearningSchema.pre('save', function(next){
    bcrypt.genSalt(SaltRounds,(err,salt)=>{
        if(salt){
        this.SaltString=salt;
        bcrypt.hash(this.EncryptedPassword,salt,(err,hash)=>{
            this.EncryptedPassword=hash;
            next();
        })
    }
    else {
        res.json({
            Error:err.message
        })
    }
    })
});

module.exports = mongoose.model('TestingCollection', _TestingAndLearningSchema);
//Start Block For Modeling my Data and creating Schemas in DataBase