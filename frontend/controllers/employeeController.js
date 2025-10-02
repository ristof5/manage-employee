app.controller("EmployeeController", function($scope, $http) {
  const apiUrl = "http://localhost:5000/api/employees";

  $scope.employees = [];
  $scope.newEmployee = { Name: "", Position: "", Salary: "" };
  $scope.editingEmployee = null; // untuk menyimpan employee yang sedang di-edit

  // Ambil semua employee
  $scope.loadEmployees = function() {
    $http.get(apiUrl).then(
      function(response) {
        $scope.employees = response.data;
      },
      function(error) {
        console.error("Error fetching employees:", error);
      }
    );
  };

  // Tambah employee
  $scope.addEmployee = function() {
    if (!$scope.newEmployee.Name || !$scope.newEmployee.Position || !$scope.newEmployee.Salary) {
      alert("Semua field wajib diisi!");
      return;
    }

    $http.post(apiUrl, $scope.newEmployee).then(
      function() {
        $scope.newEmployee = { Name: "", Position: "", Salary: "" };
        $scope.loadEmployees();
      },
      function(error) {
        console.error("Error adding employee:", error);
      }
    );
  };

  // Hapus employee
  $scope.deleteEmployee = function(id) {
    if (confirm("Yakin ingin menghapus data ini?")) {
      $http.delete(apiUrl + "/" + id).then(
        function() {
          $scope.loadEmployees();
        },
        function(error) {
          console.error("Error deleting employee:", error);
        }
      );
    }
  };

  // Masuk ke mode edit
  $scope.startEdit = function(emp) {
    $scope.editingEmployee = angular.copy(emp); // duplikat data biar aman
  };

  // Simpan hasil edit
  $scope.updateEmployee = function() {
    if (!$scope.editingEmployee) return;

    $http.put(apiUrl + "/" + $scope.editingEmployee.EmployeeId, $scope.editingEmployee).then(
      function() {
        $scope.editingEmployee = null;
        $scope.loadEmployees();
      },
      function(error) {
        console.error("Error updating employee:", error);
      }
    );
  };

  // Batalkan edit
  $scope.cancelEdit = function() {
    $scope.editingEmployee = null;
  };

  // Load data pertama kali
  $scope.loadEmployees();
});
