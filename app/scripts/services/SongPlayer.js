(function() {
  function SongPlayer() {
    /*
    * @desc empty SongPlayer object
    * @type {Object} Song Player
    */
    var SongPlayer = {};
    /*
    * @desc selected song
    * @type {Object} currentSong
    */
    var currentSong = null;
   /*
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /*
    * @desc SongPlayer object
    * @function playSong
    */
     var playSong = function (song){
       currentBuzzObject.play();
       song.playing = true;
     }

    /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    }
    /*
     * @desc method to play a selected song
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      if (currentSong !== song){
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
          }
        }
    };

    /*
     * @desc method that pauses selected songs
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }
    return SongPlayer;
  }


  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
