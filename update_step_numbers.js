// Script to update step icons to use sequential numbers
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Function to replace step icons with numbers in a referral-status div
function replaceIconsWithNumbers(match) {
  let result = match;
  
  // Replace first step icon
  result = result.replace(
    /<div class="status-step [^"]*">\s*<div class="step-icon">[^<]*<\/div>/,
    '<div class="status-step completed">\n                                            <div class="step-icon">1</div>'
  );
  
  // Replace second step icon
  result = result.replace(
    /<div class="status-step [^"]*"[^>]*>\s*<div class="step-icon"[^>]*>[^<]*<\/div>/,
    '<div class="status-step completed">\n                                            <div class="step-icon">2</div>'
  );
  
  // Replace third step icon
  let thirdIconIndex = result.indexOf('<div class="status-step', result.indexOf('<div class="status-step', result.indexOf('<div class="status-step') + 1) + 1);
  if (thirdIconIndex !== -1) {
    let endOfFirstPart = result.substring(0, thirdIconIndex);
    let secondPart = result.substring(thirdIconIndex);
    
    secondPart = secondPart.replace(
      /<div class="status-step [^"]*"[^>]*>\s*<div class="step-icon"[^>]*>[^<]*<\/div>/,
      '<div class="status-step completed">\n                                            <div class="step-icon">3</div>'
    );
    
    result = endOfFirstPart + secondPart;
  }
  
  return result;
}

// Replace all instances of step icons in the file
const referralStatusRegex = /<div class="referral-status"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g;
htmlContent = htmlContent.replace(referralStatusRegex, replaceIconsWithNumbers);

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Updated step icons to numbers');
