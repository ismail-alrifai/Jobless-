const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.get('/freelancer/trie_keywords' ,Controller.TrieController.getFreelancerKeywords);

router.get('/user/trie_keywords' ,Controller.TrieController.getUserKeywords);

// --------------------------------------------------- //

module.exports = router;