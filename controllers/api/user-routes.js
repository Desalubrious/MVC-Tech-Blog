const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        },
        order: [['createdAt', 'DESC']]
    }).then(users => {
        res.json(users);
    });
});

// Get a user by id
router.get('/:id', (req, res) => { 
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [{ model: Post, attributes:['id', 'comment_text', 'post_id','user_id', 'createdAt'],
    },
    { model: Comment, attributes:['id', 'comment_text', 'post_id','user_id', 'createdAt'],
include:{ model: Post, attributes:['title'] }
    }]
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).send('User not found');
        }
        else {
            res.json(dbUserData);
        }
    });
});

// Create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData => { 
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });

    }).catch(err => {
        res.status(400).send(err);
    }
    );
});

//  Log in a user
router.post('/login', (req, res) => {
    User.findOne({
        where: { email: req.body.email }

    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).send('Invalid credentials');
            return;
        }
        const validPassword = dbUserData.comparePassword(req.body.password);
        if(!validPassword) {
            res.status(400).send('Invalid credentials');
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData , message: 'User logged in' });
        }
        );
    });
});

// Log out a user
router.post('/logout', withAuth, (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'User logged out' });
    });
}
);

// Update a user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    }).then(() => {
        res.json({ message: 'User updated' });
    }
    );
});


// Delete a user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.json({ message: 'User deleted' });
    }
    );
}
);

module.exports = router;

