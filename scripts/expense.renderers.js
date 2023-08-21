var expenseManagementApp = angular.module('expenseManagementApp', []);

expenseManagementApp.controller('expenseManagementController', function($scope, $q, $http, expenseManagementService) {
	var vm = this;
	var gs = $scope;
	this.show = false;
	this.payer = 9999;
	this.contributers = "";
	this.users = [];
	this.userIdVsName = {};
	this.expenses = [];
	this.userwiseContriList = [];
	this.showAllExpenses = false;
	this.userIdVsBalance = {};
	this.contributer = 1;
	this.occassion = "";
	this.amount = 0.0;
	this.maxExpenseId = 0;
	this.expenseAddSuccess = false;
	this.expenseAddFailure = false;
	this.payerUserIdNotValid = false;
	this.totalExpenceNotValid = false;
	this.reasonNotValid = false;
	this.contributersUserIdsNotValid = false;
	this.userIdToCheckBal = 9999;
	this.showUserBalance = false;
	this.userBalance = 0;
	
	
	this.showButton = function(){
		console.log("Button clicked." + vm.payer + " - " + vm.contributers);
	}

	this.getAllUsers = function(){
		expenseManagementService.getAllUsers().then(function(response){
			vm.users= response.data;
			vm.userIdVsName = {};
			vm.users.forEach(function(user){
				vm.userIdVsName[user.userId] = user.userName;
			})
		});
	}
	
	this.getAllExpenses = function(){
		expenseManagementService.getAllExpenses().then(function(response){
			vm.expenses = response.data;
			vm.expenses.forEach(function(expense){
				if (vm.maxExpenseId < expense.expenceRecordId)
				vm.maxExpenseId = expense.expenceRecordId;
			});
		});
	}
	
	this.getUserwiseContri = function(){
		expenseManagementService.getUserwiseContri().then(function(response){
			vm.userwiseContriList = response.data;
		});
	}
	
	this.getUserwiseBalance = function(){
		expenseManagementService.getUserwiseBalance().then(function(response){
			vm.userIdVsBalance = response.data;
		});
	}
	
	this.addExpense = function(){
		var expense = {}
		vm.maxExpenseId++;
		expense.expenceRecordId = vm.maxExpenseId;
		expense.payerUserId = vm.payer;
		if (vm.payer == '9999'){
			alert('Please enter payer.');
			return;
		}
		expense.contributersUserIds = getSelectValues('contributer');
		if (expense.contributersUserIds == ''){
			alert('Please enter Contributers.');
			return;
		}
		expense.reason = vm.occassion;
		if (vm.occassion == undefined || vm.occassion == ''){
			alert('Please enter Occassion.');
			return;
		}
		expense.totalExpence = vm.amount;
		if (vm.amount <= 0 ){
			alert('Please enter valid Amount.');
			return;
		}
		expenseManagementService.addExpense(expense).then(function(response){
			vm.userIdVsBalance = response.data;
			vm.expenseAddSuccess = true;
			vm.payerUserIdNotValid = false;
			vm.totalExpenceNotValid = false;
			vm.reasonNotValid = false;
			vm.contributersUserIdsNotValid = false;
		}).error(function(response){
			vm.expenseAddFailure = true;
		});
	}
	
	this.clearFields = function (){
		this.contributer = 1;
		this.occassion = "";
		this.amount = 0.0;
	}

	this.getUserBalance = function (){
		expenseManagementService.getUserBalance(vm.userIdToCheckBal).then(function(response){
			vm.userBalance = response.data;
		});
	}

	this.getAllUsers();
	this.getUserwiseContri();
	this.getUserwiseBalance();
	this.getAllExpenses();
	this.getUserwiseContri()
});

function getSelectValues(select) {
  var result = '';
  var options = document.getElementById(select).options;
  var opt;

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected) {
      result = result + opt.value+",";
    }
  }
  if (result != '')
  	result = result.substring(0,result.length-1);
  return result;
}
