import { Router } from "express";
import { Book } from "../models";

const router = Router();

router.post("/", async (req, res, next) => {
    const { title, author, cover, category, review, quotes, notes } = req.body;

    console.log(title);

    const book = new Book({
        title: title,
        author: author,
        cover: cover,
        category: category,
        review: review,
        quotes: quotes,
        notes: notes,
    });

    try {
        const savedBook = await book.save();
        res.json(savedBook.toJSON());
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});

router.get("/:title", async (req, res, next) => {
    const { title } = req.params;

    try {
        const book = await Book.findOne({ title });
        if (book) {
            res.json(book.toJSON()).end();
        } else {
            res.send("Can not find book");
        }
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});

bookRouter.put("/:title", async (req, res) => {
    const { title } = req.params;
    const updatedData = req.body;

    try {
        const book = await Book.findOneAndUpdate(
            { title: decodeURIComponent(title) },
            updatedData,
            { new: true }
        );
        if (book) {
            res.status(200).json(book);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the book",
        });
    }
});

router.delete("/:title", async (req, res, next) => {
    const { title } = req.params;
    try {
        await Book.findOneAndDelete({
            title: decodeURIComponent(title),
        });
        res.status(204).json({
            message: "Book successfully deleted",
        });
    } catch (error) {
        res.json({ error: error }).end();
    }
});
module.exports = router;
