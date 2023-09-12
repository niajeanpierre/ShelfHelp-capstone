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

    router.put("/update/:bookid", async (req, res, next) => {
        const { bookid } = req.params
        let {category, update } = req.body

        try {
            if (category === "category"){
                await Book.updateOne({bookid: bookid}, {$set: {category: update}})
            }else if (category === "notes"){
                await Book.updateOne({bookid: bookid}, {$set: {notes: update}})
            }else if (category === "quotes"){
                await Book.updateOne({bookid: bookid}, {$set: {quotes: update}})
            }else if (category === "review"){
                await Book.updateOne({bookid: bookid}, {$set: {review: update}})
            } else {
                res.send("can not update category").end()
            }
        } catch (error) {
            res.json({error: error}).end()
        }
        let book = await Book.findOne({bookid: bookid})
        res.json(book)
    })

    router.delete("/delete/:bookid", async (req,res,next) => {
        const { bookid } = req.params
        try {
            await Book.findOneAndDelete({bookid: bookid})
        } catch (error) {
            res.json({error: error}).end()
        }
        res.send(`deleted book ${bookid}`)
    })
module.exports = router