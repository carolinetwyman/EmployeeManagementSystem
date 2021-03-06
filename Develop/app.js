
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employeeQ = [
    {
        type: "input",
        name: "name",
        message: "Please enter the name of the employee",
        type: "string"
    },
    {
        type: "input",
        name: "id",
        message: "Please enter the employee's id number",
        type: "string"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the employee's email address",
        type: "string"
    },
    {
        type: "list",
        name: "employeeType",
        message: "What type of employee is this person?",
        choices: [
            "Manager",
            "Intern",
            "Engineer",
        ]
    }
]

const managerQ = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        type: "string"
    }
]

const internQ = [
    {
        type: "input",
        name: "school",
        message: "What school does this student attend?",
        type: "string"
    }
]

const engineerQ = [
    {
        type: "input",
        name: "github",
        message: "please enter this Engineer's GitHub username",
        type: "string"
    }
]

const moreQ = [
    {
        type: "confirm",
        name: "more",
        message: "Are there more employees?",
    }
]

async function askQuestions() {
    try {

        const employees = []

        var moreEmployees = true;

        while (moreEmployees) {

            const answer = await inquirer.prompt(employeeQ);

            switch (answer.employeeType) {
                case "Manager": {
                    const managerA = await inquirer.prompt(managerQ);
                    const newManager = new Manager(answer.name, answer.id, answer.email, managerA.officeNumber);
                    employees.push(newManager);
                    break;
                }
                case "Intern": {
                    const internA = await inquirer.prompt(internQ);
                    const newIntern = new Intern(answer.name,answer.id,answer.email,internA.school);
                    employees.push(newIntern);
                    break;
                }
                case "Engineer": {
                    const engineerA = await inquirer.prompt(engineerQ);
                    const newEngineer = new Engineer(answer.name,answer.id,answer.email,engineerA.github);
                    employees.push(newEngineer);
                    break;
                }
            }

            const moreEmployeesObject = await inquirer.prompt(moreQ);

            moreEmployees = moreEmployeesObject.more;
        }

        return employees;


    }
    catch (err) {
        console.log(err);
    }
}

async function buildHTML() {


    const employees = await askQuestions();

    const outputHTML = await render(employees)

    fs.writeFile("./templates/team.html", outputHTML, function (err) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("HTML Generated");
        }
    });
}

buildHTML();