(function() {
  function SongPlayer(Fixtures) {

    /**
    * @desc empty SongPlayer object
    * @type {Object} Song Player
    */
    var SongPlayer = {};

    /**
    * @desc current album object
    * @type {object} currentAlbum
    */
    var currentAlbum = Fixtures.getAlbum();

   /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
       if (currentBuzzObject) {
         stopSong();
       }

     currentBuzzObject = new buzz.sound(song.audioUrl, {
       formats: ['mp3'],
       preload: true
     });

     SongPlayer.currentSong = song;
    };

    /**
    * @desc SongPlayer object
    * @function playSong
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

     /**
     * @function stopSong
     * @desc private function that will stop the current Buzz object.
     */
     var stopSong = function() {
       currentBuzzObject.stop();
       SongPlayer.currentSong.playing = null;
     }

    /**
    * @function getSongIndex
    * @desc gets the index of a song in the album
    * @param {Object} song
    */
     var getSongIndex = function(song) {
       return currentAlbum.songs.indexOf(song);
     };
    /**
    * @desc selected song
    * @type {Object} currentSong
    */
    SongPlayer.currentSong = null;
    /**
     * @desc method to play a selected song
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
    };

    /**
     * @desc method that pauses selected songs
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function previous
     * @desc plays the previous song in the album
     */
     SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;

       if (currentSongIndex < 0) {
         stopSong();
       } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
       }
     };

    /**
     * @function next
     * @desc plays the next song in the albumData
     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex ++;

      if (currentSongIndex > currentAlbum.songs.length) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
