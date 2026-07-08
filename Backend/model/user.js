const mongoose = require("mongoose");


const objectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        text: true,
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        text: true,
        trim: true
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        text: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    pictures: {
        type: String,
        default: "https://i.pravatar.cc/300"
    },
    cover: {
        type: String,
        default: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
    },
    gender:{
        type: String,
        required:[true, "Gender is required"]
    },
    verified: {
        type: Boolean,
        default: false
    },
   followers: [
  {
    type: objectId,
    ref: "User"
  }
],
  followering: [
  {
    type: objectId,
    ref: "User"
  }
],
   friends: [
  {
    type: objectId,
    ref: "User"
  }
],
    requests: {
        type: Array,
        default: []
    },
    byear: {
        type: Number,
        required: true
    },
    bmonth: {
        type: Number,
        required: true
    },
    bday: {
        type: Number,
        required: true
    },
    search: [
        {
            user: {
                type: objectId,
                ref: "User"
            }
}
    ],

    details:{
        bio: {
            type: String,
            trim: true
        },
        otherName: {
            type: String,
            trim: true
    },
    job: {
        type: String,
        trim: true
    },
    workplace: {
        type: String,
        trim: true
    },
    highSchool: {
        type: String,
        trim: true
    },
    college: {
        type: String,
        trim: true
    },
    currentCity: {
        type: String,
        trim: true
    },
    hometown: {
        type: String,
        trim: true
    },
    relationship: {
        type: String,
        trim: true,
        enum: ["Single", "In a relationship", "Married", "Divorced", "Complicated"]
    },
    instagram: {
        type: String,
        trim: true
    },
    savePost: [
      {  post: {
            type: objectId,
            ref: "Post"
        }}
    ],
    saveAt:{
        type: Date,
        default: Date.now
    }
}
},{timestamps: true});


const user = mongoose.model("User", userSchema);
module.exports = user;