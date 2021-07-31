const { Post } = require('../models');

const postData = [
  {
    title: 'Fun Fact 1/20',
    post_text: 'PCs went by the name “Electronic Brains” in the 1950s',
    user_id: 1,
  },
  {
    title: 'Fun Fact 2/20',
    post_text: 'Email has been around longer than the World Wide Web.',
    user_id: 2,
  },
  {
    title: 'Fun Fact 3/20',
    post_text: 'HP, Google, Microsoft and Apple have just one thing in common, other than the fact that they are IT companies. They were all started in garages.',
    user_id: 2,
  },
  {
    title: 'Fun Fact 4/20',
    post_text: 'Bill Gates’ house was designed using a Mac computer.',
    user_id: 3,
  },
  {
    title: 'Fun Fact 5/20',
    post_text: 'There are approximately 6000 new viruses released every month.',
    user_id: 4,
  },
  {
    title: 'Fun Fact 6/20',
    post_text: '51% of internet traffic is “non-human”. 31% is made up from hacking programs, spammers and malicious phishing.',
    user_id: 5,
  },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;