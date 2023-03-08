const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        firstname:{
            type:String,
            required: true
        },
        lastname:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{ 
            type:String,
            required:true
        },
        mobile:{
            type:Number,
            required:true 
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        }

    }
)
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const User = mongoose.model("User", userSchema);

module.exports = User;