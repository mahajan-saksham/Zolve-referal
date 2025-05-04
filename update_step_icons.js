// Script to make completed steps show checkmarks and pending steps show numbers
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Function to process a single referral row
function processRow(rowHtml) {
  // First extract all the steps
  const stepRegex = /<div class="status-step[^"]*">[\s\S]*?<\/div>\s*<\/div>/g;
  const steps = [];
  let match;
  while ((match = stepRegex.exec(rowHtml)) !== null) {
    steps.push(match[0]);
  }
  
  if (steps.length === 3) {
    // Process each step
    for (let i = 0; i < steps.length; i++) {
      const stepNumber = i + 1;
      const isCompleted = steps[i].includes('class="status-step completed"');
      
      // Create replacement with either checkmark or number
      let replacement;
      if (isCompleted) {
        replacement = steps[i].replace(/<div class="step-icon">[^<]*<\/div>/, `<div class="step-icon">✓</div>`);
      } else {
        replacement = steps[i].replace(/<div class="step-icon">[^<]*<\/div>/, `<div class="step-icon">${stepNumber}</div>`);
      }
      
      // Replace in the row HTML
      rowHtml = rowHtml.replace(steps[i], replacement);
    }
  }
  
  return rowHtml;
}

// Process each referral row
const rowRegex = /<div class="referral-row"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
let processedHtml = htmlContent;
let rowMatch;

while ((rowMatch = rowRegex.exec(htmlContent)) !== null) {
  const originalRow = rowMatch[0];
  const processedRow = processRow(originalRow);
  processedHtml = processedHtml.replace(originalRow, processedRow);
}

// Write the updated content back to the file
fs.writeFileSync(indexHtmlPath, processedHtml);

console.log('Updated step icons: checkmarks for completed steps, numbers for pending steps');
