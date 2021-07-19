const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
   },
   email: {
      type: String,
      required: true,
      unique: true,
      minlength:5,
      maxlength:255
   },
   password: {
      type: String,
      required: true,
      minlength:5,
      maxlength:1024
   }

});

userSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({ _id: this._id, name:this.name }, process.env.jwtPrivateKey);
   return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
   const schema = Joi.object({
      name:Joi.string().min(2).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: passwordComplexity({
         min:8,
         max:255,
         lowerCase: 1,
         upperCase: 1,
         numeric: 1,
         symbol: 1,
         requirementCount: 4
      })
   })

   return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;