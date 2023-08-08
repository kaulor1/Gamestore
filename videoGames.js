const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.patch('/', async (req, res, next) => {
    // LOGIC GOES HERE 
    try{
    const videoGame = await createVideoGame(req.body)
    const existingVideoGames= await getAllVideoGames(videoGame.id)
    if(existingVideoGames){
        res.send(existingVideoGames)
    }
    else {
        next({
            name:"CreateVideoGameError",
            message: "There was an error creating the video game"
        })
    }
}
catch(err){
    next(err)
}
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    // LOGIC GOES HERE 
    try{
        const videoGame = await updateVideoGame(req.params.id, req.body)
        if(videoGame){
            res.send(videoGame)
        }
        else{
            next({
                name: "UpdateVideoGameError",
                message: "Could not update your videogame"
            })
        }
    }
    catch(err){
        next(err)
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    // LOGIC GOES HERE

    try{
        const videoGame= await deleteVideoGame(req.params.id)
        res.send(videoGame)
    }
    catch(err){
        next(err)
    }

});

module.exports = router;
