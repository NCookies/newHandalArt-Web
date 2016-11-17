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
		// index는 0부터 시작하는 세로줄
		// 가로줄의 인덱스는 어떻게 알지?
		// 만다라트의 최종목표 테이블의 중간목표와 세부목표의 중간목표를 같게 바꿈
		if(column == 1) {
			switch (filed) {
				case 1:
//					console.log($scope.contents[column][dd]);
					$scope.contents[3].mandal_col3 = data;
					$scope.contents[1].mandal_col1 = data;
					break;
				case 4:
					$scope.contents[3].mandal_col4 = data;
					$scope.contents[1].mandal_col4 = data;
					break;
				case 7:
					$scope.contents[3].mandal_col5 = data;
					$scope.contents[1].mandal_col7 = data;
					break;
			}
		}
		else if(column == 4) {
			switch (filed) {
				case 1:
					$scope.contents[4].mandal_col3 = data;
					$scope.contents[4].mandal_col1 = data;
					break;
				case 7:
					$scope.contents[4].mandal_col5 = data;
					$scope.contents[4].mandal_col7 = data;
					break;
			}
		}
		else if(column == 7) {
		switch (filed) {
			case 1:
				$scope.contents[5].mandal_col3 = data;
				$scope.contents[7].mandal_col1 = data;
				break;
			case 4:
				$scope.contents[5].mandal_col4 = data;
				$scope.contents[7].mandal_col4 = data;
				break;
			case 7:
				$scope.contents[5].mandal_col5 = data;
				$scope.contents[7].mandal_col7 = data;
				break;
			}
		}
	};
});