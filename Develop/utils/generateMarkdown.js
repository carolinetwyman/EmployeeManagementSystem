// function to generate markdown for README
function generateMarkdown(data) {
  return `
  
# ${data.name}

![project image](./imgs/inaction.png)

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Questions](#questions)

## Description
${data.idnumber}

## Installation Instructions
${data.email}

## Usage Information
${data.employeetype}

## License
${data.license}

## Contributors
${data.contributors}

## Questions
Contact me:

Github: [https://github.com/${data.username}](https://github.com/${data.username})
Email: [${data.email}](${data.email})
`;
}

export default generateMarkdown;
