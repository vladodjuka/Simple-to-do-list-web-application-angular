
app.controller("MainController", ["$scope", "$http","$cookieStore", function($scope, $http, $cookieStore){
	
	$scope.tasks=[];
	$scope.inputTaskName="";
	$scope.visibilityTasksContainer = false;


	window.onload = function(){
		$scope.cookie = $cookieStore.get('tasks');
		if($scope.cookie){
			$scope.tasks = JSON.parse($scope.cookie);
		}
		$scope.setTasksContainerVisibility();
	}

	window.onbeforeunload = function () {
		var data = JSON.stringify($scope.tasks);
		$scope.saveAsCookie(data);	
	}



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

		$scope.setTasksContainerVisibility();
	}

	$scope.toggleCompleted = function(index){
		$scope.tasks[index].completed = !$scope.tasks[index].completed; 
	}



	$scope.setTasksContainerVisibility = function(){
		console.log($scope.tasks.length);
		if($scope.tasks.length>0){
			$scope.visibilityTasksContainer = true;
		}
		else{
			$scope.visibilityTasksContainer = false;
		}

		$scope.$apply();
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

	$scope.saveAsCookie = function(tasksJson){
		$cookieStore.put('tasks', tasksJson)
	}


}]);