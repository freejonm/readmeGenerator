// packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is your Github username?",
        name: "username",
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title",
    },
    {
        type: "list",
        message: "What license would you like to use?",
        name: "license",
        choices: ["BSD 3-Clause", "GPL v3", "ISC", "MIT", "Unlicense", "None"],
        filter: answer => {
            if (answer === "None") {
                return "";
            }
            return answer;
        }
    },
    {
        type: "input",
        message: "Please describe your project.",
        name: "description",
    },
    {
        type: "input",
        message: "What command should be used to install?",
        name: "installCmd",
    },
    {
        type: "input",
        message: "What command shoudl be used for testing?",
        name: "testCmd",
    },
    {
        type: "input",
        message: "Do you have instructions for usage?",
        name: "usage",
    },
    {
        type: "input",
        message: "Do you have instructions for contributing?",
        name: "contributing",
    },

];



// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        err ? console.log(err) : console.log("File written.")
    });
}

// function to initialize app
function init() {
    const dir = './output';

    // initialize directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    inquirer.prompt(questions).then(answers => {
        writeToFile(dir + "/README.md", generateMarkdown(answers));
    });
}

// function call to initialize app
init();
