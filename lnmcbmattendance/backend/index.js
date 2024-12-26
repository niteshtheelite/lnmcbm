import express from 'express';
import app from './app.js';
// const port = process.env.PORT || 4525;


app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
})
