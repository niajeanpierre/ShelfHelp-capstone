import { Router } from "express";
import { Book } from "../models"

const router = Router()

router.post('/:bookid', async (req, res, next) => {
    const { bookid } = req.params
    const { title, author, cover, category, review, quotes, notes } = req.body

        console.log(title)

        const book = new Book ({
            bookid: bookid,
            title: title,
            author: author,
            cover: cover,
            category: category, 
            review: review,
            quotes: quotes,
            notes: notes,
        })

        let bookcheck = Book.findOne({bookid: bookid})

        if (bookcheck) {
            res.send("Book already exists")
        } else {
        const savedBook = await book.save()
        res.json(savedBook.toJSON())
        }
    }) 

    router.get('/:bookid', async (req, res, next) => {
        const { bookid } = req.params

        const book = await Book.findOne({bookid: bookid})
        if (book){
            res.json(book.toJSON()).end()
        }else {
            res.send("Can not find book")
        }
    })

module.exports = router