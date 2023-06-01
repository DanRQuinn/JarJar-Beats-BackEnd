'use strict'
const playlistModule = {};

const PlaylistSuperModel = require('../models/playlistModel');

const verifyUser = require('./auth');

// This exports multiple functions at once.
playlistModule.getPlaylist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      let params = {};
      if (req.query.email) {
        params.email = req.query.email
      }
      try {
        // This talks to your database
        // This is referencing your model
        let results = await PlaylistSuperModel.find(params);
        res.status(200).send(results);
      } catch (err) {
        next(err)
      }
    }
  });
};

playlistModule.postPlaylist = async (req, res, next) => {
  // verifyUser(req, async (err, user) => {
  //   if (err) {
  //     console.error(err);
  //     res.send('invalid token');
  //   } else {
      try {
        let createdPlaylist = await PlaylistSuperModel.create(req.body);
        res.status(200).send(createdPlaylist);
      } catch (err) {
        next(err);
      }
  //   }
  // });
};

playlistModule.deletePlaylist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let id = req.params.id;
        //   How are we specifying for individual songs? By ID?
        await PlaylistSuperModel.findByIdAndDelete(id);
        res.status(200).send('Playlsit Deleted');
        await Playlist.findByIdAndDelete(id);
        res.status(200).send('Playlist Deleted');
      } catch (err) {
        next(err);
      }
    }
  });
}

playlistModule.putPlaylist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let id = req.params.id;
        //   How are we specifying for individual songs? By ID?
        await PlaylistSuperModel.findByIdAndDelete(id);
        res.status(200).send('Playlist Deleted');
      } catch (err) {
        next(err);
      }
    }
  });
}

module.exports = playlistModule;
