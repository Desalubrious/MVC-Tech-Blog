const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "thanks!",
    post_id: 3,
    user_id: 1
  },
  {
    comment_text: "Wow! Very cool.",
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: "Comment flamewar incoming",
    post_id: 4,
    user_id: 2
  },
  {
    comment_text: "Very useful",
    post_id: 4,
    user_id: 3
  },
  {
    comment_text: "Stay safe",
    post_id: 5,
    user_id: 5
  },
  {
    comment_text: "The internet is neat",
    post_id: 5,
    user_id: 4
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;