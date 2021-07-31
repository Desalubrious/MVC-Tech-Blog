const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/',(req,res)=>{
    Post.findAll({
        attributes: [ 'id','title','post_text','created_at',],
        order: [[ 'created_at', 'DESC' ]],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id','comment_text','post_id','user_id','created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    }).then(dbPostData=> res.json(dbPostData))
    .catch(error=>res.status(500).json(error));
}
);

// Get a single post
router.get('/:id',(req,res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [ 'id','title','post_text','created_at',],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id','comment_text','post_id','user_id','created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    }).then(dbPostData=> res.json(dbPostData))
    .catch(error=>res.status(500).json(error));
}
);

// Create a new post
router.post('/', withAuth, (req,res)=>{
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.user.id
    }).then(dbPostData=> res.json(dbPostData))
    .catch(error=>res.status(500).json(error));
}
);

// Update a post
router.put('/:id', withAuth, (req,res)=>{
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData=> res.json(dbPostData))
    .catch(error=>res.status(500).json(error));
}
);

// Delete a post
router.delete('/:id', withAuth, (req,res)=>{
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData=> res.json(dbPostData))
    .catch(error=>res.status(500).json(error));
}
);

module.exports = router;
