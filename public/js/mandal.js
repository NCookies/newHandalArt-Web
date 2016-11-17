var app = angular.module("app", ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';	
});

app.controller('Ctrl', function($scope, $filter) {
	$scope.mandals = {
		title: '',
		desc: ''
	};

	$scope.contents = [{
		mandal_col0: 'oㅇn',
		mandal_col1: 'three',
		mandal_col2: 'four',
		mandal_col3: 'five',
		mandal_col4: 'six',
		mandal_col5: 'seven',
		mandal_col6: 8,
		mandal_col7: 9
	}, {
		mandal_col0: '1234',
		mandal_col3: '1234',
		mandal_col4: '45',
		mandal_col5: '4',
		mandal_col6: '4',
		mandal_col8: 8,
	}, {
		mandal_col0: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col7: 'seven',
		mandal_col8: 8
	}, {
		mandal_col0: 'oen',
		mandal_col1: 'two',
		mandal_col3: 'three',
		mandal_col4: 'thissss', // 2-1 goal
		mandal_col5: '2-sd2', // 2-2 goal
		mandal_col8: 8
	}, {
		mandal_col1: 'oen',
		mandal_col2: 'two',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'gogo' // real goal
	}, {
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col7: 'seven',
		mandal_col8: 8
	}, {
		mandal_col2: 'two',
		mandal_col3: 'fgdg',
		mandal_col4: 'fdg',
		mandal_col5: 'cc',
		mandal_col6: 'ww',
		mandal_col7: 'seven',
		mandal_col8: 8,
	}, {
		mandal_col3: 'three',
		mandal_col4: 'fgg',
		mandal_col5: 'five',
		mandal_col6: 'adf',
		mandal_col7: 'xg',
		mandal_col8: 8,
	}, {
		mandal_col1: 'oen',
		mandal_col3: 'three',
		mandal_col4: 'four',
		mandal_col5: 'five',
		mandal_col6: 'six',
		mandal_col8: 8,
	}];

	$scope.update = function(data, column, filed) {
		// 최종목표 테이블의 중간목표와 세부목표의 중간목표를 같게 바꿈
		var x = column;
		var y = filed;

		x = trans(x);
		y = trans(y);
		y = "mandal_col" + y;
		$scope.contents[x][y] = data;
	};

	function trans(number) {
		// 1->3, 4->4, 5->7 그리고 역순으로 바꿈
		switch (number) {
			case 1: number = 3; break;
			case 3: number = 1; break;
			case 5: number = 7; break;
			case 7: number = 5; break;
		}
		return number;
	}
});