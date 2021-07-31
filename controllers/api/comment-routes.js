const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => {
            res.json(dbCommentData);
        }
    );
});

// Post a comment
router.post('/', withAuth, (req, res) => {
    if(req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => res.status(500).json(err));
    }
}
);

// Delete a comment
router.delete('/:comment_id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({
                message: 'Comment not found',

            });
        }
        else{
            res.json(dbCommentData);
        }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;

