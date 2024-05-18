import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: true,
        select: false,
    },
    UUID: {
        type: String,
        required: true
    }

},
    {
        // This line removes the password from the field 
        toJSON: {
            transform(doc, ret) {
                delete ret.password
            }
        }
    }
)

userSchema.pre('save', async function (next) {
    // only run this function if the password is modified
    if (!this.isModified('password')) return next()

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

})

const User = mongoose.model("User", userSchema)

export default User;