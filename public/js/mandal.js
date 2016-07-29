var app = angular.module("app", ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller('Ctrl', function($scope, $filter) {
  $scope.user = {
    title: '만다라트 이름',
    desc: '해당 만다라트의 세부내용을 입력해주세요.'
  };

  $scope.mandal = [{
    one: 'oen',
    two: 'two',
    three: 'three',
    four: 'four',
    five: 'five',
    six: 'six',
    seven: 'seven',
    eight: 8,
    nine: 9
  },{
    one: "Sally",
    two: 24,
    three: 200,
    four: "djk",
    five: "33ff",
    six: "sdf",
    seven: "39rfj",
    eight: "asdf",
    nine: "dsfs"
  }, {
    one: "John",
    two: 32
  }, {
    one: "Jane",
    two: 40
  }, {
    one: "Sally",
    two: 24,
    three: 200,
    four: "djk",
    five: "33ff",
    six: "sdf",
    seven: "39rfj",
    eight: "asdf",
    nine: "dsfs"
  }, {
    one: "Sally",
    two: 24,
    three: 200,
    four: "djk",
    five: "33ff",
    six: "sdf",
    seven: "39rfj",
    eight: "asdf",
    nine: "dsfs"
  }, {
    one: "Sally",
    two: 24,
    three: 200,
    four: "djk",
    five: "33ff",
    six: "sdf",
    seven: "39rfj",
    eight: "asdf",
    nine: "dsfs"
  }, {
    one: "Sally",
    two: 24,
    three: 200,
    four: "djk",
    five: "33ff",
    six: "sdf",
    seven: "39rfj",
    eight: "asdf",
    nine: "dsfs"
  }, {
    one: "Sally",
    two: 24,
    three: 200,
    four: "djk",
    five: "33ff",
    six: "sdf",
    seven: "39rfj",
    eight: "asdf",
    nine: "dsfs"
  }];
});