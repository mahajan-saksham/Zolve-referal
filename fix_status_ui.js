// Script to enhance the HTML structure of referral status section
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Enhance the status reward for pending user
htmlContent = htmlContent.replace(
  /<div class="status-reward">\+₹0 <svg[^>]*>[^<]*<\/svg><\/div>/g,
  '<div class="status-reward pending">+₹0 <span class="reward-pending">(Pending approval)</span></div>'
);

// Add empty icons for incomplete steps
htmlContent = htmlContent.replace(
  /<div class="step-icon"><\/div>/g,
  '<div class="step-icon">○</div>'
);

// Add animation classes for a smoother experience
htmlContent = htmlContent.replace(
  /<div class="referral-progress">/g,
  '<div class="referral-progress animated">'
);

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Enhanced referral status UI structure');
