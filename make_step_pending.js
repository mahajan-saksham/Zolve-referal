// Script to make the third step (currently showing a checkmark) show number 3 instead
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Find the specific div that was clicked (a completed step with checkmark)
// and change it to not completed with number 3
htmlContent = htmlContent.replace(
  /<div class="status-step completed">[\s\S]*?<div class="step-icon">u2713<\/div>[\s\S]*?<span>First Purchase<\/span>[\s\S]*?<\/div>/g,
  '<div class="status-step">\n                                            <div class="step-icon">3</div>\n                                            <span>First Purchase</span>\n                                        </div>'
);

// Write the updated content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Updated step icon to number 3 (not completed)');
