const API_BASE = "http://localhost:5000/api/employees";
const DEPT_BASE = "http://localhost:5000/api/employees/departments";

app.controller("EmployeeController", function($scope, $http) {
  $scope.page = 1;
  $scope.limit = 10;
  $scope.totalPages = 1;
  $scope.search = "";
  $scope.departments = [];
  $scope.newEmployee = {};
  $scope.editingEmployee = null;

  $scope.getEmployees = function(page) {
    $scope.page = page || 1;
    $http.get(API_BASE, {
      params: {
        page: $scope.page,
        limit: $scope.limit,
        search: $scope.search
      }
    }).then(function(res) {
      $scope.employees = res.data.employees;
      $scope.total = res.data.total;
      $scope.totalPages = res.data.totalPages;
    });
  };

  $scope.getDepartments = function() {
    $http.get(DEPT_BASE).then(function(res) {
      $scope.departments = res.data;
    });
  };

  $scope.addEmployee = function() {
    if (
      !$scope.newEmployee.Name ||
      !$scope.newEmployee.Position ||
      !$scope.newEmployee.Salary ||
      !$scope.newEmployee.DepartmentID
    ) {
      alert("Lengkapi semua data!");
      return;
    }
    $http.post(API_BASE, $scope.newEmployee).then(function() {
      $scope.newEmployee = {};
      $scope.getEmployees($scope.page);
    });
  };

  $scope.startEdit = function(emp) {
    $scope.editingEmployee = angular.copy(emp);
  };

  $scope.updateEmployee = function() {
    var id = $scope.editingEmployee.EmployeeId;
    $http.put(API_BASE + "/" + id, $scope.editingEmployee).then(function() {
      $scope.editingEmployee = null;
      $scope.getEmployees($scope.page);
    });
  };

  $scope.cancelEdit = function() {
    $scope.editingEmployee = null;
  };

  $scope.deleteEmployee = function(id) {
    if (!confirm("Yakin hapus data ini?")) return;
    $http.delete(API_BASE + "/" + id).then(function() {
      $scope.getEmployees($scope.page);
    });
  };

  // Initial Load
  $scope.getDepartments();
  $scope.getEmployees(1);
});