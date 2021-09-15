
const express = require('express');
const router = express.Router();
const db = require('./DAquestions')


router.use(express.json());

router.get('/idiot', async function (req, res) {
    try {
        const result = await db.getIdiot();

        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.get('/never', async function (req, res) {
    try {
        const result = await db.getNever();
        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.get('/isalive', async function (req, res) {
    try {
        const result = await db.getIsAlive();
        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.get('/likely', async function (req, res) {
    try {
        const result = await db.getLikely();
        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.get('/', async function (req, res) {
    try {
        const result = await db.getAllQuestions();
        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.get('/types', async function (req, res) {
    try {
        const result = await db.getTypes();
        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.get('/randomimg', async function (req, res) {
    try {
        const result = await db.getRandomImages();
        res.json(result);
        console.log(result)
    } catch (error) {


        res.json(error); 
    }
})

router.get('/buttonnames', async function (req, res) {
    try {
        const result = await db.getButtonNames();
        res.json(result);
        console.log(result)
    } catch (error) {


        res.json(error); 
    }
})

router.get('/really', async function (req, res) {
    try {
        const result = await db.getReally();
        res.json(result);
        console.log(result)
    } catch (error) {


        res.json(error); 
    }
})

router.post('/1', async function (req, res){

    try {
        const result = await db.addNever(req.body);
        res.json(result);
    } catch (error) {

        res.json(error); 
    }
})

router.post('/2', async function (req, res){

    try {
        const result = await db.addLikely(req.body);
        res.json(result);
    } catch (error) {


        res.json(error); 
    }
})

router.post('/3', async function (req, res){

    try {
        const result = await db.addIdiot(req.body);
        res.json(result);
    } catch (error) {
        res.json(error); 

    }
})

router.post('/4', async function (req, res){

    try {
        const result = await db.addIsalive(req.body);
        res.json(result);
    } catch (error) {


        res.json(error) 
    }
})

router.post('/6', async function (req, res){

    try {
        const result = await db.addReally(req.body);
        res.json(result);
    } catch (error) {


        res.json(error) 
    }
})

router.post('/randomimg', async function (req, res){

    try {
        const result = await db.addRandomImg(req.body);
        res.json(result);
    } catch (error) {


        res.json(error) 
    }
})

module.exports = router;