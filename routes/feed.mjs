import express from 'express';
let router = express.Router()

router.get('/feed/:userId', (req, res, next) => {
    console.log('this is feed!', new Date());
    res.send('this is feed! ');
})


export default router