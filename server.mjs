import express from 'express';
import path from 'path';
import cors from 'cors';
import './mongodb.mjs'
import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'

const __dirname = path.resolve();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", authRouter)


app.use((req, res, next) => {
    const token = "valid";
    if (token === "valid") {
        next();
    } else {
        res.send({ message: "invalid token" })
    }
})


app.use("/api/v1", commentRouter)
app.use("/api/v1", postRouter)
app.use("/api/v1", feedRouter)

app.use(express.static(path.join(__dirname, './web/build')))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})
