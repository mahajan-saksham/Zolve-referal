// Script to update the stepper HTML structure
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Update the 'in-progress' step icon for the second status row (Card Pending)
htmlContent = htmlContent.replace(
  /<div class="status-step">(\s*)<div class="step-icon">\u25cb<\/div>(\s*)<span>Card Approved<\/span>(\s*)<\/div>/g,
  '<div class="status-step in-progress">$1<div class="step-icon"></div>$2<span>Card Pending</span>$3</div>'
);

// Update the 'pending' step icon for any empty steps
htmlContent = htmlContent.replace(
  /<div class="status-step">(\s*)<div class="step-icon">\u25cb<\/div>/g,
  '<div class="status-step pending">$1<div class="step-icon">○</div>'
);

// Ensure reward badges are properly styled and consistent
htmlContent = htmlContent.replace(
  /<div class="status-reward">\+u20b9500<\/div>/g,
  '<div class="status-reward">+₹500</div>'
);

htmlContent = htmlContent.replace(
  /<div class="status-reward pending">\+u20b90<\/div>/g,
  '<div class="status-reward pending">+₹0</div>'
);

// Add consistent margins to all referral rows
htmlContent = htmlContent.replace(
  /<div class="referral-row"[^>]*>/g,
  match => match.includes('style=') ? 
    match.replace(/style="([^"]*)"/g, 'style="$1 margin-bottom: 1.5rem;"') : 
    match.replace(/<div class="referral-row"/, '<div class="referral-row" style="margin-bottom: 1.5rem;"')
);

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Updated stepper HTML structure');
