// Script to fix whitespace in referral progress section
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace the extra blank lines in referral user sections
htmlContent = htmlContent.replace(/<div class="referral-user">\s*\n\s*<div class="referral-info">/g, 
                             '<div class="referral-user">\n                                    <div class="referral-info">');

// Add icons to the referral status section for better visual cues
htmlContent = htmlContent.replace(/class="status-reward">\+₹([0-9]+)<\/div>/g, 
                             'class="status-reward">+₹$1 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"></path></svg></div>');

// Enhance the "Refer More Friends" button
htmlContent = htmlContent.replace(/<button class="add-referral-btn">([\s\S]*?)<\/button>/g, 
                             '<button class="add-referral-btn">$1 <span class="reward-hint">(Earn ₹500 per referral)</span></button>');

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Fixed referral section HTML structure');
