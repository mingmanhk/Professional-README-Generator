const inquirer = require('inquirer');
const fs = require('fs');
const outputfilename = "readme_output.md"
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const generateMarkdown = require("./utils/generateMarkdown");

// Array of questions to ask the user
const questions = () => {
    return inquirer
        .prompt([
            // Project Title
            {
                type: 'input',
                name: 'projecttitle',
                message: 'What is the name of the project title? (Required)',
                validate: projecttitle => {
                    if (projecttitle) {
                        return true;
                    } else {
                        console.log('Project title is reqaired, try again!');
                        return false;
                    }
                }
            },
            // Description
            {
                type: 'input',
                name: 'description',
                message: 'Please enter description of the project (Required)',
                validate: description => {
                    if (description) {
                        return true;
                    } else {
                        console.log('Project description is reqaired, try again!');
                        return false;
                    }
                }
            },
            // Installation
            {
                type: 'input',
                name: 'installation',
                message: 'How do you install your project? (Optional)',
            },
            // Usage
            {
                type: 'input',
                name: 'usage',
                message: 'Provide instructions and examples for use.? (Required)',
                validate: usage => {
                    if (usage) {
                        return true;
                    } else {
                        console.log('Explaination of usage is reqaired, try again');
                        return false;
                    }
                }
            },
            // Screenshot
            {
                type: 'input',
                name: 'screenshot',
                message: 'Add a screenshot file path? (Optional)',
            },
            // Credits
            {
                type: 'input',
                name: 'credits',
                message: 'List your collaborators? (Required)',
                validate: credits => {
                    if (credits) {
                        return true;
                    } else {
                        console.log('List your collaborators is reqaired, try again');
                        return false;
                    }
                }
            },
            // License
            {
                type: 'checkbox',
                name: 'license',
                message: 'Select a license for your project (Required)',
                choices: ['Apache', 'MIT'],
                validate: license => {
                    if (license && license!="" ) {
                        return true;
                    } else {
                        console.log('Select a license is reqaired, try again');
                        return false;
                    }
                }
            },
            // Features
            {
                type: 'input',
                name: 'features',
                message: 'If your project has a lot of features, list them here.? (Optional)',
            },
            // How to Contribute
            {
                type: 'input',
                name: 'contribute',
                message: 'Would like other developers to contribute it.? (Optional)',
            },
            // Test
            {
                type: 'input',
                name: 'test',
                message: 'Provide examples on how to run.? (Optional)',
            },
            //Contact Methods
            // Github Username
            {
                type: 'input',
                name: 'username',
                message: 'Enter your GitHub Username (Required)',
                validate: username => {
                    if (username) {
                        return true;
                    } else {
                        console.log('Please enter your GitHub username!');
                        return false;
                    }
                }
            },
            // Email Address
            {
                type: 'input',
                name: 'email',
                message: 'Would you like to include your email? (Required)',
                validate: email => {
                    if (email) {
                        return true;
                    } else {
                        console.log('Please enter your email!');
                        return false;
                    }
                }
            }
        ])
}

const generatetablecontent = (answers) => {
    let tablecontent=[];
    if (answers.installation) tablecontent.push("[Installation](#installation)");
    if (answers.usage) tablecontent.push("[Usage](#usage)");
    if (answers.credits) tablecontent.push("[Credits](#credits)");
    if (answers.license) tablecontent.push("[License](#license)");
     if (answers.features) tablecontent.push("[Features](#features)");
    if (answers.contribute) tablecontent.push("[Contribute](#contribute)");
    if (answers.test) tablecontent.push("[Test](#test)");
    if (answers.username && answers.email) tablecontent.push("[Questions](#questions)");
    tablecontent.forEach(function (item, index, array) {
        tablecontent[index] = index + 1 + ". " + item + `
`;
    });
    return tablecontent
}

questions()
    .then(function (answers) {
        // build table of content
        answers.tablecontent = generatetablecontent(answers);
        // create markdown content from user answers then write to file
        return writeFileAsync("README_Output.md",  generateMarkdown(answers));
  })
  .then(function() {
    console.log("README_Output.md has been created!");
  })
  .catch(function(err) {
    console.log(err);
  });