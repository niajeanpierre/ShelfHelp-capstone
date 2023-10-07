import { Router } from "express";
import { Book } from "../models";
import { requireAuth } from "../middleware";

const router = Router();

router.post("/", requireAuth, async (req, res, next) => {
    const { title, author, cover, category, review, quotes, notes } = req.body;
    const { user } = req
    console.log(user)

    const book = new Book({
        username: user.username,
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
        console.log(`successfully saved ${savedBook.title} to DB`)
        res.json(savedBook.toJSON());

        if (user.customBookInfo.includes(savedBook.id)) {
            const result = await user.updateOne({
            $pull: { customBookInfo: savedBook.id },
            })
        } else {
            const result = await user.updateOne({
            $push: { customBookInfo: savedBook.id },
            })
        }
    } catch (err) {
      console.error(err)
        return res.status(422).json({ error: err });
    }
});

router.get("/", requireAuth, async (req, res) => {
    try {
        const { user } = req
        const books = await Book.find({ username: user.username });
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).send(`Can not find books for ${user.username}`);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:title", requireAuth, async (req, res, next) => {
    const { title } = req.params;
    const { user } = req

    try {
        const book = await Book.findOne({
            username: user.username,
            title: title,
        });
        if (book) {
            res.json(book.toJSON()).end();
        } else {
            res.send("Can not find book");
        }
    } catch (err) {
      console.error(err)
        return res.status(422).json({ error: err });
    }
});

router.put("/:title", requireAuth, async (req, res) => {
    const { title } = req.params;
    const { user } = req
    const updatedData = req.body;

    try {
        const book = await Book.findOneAndUpdate(
            { title: decodeURIComponent(title), username: user.username },
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

router.delete("/:title", requireAuth, async (req, res, next) => {
    const { title } = req.params;
    const { user } = req
    try {
        await Book.findOneAndDelete({
            title: decodeURIComponent(title), username: user.username
        });
        res.status(204).json({
            message: "Book successfully deleted",
        });
    } catch (error) {
        res.json({ error: error }).end();
    }
});
module.exports = router;
