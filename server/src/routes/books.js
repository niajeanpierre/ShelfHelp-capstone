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

        try {
            const savedBook = await book.save()
            res.json(savedBook.toJSON())
        } catch (err) {
            return res.status(422).json({ error: err })
        }

    }) 

    router.get('/:bookid', async (req, res, next) => {
        const { bookid } = req.params

        try {
            const book = await Book.findOne({bookid: bookid})
            if (book){
                res.json(book.toJSON()).end()
            } else {
                res.send("Can not find book")
            }} catch (err) {
                return res.status(422).json({ error: err })
            }
    })

module.exports = router