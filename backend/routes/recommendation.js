// In your backend routes/recommendation.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');

const preprocessText = (text) => {
    const lexed = aposToLexForm(text);
    const alphaOnly = lexed.toLowerCase().replace(/[^a-zA-Z\s]+/g, '');
    return alphaOnly;
};

// Function to calculate TF-IDF similarity (example, you might need to adjust weights)
const calculateSimilarity = (text1, text2) => {
    const tokenizer = new natural.WordTokenizer();
    const tfidf = new natural.TfIdf();

    tfidf.addDocument(text1);
    tfidf.addDocument(text2);

    const terms1 = tokenizer.tokenize(text1);
    const terms2 = tokenizer.tokenize(text2);

    let similarityScore = 0;
    tfidf.tfidfs(text1).forEach((tfidfValue1, i) => {
        const term = tfidf.listTerms(text1)[i].term;
        const index2 = tfidf.listTerms(text2).findIndex(item => item.term === term);
        if (index2 !== -1) {
            similarityScore += tfidfValue1 * tfidf.tfidfs(text2)[index2];
        }
    });
    return similarityScore;
};

// New route to get similar products based on a product ID
router.get('/similar/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const currentProduct = await Product.findById(productId);
        if (!currentProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const currentProductText = preprocessText(`${currentProduct.name} ${currentProduct.description} ${currentProduct.category}`);

        const allProducts = await Product.find({});

        const similarProducts = allProducts
            .filter(product => product._id.toString() !== productId) // Don't recommend the same product
            .map(product => {
                const otherProductText = preprocessText(`${product.name} ${product.description} ${product.category}`);
                const similarity = calculateSimilarity(currentProductText, otherProductText);
                return { product, similarity };
            })
            .sort((a, b) => b.similarity - a.similarity) // Sort by similarity in descending order
            .slice(0, 5) // Get the top 5 similar products
            .map(item => item.product); // Extract the product objects

        res.json(similarProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;