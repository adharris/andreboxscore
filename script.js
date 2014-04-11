function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function shadow(color, alpha) {
  color = hexToRgb(color);
  var rbga = "rgba(" + color.r + "," + color.g + "," + color.b + "," + alpha + ")";

  return "-1px -1px 0 " + rbga + ", " +
    "0px -1px 0 " + rbga + ", " +
    "1px -1px 0 " + rbga + ", " +
    "-1px 1px 0 " + rbga + ", " +
    "0px 1px 0 " + rbga + ", " +
    "1px 1px 0 " + rbga;
}


angular.module("app", [])

.factory("GameData", function($http) {
  return $http.get("games.json").then(function(response) {
    var game_map = {};
    var count = 0;
    for (var i = 0; i < response.data.games.length; i++) {
      count++;
      response.data.games[i].staff = [];
      game_map[response.data.games[i].date] = response.data.games[i];
    }

    for (var staff_name in response.data.staff) {
      for (i = 0; i < response.data.staff[staff_name].length; i++) {
        game_map[response.data.staff[staff_name][i]].staff.push(staff_name);
      }
    }

    response.data.game_map = game_map;
    response.data.count = count;
    return response.data;
  });
})

.controller("ScoreController", function($scope, GameData) {
  GameData.then(function(data) {
    $scope.games = data.games;
    $scope.staff = data.staff;
    $scope.teams = data.teams;
    $scope.wins   = 0;
    $scope.losses = 0;
    for (var i = 0; i < data.games.length; i++) {
      if (data.games[i].outcome) $scope.wins++;
      else $scope.losses++;
    } 
  });
})

.directive("team", function(GameData) {
  return {
    restrict: 'E',
    replace: true,
    template: "<span class='team' ng-style='styles'>{{ team }}</span>",
    scope: {team: "="},
    link: function(scope, element, attrs) {
      scope.styles = {};
      GameData.then(function(data) {
        scope.$watch("team", function(team) {
          if (data.teams[team]) {
            scope.styles.color = "#" + data.teams[team][0];
            scope.styles['text-shadow'] = shadow(data.teams[team][1], ".5");
            console.log(scope.styles['text-shadow']);
          }
        });
      });
    }
  };
})


.directive("staffScore", function(GameData) {
  return {
    restrict: 'E',
    replace: true,
    template: "<div class='score'><span>{{ wins }}</span> - <span>{{ losses }}</span><div>",
    scope: {staff: "="},
    link: function(scope) {
      scope.wins = scope.losses = 0;
      GameData.then(function(data) {
        for (var i = 0; i < data.staff[scope.staff].length; i++) {
          if (data.game_map[data.staff[scope.staff][i]].outcome) scope.wins++;
          else scope.losses++;
        }
      });
    }
  };
})

;