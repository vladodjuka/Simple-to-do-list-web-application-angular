
app.controller("MainController", ["$scope", "$http", function($scope, $http){
	
	$scope.tasks=[];
	$scope.inputTaskName="";


	$scope.addTask = function(name){
		if(name.trim()==""){
			return;
		}
		newTaskObject = {
			name: name,
			completed: false,
			show: true
		}

		$scope.tasks.push(newTaskObject);

		$scope.inputTaskName = "";
	}

	$scope.toggleCompleted = function(index){
		$scope.tasks[index].completed = !$scope.tasks[index].completed; 
	}



	$scope.setTasksContainerVisibility = function(){
		if($scope.tasks.length>0){
			return true;
		}
		else{
			return false;
		}
	}

	$scope.showNotCompletedTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			if($scope.tasks[key].completed){
				$scope.tasks[key].show = false;
			}
			else{
				$scope.tasks[key].show = true;          }
			})
	}

	$scope.showCompletedTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			if($scope.tasks[key].completed){
				$scope.tasks[key].show = true;
			}
			else{
				$scope.tasks[key].show = false;
			}
		})
	}

	$scope.showAllTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			$scope.tasks[key].show = true;
		})
	}

	$scope.deleteTask = function(index){
		$scope.tasks.splice(index,1);
	}

	$scope.deleteCompleted = function(){
		$scope.notCompletedTasks=[];
		angular.forEach($scope.tasks, function(task , key) {
			if(!task.completed){
				$scope.notCompletedTasks.push(task);
			}
		})
		$scope.tasks = $scope.notCompletedTasks;
	}

	$scope.deleteAll = function(){
		$scope.tasks = [];
	}

}]);