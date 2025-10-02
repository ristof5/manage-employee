create table Employess (
	EmployeeId INT PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(100) NOT NULL,
	Position VARCHAR(50) NOT NULL,
	Salary DECIMAL(12,2) CHECK (Salary > 0),
	CreatedAt DATETIME DEFAULT GETDATE()
);

ALTER TABLE Employees
ADD DepartmentID INT;

ALTER TABLE Employees
ADD CONSTRAINT FK_Employees_Departments
FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID);

CREATE TABLE Departments (
    DepartmentID INT IDENTITY(1,1) PRIMARY KEY,
    DepartmentName VARCHAR(50) NOT NULL
);

INSERT INTO Departments (DepartmentName) VALUES
('HR'),
('IT'),
('Finance'),
('Production');

UPDATE Employees SET DepartmentID = 1 WHERE EmployeeId = 1;
UPDATE Employees SET DepartmentID = 2 WHERE EmployeeId = 2;
UPDATE Employees SET DepartmentID = 3 WHERE EmployeeId = 4;


select * from Employees
select * from Departments