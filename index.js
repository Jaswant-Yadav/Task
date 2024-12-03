const express = require('express');
const mongoose = require('mongoose');
const Book = require('./db/book');
const User = require('./db/user');
const Transaction = require('./db/transcation');
const app = express();


// connect DB

const fetchBook = async () => {
    return await Book.find();
};

const fetchUser = async () => {
    return await User.find();
};

const fetchTransaction = async() =>{
    return await Transaction();
};

// All book API

app.get('/book', async (req, resp) => {
    const books = await fetchBook();
    resp.send(books)
})

//Search books by key
app.get("/search/:key", async (req, resp) => {
    try {
        const { min, max } = req.query;
        let query = {
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { category: { $regex: req.params.key, $options: 'i' } }
            ]
        };

        if (min && max) {
            query.$or.push({ rentPerDay: { $gte: Number(min), $lte: Number(max) } });
        }

        let books = await fetchBook.find(query);
        
        if (!books.length) {
            return resp.json({ message: "No books found matching the criteria" });
        }

        resp.json(books);
    } catch (error) {
        resp.json({ error: "Error searching books" });
    }
});

// All user API

app.get('/user', async (req, resp) => {
    const Users = await fetchUser();
    resp.send(Users)
});

// Issue and return a book
app.get("/transactions/search", async (req, resp) => {
    try {
        const { bookName, userId, issueDate, returnDate } = req.query;
        
        
        let query = {};
        
        if (bookName) {
            query.bookName = { $regex: bookName, $options: 'i' };
        }
        
        if (userId) {
            query.userId = userId;
        }
        
        if (issueDate) {
            query.issueDate = { $gte: new Date(issueDate) };
        }
        
        if (returnDate) {
            query.returnDate = { $lte: new Date(returnDate) };
        }

        
        if (Object.keys(query).length === 0) {
            return resp.json({ error: "At least one search parameter is required" });
        }

        let transactions = await Transaction.find(query);
        
        if (!transactions.length) {
            return resp.json({ message: "No transactions found matching the criteria" });
        }

        resp.json(transactions);
    } catch (error) {
        console.error(error); 
        resp.json({ 
            error: "Error searching transactions",
        });
    }
});

app.listen(4000) 