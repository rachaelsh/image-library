let express = require('express');
let router = express.Router();
let Gif = require('../models/gif');


router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/gifs')
  .post(function(req, res, next){

    let gif = new Gif();
    gif.name = req.body.name;
    gif.url = req.body.url;
    gif.description = req.body.description;
    gif.owner = req.body.owner;

    gif.save(function(err, gif, next){
      if(err){
        return next(err);
      } else {
        res.json(gif);
      }
    });
  })
  .get(function(req, res, next){
    // CHANGE TO POPULATE BY the user id, instead of name
    Gif.find().populate('owner').exec(function(err, gifs) {
      if(err){
        return next(err);
      } else {
        res.json(gifs);
      }
    });
  });
router.route('/gifs:id')
  .delete(function(req, res, next){
    Gif.remove({_id: req.params.id}, function(err, gif){
      if(err){
        return next(err);
      } else {
        res.json({title: 'gif was successfully deleted!'});
      }
    });
  });


module.exports = router;
