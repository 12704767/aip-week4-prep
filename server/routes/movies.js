const express = require('express');
const models = require('../models');

const router = express.Router();

/* GET all of the movies. */
router.get('/', (req, res) => {
  models.movie
    .findAll()
    .then((movies) => res.json({ movies: movies }));
});

/* POST a new movie. */
router.post('/', (req, res) => {
  models.movie
    .create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      synopsis: req.body.synopsis,
      genre: req.body.genre
    })
    .then((movies) => res.json(movies))
});

/* GET the movie with :id. */
router.get('/:id', (req, res) => {
  models.movie
    .findById(req.params.id)
    .then((movie) => res.json(movie));
});

/* PUT the movie with :id. */
router.put('/:id', (req, res) => {
  models.movie
    .update({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      synopsis: req.body.synopsis,
      genre: req.body.genre
    }, {
      where: { id: req.params.id }
    })
    .then((result) => models.movie.findAll()
        .then((movies) => res.json(movies))
    );
});

/* DELETE the movie with :id. */
router.delete('/:id', (req, res) => {
  models.movie
    .destroy({
      where: { id: req.params.id }
    })
    .then((result) => res.json({ success: true, message: "Movie deleted" }));
});

module.exports = router;
