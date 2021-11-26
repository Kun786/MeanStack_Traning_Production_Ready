//call model here
const _TestingAndLearningCollection = require('../models/UserModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const RegisterUser = async (req, res) => {
    try {
        //Creat a varibale in which you Add data from the req
        const _TestingVariableToStoreInDataBase = new _TestingAndLearningCollection({
            Name: req.body.Name,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            EncryptedPassword: req.body.Password,
            OriginalPassword:req.body.Password,
            Email:req.body.Email,
            ImageUrl: `/assets/${req.body.Name}/${req.file.filename}`,
            ImageName: req.file.originalname,
            ImageMimeType: req.file.mimetype
        });

        const _Result = await _TestingVariableToStoreInDataBase.save();
        res.json({
            Message: 'Added Successfully',
            Data: true,
            Result: _Result
        })
        //Save that variable into the database
        //if Saved send a message " You have saved the data"
    } catch (error) {
        fs.unlinkSync(`./assets/${req.body.Name}/${req.file.filename}`);
        fs.rmdirSync(`./assets/${req.body.Name}`);
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }

}

const UserLogin = async ( req,res ) => {
    try {
        _Email = req.body.Email;
        _Password = req.body.Password;
        const _UserToAuthenticate = await _TestingAndLearningCollection.findOne({ Email: _Email });

        if (_UserToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or UserName',
                Data: false,
                Result: null
            })
        }

        const _Result = await bcrypt.compare(_Password, _UserToAuthenticate.EncryptedPassword);
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or UserName',
                Data: false,
                Result: null
            })
        }

        const _Token = jwt.sign(
            {
                Email: _UserToAuthenticate.Email,
                UserId: _UserToAuthenticate._id
            },
            'UserLogin',
            { expiresIn: '1h' }
        )

        if (_UserToAuthenticate.Status === 0) {
            return res.json({
                Message: 'You cannot login as you are suspended by Admin',
                Data: false,
                Result: null
            })
        }


        return res.json({
            Message: 'Authentication SuccessFull',
            Data: true,
            Token: _Token,
            Result: _UserToAuthenticate
        })


    } catch (error) {
        console.log(error.message);
        res.json({
            Error: error.message,
            Data: null
        })
    }
}

const UpdateUser = async (req, res) => {
    try {
        const _GetUserId = req.params._UserId;
        const _UpdateUser = await _TestingAndLearningCollection.updateOne(
            { _id: _GetUserId },
            req.body
        )
        res.json({
            Message: 'Update Successfully',
            Data: true,
            Result: _UpdateUser
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetAllUsersFromTestCollection = async (req, res) => {
    try {
        const _GetALlUsers = await _TestingAndLearningCollection.find();
        res.json({
            Message: 'All Data Found Successfully',
            Data: true,
            Result: _GetALlUsers
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetUserById = async (req, res) => {
    try {
        const _GetUserId = req.params._UserId;
        const _GetUserDataById = await _TestingAndLearningCollection.findById(
            { _id: _GetUserId },
        );

        if (_GetUserDataById !== null) {
            res.json({
                Message: "Data Found Successfully",
                Data: true,
                Result: _GetUserDataById
            })
        }
        if (_GetUserDataById === null) {
            res.json({
                Message: "Data Not Found",
                Data: false,
                Result: null
            })
        }

    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}


const UpdateById = async (req, res) => {
    try {
        const _GetUserId = req.params._UserId;
        const _GetUserName = req.body.Name;
        const _UpdateUserById = await _TestingAndLearningCollection.updateOne(
            { _id: _GetUserId },
            { Name: _GetUserName }
        );
        if (_UpdateUserById.modifiedCount === 1) {
            res.json({
                Message: 'UpdateSuccessFully',
                Data: true,
                Result: _UpdateUserById
            })
        }

        if (_UpdateUserById.modifiedCount !== 1) {
            res.json({
                Message: 'Not Updated',
                Data: false,
                Result: null
            })
        }

    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const RemoveUserById = async (req, res) => {
    try {
        const _GetUserId = req.params._Id;
        const _GetUserObjectForId = await _TestingAndLearningCollection.findOne({_id:_GetUserId});
        const _RemoveUserById = await _TestingAndLearningCollection.deleteOne(
            { _id: _GetUserId }
        );
        fs.unlinkSync(`.`+_GetUserObjectForId.ImageUrl);
        fs.rmdirSync(`./assets/`+_GetUserObjectForId.Name);
        res.json({
            Message: 'Deleted Successfully',
            Data: true,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: null,
            Result: null
        })
    }
}

const RemoveAllCollection = async (req, res) => {
    try {
        const _RemoveAllCollection = await _TestingAndLearningCollection.deleteMany();
        res.json({
            Message: 'All collection has removed successfully',
            Data: true,
            Result: _RemoveAllCollection
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: null,
            Result: null
        })
    }
}

module.exports = { RegisterUser, UpdateUser, GetAllUsersFromTestCollection, GetUserById, UpdateById, RemoveUserById , RemoveAllCollection, UserLogin };
