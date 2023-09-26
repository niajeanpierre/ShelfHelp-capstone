import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
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