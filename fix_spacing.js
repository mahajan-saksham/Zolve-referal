// Script to fix empty lines in testimonial headers
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');

// Read the file
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace the extra blank lines in testimonial headers
htmlContent = htmlContent.replace(/<div class="testimonial-header">\s*\n\s*\n\s*<div class="testimonial-meta">/g, 
                              '<div class="testimonial-header">\n                                <div class="testimonial-meta">');

// Write the fixed content back to the file
fs.writeFileSync(indexHtmlPath, htmlContent);

console.log('Fixed empty lines in testimonial headers');
