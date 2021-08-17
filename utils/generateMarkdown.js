// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}


// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  //add Project name + Description + Table of content
  let readme_output = `# ${data.projecttitle}
## Description
${data.description}
## Table of Contents`;
  
  // Generate table of content mark down
  for (let i = 0; i < data.tablecontent.length; i++) {
    readme_output = readme_output + `
${data.tablecontent[i]}`;
  }

  // Installation (Optional)
  if (data.installation) readme_output = readme_output + `
## Installation
${data.installation}`;
  
  readme_output = readme_output + `
## Usage
${data.usage}
`;
  // Screenshot (Optional)
  if (data.screenshot) readme_output = readme_output + `
## Screenshot
${data.screenshot}`;

  //add license
  readme_output = readme_output + `
## Credits
${data.credits}
## License
[![license](https://img.shields.io/badge/license-${data.license}-blue)](https://shields.io)`


  // Features (Optional)
  if (data.features) readme_output = readme_output + `
## Features
${data.features}`;
  // Contribute (Optional)
  if (data.contribute) readme_output = readme_output + `
## Contribute
${data.contribute}`;
  // Test (Optional)
  if (data.test) readme_output = readme_output + `
## Test
${data.test}`;

  //add questions
  readme_output = readme_output + `
## Questions
Questions about this repository? Please contact me at [${data.email}](mailto:${data.email}).
View more of my work in GitHub at [${data.username}](https://github.com/${data.username})`;

  return readme_output;
}

module.exports = generateMarkdown;
