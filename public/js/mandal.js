var app = angular.module("app", ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';	
});

app.controller('Ctrl', function($scope, $filter) {
	$scope.user = {
		title: '',
		desc: ''
	};

	$scope.contents = [{
		mandal_col1: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col7: 'seven',
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: '1234',
		mandal_col4: '45',
		mandal_col5: '4',
		mandal_col6: '4',
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col7: 'seven',
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'thissss', // 2-1 goal
		mandal_col5: '2-2', // 2-2 goal
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'second'
	}, {
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col7: 'seven',
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'fgdg',
		mandal_col4: 'fdg',
		mandal_col5: 'cc',
		mandal_col6: 'ww',
		mandal_col7: 'seven',
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: 'fggf',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'fgg',
		mandal_col5: 'five',
		mandal_col6: 'adf',
		mandal_col7: 'xg',
		mandal_col8: 8,
		mandal_col9: 9
	}, {
		mandal_col1: 'oen',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col8: 8,
		mandal_col9: 'sdfs'
	}];
	$scope.contents[1].mandal_col2 = $scope.contents[3].mandal_col4;
	// $scope.contents[1].mandal_col5 = $scope.contents[3].mandal_col5;
});