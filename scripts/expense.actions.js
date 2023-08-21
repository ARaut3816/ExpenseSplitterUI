expenseManagementApp.factory('expenseManagementService',function($q, $http, $filter) {
	return {
		getAllUsers: function() {
			return $http.get('http://localhost:8080/users');
		},
		
		getAllExpenses: function() {
			return $http.get('http://localhost:8080/allExpenses');
		},
		
		getUserwiseContri: function() {
			return $http.get('http://localhost:8080/usercontri');
		},
		
		getUserwiseBalance: function() {
			return $http.get('http://localhost:8080/balance');
		},
		
		addExpense: function(expense) {
			return $http.post('http://localhost:8080/addExpense',expense);
		},

		getUserBalance: function(userId) {
			return $http.get('http://localhost:8080/balance/'+userId);
		}
	}	
});
