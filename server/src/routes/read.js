import { Router } from "express";
import { Book } from "../models";

const router = Router();

router.get("/readBooks", async (req,res,next) => {
    const products = await Book.find({}).sort({ created: -1 })

    let bookA = []
    let read = []

    let books = products.map((products) => products.toJSON())
    books.forEach((book) => bookA.push(book))
    for (let index = 0; index < bookA.length; index++) {
        const element = bookA[index];
        if (element.category === "read") {
            read.push(element)
        }
    }
    if (read.length === 0) {
        res.json("No read books")
    } else {
        res.json(read)
    }
})

router.get("/readingBooks", async (req,res,next) => {
    const products = await Book.find({}).sort({ created: -1 })

    let bookA = []
    let reading = []

    let books = products.map((products) => products.toJSON())
    books.forEach((book) => bookA.push(book))
    for (let index = 0; index < bookA.length; index++) {
        const element = bookA[index];
        if (element.category === "reading") {
            reading.push(element)
        }
    }
    if (reading.length === 0) {
        res.json("No books currently being read")
    } else {
        res.json(reading)
    }
})

router.get("/toBeReadBooks", async (req,res,next) => {
    const products = await Book.find({}).sort({ created: -1 })

    let bookA = []
    let toBeRead = []

    let books = products.map((products) => products.toJSON())
    books.forEach((book) => bookA.push(book))
    for (let index = 0; index < bookA.length; index++) {
        const element = bookA[index];
        if (element.category === "toBeRead") {
            toBeRead.push(element)
        }
    }
    if (toBeRead.length === 0) {
        res.json("No to be read books")
    } else {
        res.json(toBeRead)
    }
})

module.exports = router