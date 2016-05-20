'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */

/* ALBUMS (PLURAL) CONTROLLER */

juke.controller('AlbumsCtrl', function ($scope, $log, $state, albums) {

  $scope.showMe = true;

  $scope.$on('viewSwap', function (event, data) {
    $scope.showMe = (data.name === 'allAlbums');
  });

  $scope.viewOneAlbum = function (album) {
    $state.go('album', { name: album.name, id: album.id })
  };

  $scope.albums = albums;

});
