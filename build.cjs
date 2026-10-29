// Buildless report: this script embeds the reviewed research index in one portable HTML file.
const fs = require('node:fs');
const path = require('node:path');
const papers = require('./research-data.js');
const template = fs.readFileSync(path.join(__dirname, 'report.template.html'), 'utf8');
if (papers.length !== 20 || !template.includes('__PAPERS__')) throw new Error('Unexpected report inputs');
const html = template.replace('__PAPERS__', JSON.stringify(papers).replace(/</g, '\\u003c'));
fs.writeFileSync(path.join(__dirname, 'Q4AI探索计划.html'), html, 'utf8');
fs.writeFileSync(path.join(__dirname, 'Q4AI文献索引.json'), JSON.stringify({reviewDate:'2026-10-29',papers}, null, 2), 'utf8');
console.log(JSON.stringify({file:path.join(__dirname,'Q4AI探索计划.html'),papers:papers.length,bytes:Buffer.byteLength(html)}));
