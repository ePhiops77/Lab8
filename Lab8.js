"use strict";

class Employee {
    constructor(FirstName, LastName, salary, expirience) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.salary = salary;
        this.expirience = expirience;
    }

    totalSalary() {
        let salary = this.salary;
        if (this.expirience > 5) {
            salary = this.salary * 1.2 + 500;
        } else if (this.expirience > 2 && this.expirience <= 5) {
            salary += 200;
        }
        return salary;
    }
}

class Developer extends Employee {
    constructor(FirstName, LastName, salary, expirience) {
        super(FirstName, LastName, salary, expirience);
    }
}

class Designer extends Employee {
    constructor(FirstName, LastName, salary, expirience, coef) {
        super(FirstName, LastName, salary, expirience);
        this.coef = coef;
    }

    totalSalary() {
        let salary = super.totalSalary();
        salary *= this.coef;
        return salary;
    }
}

class Manager extends Employee {
    constructor(FirstName, LastName, salary, expirience, team = []) {
        super(FirstName, LastName, salary, expirience);
        this.team = team;
    }

    totalSalary() {
        let salary = super.totalSalary();

        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5 && this.team.length <= 10) {
            salary += 200;
        }

        const Dev = this.team.filter(member => member instanceof Developer).length;
        if (Dev > this.team.length / 2) {
            salary *= 1.1;
        }

        return salary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const allEmployees = [];

        this.managers.forEach(manager => {
            allEmployees.push(manager);
            manager.team.forEach(member => allEmployees.push(member));
        });

        allEmployees.forEach(employee => {
            console.log(`${employee.FirstName} ${employee.LastName} отримав ${employee.totalSalary()} Доларів`);
        });
    }
}

const dev1 = new Developer("Олександр", "Іваненко", 1200, 3);
const designer1 = new Designer("Степан", "Ковальчук", 1350, 2, 0.8);
const designer2 = new Designer("Василь", "Петренко", 1250, 5, 0.1);
const manager1 = new Manager("Данило", "Лисенко", 1700, 8, [dev1, designer1]);
const manager2 = new Manager("Ігор", "Жукович", 2000, 10, [dev1, designer1, designer2]);

const department = new Department([manager1, manager2]);

department.giveSalary();
