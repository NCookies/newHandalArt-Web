var app = angular.module("app", []);

app.controller("Ctrl",

function Ctrl($scope) {
    $scope.title = "만다라트 이름";
    $scope.description = "세부 설명";
    $scope.model = {
        contents: [{
            id: 1,
            one: "Ben",
            two: 28,
            three: 200,
            four: "djk",
            five: "33ff",
            six: "sdf",
            seven: "39rfj",
            eight: "asdf",
            nine: "dsfs"
        }, {
            id: 2,
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
            id: 3,
            one: "John",
            two: 32
        }, {
            id: 4,
            one: "Jane",
            two: 40
        }, {
            id: 5,
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
            id: 6,
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
            id: 7,
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
            id: 8,
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
            id: 9,
            one: "Sally",
            two: 24,
            three: 200,
            four: "djk",
            five: "33ff",
            six: "sdf",
            seven: "39rfj",
            eight: "asdf",
            nine: "dsfs"
        }],
        selected: {}
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (content) {
        // 전달받은 아이디와 같은 아이디만 수정, 아니면 보여주기
        if (content.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };

    $scope.editContent = function (content) {
        // 임시로 선택된 모델의 내용을 저장
        $scope.model.selected = angular.copy(content);
    };

    $scope.saveContent = function (idx) {
        console.log("Saving content");
        $scope.model.contents[idx] = angular.copy($scope.model.selected);
        $scope.reset();
    };

    $scope.reset = function () {
        // 선택된 모델을 리셋
        $scope.model.selected = {};
    };
});