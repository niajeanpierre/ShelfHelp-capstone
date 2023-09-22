import mongoose from 'mongoose'
const { v4:uuidv4 } = require("uuid")

const bookSchema = new mongoose.Schema(
    {
        /*bookid: {
            type: String,
            unique: true,
            default: uuidv4
        },*/
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        author: {
            type: String,
            required: true,
            minlength: 2,
            maxlength:30,
        },
        cover: {
            type: String,
        },
        category: {
            type: String,
        },
        review: {
            type: String,
        },
        quotes: {
            type: String,
        },
        notes: {
            type: String,
        }
    },
    {timestamps: true}
);

const Book = mongoose.model('Book', bookSchema);

export default Book;