'use strict';

/* ARTISTS (PLURAL) CONTROLLER */

juke.controller('ArtistsCtrl', function ($scope, $log, $state, artists) {

  $scope.$on('viewSwap', function (event, data) {
    if (data.name !== 'allArtists') return $scope.showMe = false;
    $scope.showMe = true;
  });

  $scope.viewOneArtist = function (artist) {
    
    $state.go('artist', { artistId: artist.id });
    // $rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: artist.id });
  };

  $scope.artists = artists;

});

/* ARTIST (SINGULAR) CONTROLLER */
