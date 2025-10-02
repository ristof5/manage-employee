app.controller("EmployeeController", function($scope, $http) {
  const apiUrl = "http://localhost:5000/api/employees";

  $scope.employees = [];
  $scope.newEmployee = {};

  // Ambil semua employee
  $scope.loadEmployees = function() {
    $http.get(apiUrl).then(function(response) {
      $scope.employees = response.data;
    }, function(error) {
      console.error("Error fetching employees:", error);
    });
  };

  // Tambah employee
  $scope.addEmployee = function() {
    $http.post(apiUrl, $scope.newEmployee).then(function(response) {
      $scope.newEmployee = {};
      $scope.loadEmployees();
    }, function(error) {
      console.error("Error adding employee:", error);
    });
  };

  // Hapus employee
  $scope.deleteEmployee = function(id) {
    $http.delete(apiUrl + "/" + id).then(function(response) {
      $scope.loadEmployees();
    }, function(error) {
      console.error("Error deleting employee:", error);
    });
  };

  // Edit employee (bisa dibuat form update terpisah)
  $scope.editEmployee = function(emp) {
    const updated = {
      Name: prompt("Enter new name:", emp.Name),
      Position: prompt("Enter new position:", emp.Position),
      Salary: prompt("Enter new salary:", emp.Salary)
    };
    $http.put(apiUrl + "/" + emp.EmployeeId, updated).then(function(response) {
      $scope.loadEmployees();
    }, function(error) {
      console.error("Error updating employee:", error);
    });
  };

  // Load data pertama kali
  $scope.loadEmployees();
});
