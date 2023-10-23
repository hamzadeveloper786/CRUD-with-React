import express from 'express';
let router = express.Router()

router.get('/comment/:postId/:commentId', (req, res, next) => {
    console.log('this is comment!', new Date());
    res.send('post comment');
})
router.get('/comments/:postId', (req, res, next) => {
    console.log('this is comment!', new Date());
    res.send('post comment');
})
router.put('/comment/:postId/:commentId', (req, res, next) => {
    console.log('this is comment!', new Date());
    res.send('post comment');
})
router.delete('/comment/:postId/:commentId', (req, res, next) => {
    console.log('this is comment!', new Date());
    res.send('post comment');
})

export default router