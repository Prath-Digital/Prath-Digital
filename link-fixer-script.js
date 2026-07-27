const fs = require('fs');
let html = fs.readFileSync('d:/Prath-Digital/achievements.html', 'utf8');
html = html.replace(/href="\//g, 'href="./index.html');
html = html.replace(/href=".\/index.html#achievements"/g, 'href="#achievements"');
fs.writeFileSync('d:/Prath-Digital/achievements.html', html);
