class Student {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    describe() {
        return `${this.name} is in year ${this.year}.`;
    }
}

class House {
    constructor(name) {
        this.name = name;
        this.students = [];
    }

    addStudent(student) {
        if (student instanceof Student) {
            this.students.push(student);
        } else {
            throw new Error(`You can only add an instance of Student. Argument is not a student: ${student}`);
        }
    }

   describe() {
    return `${this.name} has ${this.students.length} students.`;
   }
}

class Menu {
    constructor() {
        this.houses = [];
        this.selectedHouse = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
               case '1':
                this.createHouse();
                break;
               case '2':
                this.viewHouse();
                break;
               case '3':
                this.deleteHouse();
                break;
               case '4':
                this.displayHouses();
                break;
               default:
                selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        
        alert('Goodbye! Have a lovely day!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New House
        2) View House
        3) Delete House
        4) Display ALL Houses
        `);
    }

    showHouseMenuOptions(houseInfo) {
        return prompt(`
        0) Back
        1) Create Student
        2) Delete Student
        ----------------------
        ${houseInfo}
      `);
    }

    displayHouses() {
        let houseString = '';
        for (let i = 0; i < this.houses.length; i++) {
          houseString += i + ') ' + this.houses[i].name + '\n';
        }
        alert(houseString);
    }

    createHouse() {
        let name = prompt('Enter name for new house:');
        this.houses.push(new House(name));
    }

    viewHouse() {
        let index = prompt('Enter the index of the house you wish to view:');
        if (index > -1 && index < this.houses.length) {
            this.selectedHouse = this.houses[index];
            let description = 'House Name: ' + this.selectedHouse.name + '\n';
            
            for (let i = 0; i < this.selectedHouse.students.length; i++) {
                description += i + ') ' + this.selectedHouse.students[i].name 
                + ' - ' + this.selectedHouse.students[i].year + '\n';

            }

            let selection = this.showHouseMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createStudent();
                    break;
                case '2':
                    this.deleteStudent();
            }
        }
    }

    deleteHouse() {
        let index = prompt('Enter the index of the house you wish to delete:');
        if (index > -1 && index  < this.houses.length) {
            this.houses.splice(index, 1);
        }
    }

    createStudent() {
        let name = prompt('Enter name for new student:');
        let year = prompt('Enter the year of the new student:');
        this.selectedHouse.students.push(new Student(name, year));
    }

    deleteStudent() {
        let index = prompt('Enter the index of the student you wish to delete:');
        if (index > -1 && index < this.selectedHouse.students.length) {
            this.selectedHouse.students.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();