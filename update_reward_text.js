// Script to update reward text to "₹500 Earned"
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Update the reward text
htmlContent = htmlContent.replace(
  /<div class="status-reward">[^<]*<svg[^>]*>[^<]*<\/svg><\/div>/g,
  '<div class="status-reward">₹500 Earned</div>'
);

// Also update any other reward displays for consistency
htmlContent = htmlContent.replace(
  /<div class="status-reward">[^<]*<\/div>/g,
  (match) => {
    if (match.includes('pending')) {
      return '<div class="status-reward pending">₹0 Pending</div>';
    } else if (!match.includes('Earned')) {
      return '<div class="status-reward">₹500 Earned</div>';
    }
    return match;
  }
);

// Write the updated content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Updated reward text to "₹500 Earned"');
