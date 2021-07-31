const router = require('express').Router();
const sequelize = require('../config/connection');

const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth')

// DASHBOARD ROUTES
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'post_text', 'title', 'createdAt',],
        include: [{ model: Comment , attributes: ['id', 'comment_text', 'post_id','user_id', 'createdAt'],
            include: { model: User, attributes: ['username'] }
    },
    {
        model: User,
        attributes: ['username']
    }]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => {
            post.get({ plain: true });
        }) 
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

// Edit a post 
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_text', 'title', 'createdAt',],
        include: [{ model: Comment , attributes: ['id', 'comment_text', 'post_id','user_id', 'createdAt'],
            include: { model: User, attributes: ['username'] }
    },
    {
        model: User,
        attributes: ['username']
    }]
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({
                message: 'Post not found'
            });
        }
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn : true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

// Route to edit the logged in user
router.get('/edituser',withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message : 'User not found' });
            return;
            }
            const user = dbUserData.get({ plain: true });
            res.render('edit-user', { user, loggedIn : true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
);

module.exports = router;


