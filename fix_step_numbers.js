// Script to fix step numbers to be 1-2-3 in sequence
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Update the specific numbers in the first referral row
const firstReferralRegex = /<div class="referral-row">[\s\S]*?<div class="referral-status">[\s\S]*?<\/div>[\s\S]*?<\/div>/;
const firstReferral = htmlContent.match(firstReferralRegex)[0];

// Create the updated version with steps 1-2-3
let updatedReferral = firstReferral
  .replace(/<div class="step-icon">\d+<\/div>/g, (match, index) => {
    // Based on the position in the string, assign the correct step number
    if (index === firstReferral.indexOf('<div class="step-icon">')) {
      return '<div class="step-icon">1</div>';
    } else if (index === firstReferral.indexOf('<div class="step-icon">', index + 1)) {
      return '<div class="step-icon">2</div>';
    } else {
      return '<div class="step-icon">3</div>';
    }
  });

// Replace the first referral in the HTML content
htmlContent = htmlContent.replace(firstReferralRegex, updatedReferral);

// Do the same for the second referral
const secondReferralStart = htmlContent.indexOf('<div class="referral-row">', htmlContent.indexOf('<div class="referral-row">') + 1);
if (secondReferralStart !== -1) {
  const secondReferralEnd = htmlContent.indexOf('</div>', htmlContent.indexOf('</div>', htmlContent.indexOf('</div>', secondReferralStart) + 1) + 1) + 6;
  const secondReferral = htmlContent.substring(secondReferralStart, secondReferralEnd);
  
  // Create updated version with steps 1-2-3
  let updatedSecondReferral = secondReferral.replace(/<div class="step-icon">[^<]*<\/div>/g, (match, index) => {
    if (index === secondReferral.indexOf('<div class="step-icon">')) {
      return '<div class="step-icon">1</div>';
    } else if (index === secondReferral.indexOf('<div class="step-icon">', index + 1)) {
      return '<div class="step-icon">2</div>';
    } else {
      return '<div class="step-icon">3</div>';
    }
  });
  
  // Replace the second referral in the HTML content
  htmlContent = htmlContent.replace(secondReferral, updatedSecondReferral);
}

// A more straightforward approach to ensure all are updated
htmlContent = htmlContent.replace(/(<div class="status-steps">[\s\S]*?)(<div class="step-icon">)[^<]*(<\/div>[\s\S]*?)(<div class="step-icon">)[^<]*(<\/div>[\s\S]*?)(<div class="step-icon">)[^<]*(<\/div>)/g, 
  '$1$21$3$42$5$63$7');

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Fixed step numbers to 1-2-3 sequence');
