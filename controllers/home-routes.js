const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Render a home page
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_id', 'title', 'created_at',],
        order: [['created_at', 'DESC']],
        include: [{ model : User, attributes: ['username'] },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at', 'user_id',],
            include: [{ model: User, attributes: ['username'] }],
        }],
        
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => { post.get({ plain: true });
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    });
});
})
.catch(err => {
    console.log(err);
    res.status(500).json('Something went wrong');
}
);

// Render a page for a specific post
router.get('/:post_id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_text', 'title', 'created_at',],
        include: [{ model: User, attributes: ['username'] },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at', 'user_id',],
            include: [{ model: User, attributes: ['username'] }],
        }],
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json('Post not found');
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json('Something went wrong');
    }
    );
});

// Render a login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('login');
});

// Render a signup page
router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('signup');
}
);


module.exports = router;