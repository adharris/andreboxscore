var colors = {
      "Arizona Diamondbacks" :    ["A71930", "000000", "DBCEAC", "FFFFFF"],
      "Atlanta Braves" :          ["002F5F", "B71234", "FFFFFF"],
      "Baltimore Orioles" :       ["FB4F14", "000000", "FFFFFF"],
      "Boston Red Sox" :          ["C60C30", "002244", "FFFFFF"],
      "Chicago Cubs" :            ["003279", "CC0033", "FFFFFF"],
      "Chicago White Sox" :       ["000000", "C0C0C0", "FFFFFF"],
      "Cincinnati Reds" :         ["C6011F", "FFFFFF", "000000"],
      "Colorado Rockies" :        ["000000", "333366", "C0C0C0", "FFFFFF"],
      "Cleveland Indians" :       ["003366", "C80810", "FFFFFF"],
      "Detroit Tigers" :          ["001742", "FFFFFF", "DE4406"],
      "Houston Astros" :          ["072854", "FF7F00", "FFFFFF"],
      "Kansas City Royals" :      ["15317E", "74B4FA", "FFFFFF"],
      "LA Angels of Anaheim" :    ["B71234", "002244", "FFFFFF"],
      "LA Dodgers" :              ["083C6B", "FFFFFF"],
      "Miami Marlins" :           ["000000", "F9423A", "8A8D8F", "0077C8", "FFD100", "FFFFFF"],
      "Milwaukee Brewers" :       ["182B49", "92754C", "FFFFFF"],
      "Minnesota Twins" :         ["072754", "C6011F", "FFFFFF"],
      "New York Mets" :           ["002C77", "FB4F14", "FFFFFF"],
      "New York Yankees" :        ["1C2841", "FFFFFF", "808080"],
      "Oakland Athletics" :       ["003831", "FFD800", "FFFFFF"],
      "Philadelphia Phillies" :   ["BA0C2F", "FFFFFF", "003087"],
      "Pittsburgh Pirates" :      ["000000", "FFBF00", "FFFFFF"],
      "San Diego Padres" :        ["002147", "FFFFFF", "B4A76C"],
      "San Francisco Giants" :    ["000000", "F2552C", "FFFDD0"],
      "Seattle Mariners" :        ["0C2C56", "005C5C", "C0C0C0", "FFFFFF"],
      "St Louis Cardinals" :      ["c41e3a", "0A2252", "FFFFFF"],
      "Tampa Bay Rays" :          ["00285D", "9ECEEE", "FFFFFF", "ffd700"],
      "Texas Rangers" :           ["BD1021", "FFFFFF", "003279"],
      "Toronto Blue Jays" :       ["003DA5", "041E42", "FFFFFF", "DA291C"],
      "Washington Nationals" :    ["BA122B", "11225B", "FFFFFF" ]
};

angular.module("app", [])

.controller("ScoreController", function($scope, $http) {
  console.log("booted");
  $scope.games =  "test";
  $scope.colors = colors;
  $http.get("games.json").then(function(response) {
    $scope.games = response.data.games;
    $scope.wins = 0;
    $scope.losses = 0;
    for (var i = 0; i < response.data.games.length; i++) {
      if (response.data.games[i].outcome) $scope.wins++;
      else $scope.losses++;
    } 
  });
})

.directive("team", function() {
  return {
    restrict: 'E',
    replace: true,
    template: "<span class='team' ng-style='{color: color }'>{{ team }}</span>",
    scope: {team: "="},
    link: function(scope, element, attrs) {
      scope.$watch("team", function(team) {
        if (colors[team]) {
          scope.color = "#" + colors[team][0];
        }
      });
    }
  };
});