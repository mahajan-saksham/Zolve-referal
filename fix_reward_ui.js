// Script to simplify the reward display
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Simplify the reward display by removing the SVG and keeping just the amount
htmlContent = htmlContent.replace(
  /<div class="status-reward"[^>]*>\+₹500 <svg[^>]*>[^<]*<\/svg><\/div>/g,
  '<div class="status-reward">+₹500</div>'
);

// Also simplify any pending reward displays
htmlContent = htmlContent.replace(
  /<div class="status-reward pending">\+₹0 <span class="reward-pending">[^<]*<\/span><\/div>/g,
  '<div class="status-reward pending">+₹0</div>'
);

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Simplified reward UI');
