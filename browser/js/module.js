'use strict';

var juke = angular.module('juke', ['ui.router']);

juke.config(function ($stateProvider) {
  $stateProvider.state('albumList', {
    url: '/albums/',
    templateUrl: '/albumList.html',
    resolve: {
    	albums: function(AlbumFactory){
    		return AlbumFactory.fetchAll();
    	}
    },
    controller: 'AlbumsCtrl'
    });
});



juke.config(function($stateProvider){
	$stateProvider.state('album', {
		url: '/albums/:albumId',
		templateUrl: '/album.html',
		resolve: {
			album: function(AlbumFactory, $stateParams){
				var albumId = $stateParams.albumId;
		    	return AlbumFactory.fetchById(albumId);	
			}
		},
		controller: function($scope, $log, PlayerFactory, album){
			$scope.album = album;
			// main toggle
		  $scope.toggle = function (song) {
		    if (song !== PlayerFactory.getCurrentSong()) {
		      PlayerFactory.start(song, $scope.album.songs);
		    } else if ( PlayerFactory.isPlaying() ) {
		      PlayerFactory.pause();
		    } else {
		      PlayerFactory.resume();
		    }
		  };

		  $scope.getCurrentSong = function () {
		    return PlayerFactory.getCurrentSong();
		  };

		  $scope.isPlaying = function (song) {
		    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
		  };

		}
	});
});

juke.config(function($stateProvider){
	$stateProvider.state('artistList', {
		url: '/artists',
		templateUrl: '/artistList.html',
		resolve: {
			artists: function(ArtistFactory){
				return ArtistFactory.fetchAll();
			}
		},
		controller: 'ArtistsCtrl'
	});
});

juke.config(function($stateProvider){
	$stateProvider
	.state('artist', {
		url: '/artists/:artistId',
		templateUrl: '/artist.html',
		resolve: {
			artist: function(ArtistFactory, $stateParams){
				var artistId = $stateParams.artistId;
				return ArtistFactory.fetchById(artistId);
			}
		},
		controller: function($scope, $log, PlayerFactory, artist){
		    $scope.artist = artist;
		    $scope.getCurrentSong = function () {
			    return PlayerFactory.getCurrentSong();
			};

			$scope.isPlaying = function (song) {
			   return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
			};

			$scope.toggle = function (song) {
			    if (song !== PlayerFactory.getCurrentSong()) {
			      PlayerFactory.start(song, $scope.artist.songs);
			    } else if ( PlayerFactory.isPlaying() ) {
			      PlayerFactory.pause();
			    } else {
			      PlayerFactory.resume();
			    }
			};

		}
	})
	.state('artist.albums', {
		url: '/artists/:artistId/albums',
		templateUrl:'/artistAlbums.html',
		resolve: {
			artist_albums: function(ArtistFactory, $stateParams){
				var artistId = $stateParams.artistId;
				return ArtistFactory.fetchById(artistId);
			}
		},
		controller: function(artist_albums, $scope){
			$scope.artist = artist_albums;
		}
	})
	.state('artist.songs', {
		url: '/artists/:artistId/songs',
		templateUrl: '/artistSongs.html',
		resolve: {
			artist_songs: function(ArtistFactory, $stateParams){
				var artistId = $stateParams.artistId;
				return ArtistFactory.fetchById(artistId);
			}
		},
		controller: function(artist_songs, $log, $scope){
				$scope.artist = artist_songs;
		}
	});
});



 
