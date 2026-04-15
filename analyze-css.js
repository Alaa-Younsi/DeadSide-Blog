const fs = require('fs');

const filePath = './src/index.css';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log('=== CSS FILE ANALYSIS ===\n');

// 1. Total line count
console.log('1. TOTAL LINE COUNT: ' + lines.length + ' lines\n');

// 2. Find FIRST occurrence of Outer Space CSS Variables
const targetComment = '/* ─── Outer Space CSS Variables ─── */';
let outerSpaceFirstLine = null;
lines.forEach((line, idx) => {
  if (line.includes(targetComment) && outerSpaceFirstLine === null) {
    outerSpaceFirstLine = idx + 1;
  }
});

if (outerSpaceFirstLine !== null) {
  console.log('2. FIRST OCCURRENCE OF "/* ─── Outer Space CSS Variables ─── */":');
  console.log('   Line ' + outerSpaceFirstLine + '\n');
}

// 3. Find duplicates
let rootCount = 0;
let baseCount = 0;
let outerSpaceCount = 0;
let secondRootLine = null;
let secondBaseLine = null;
let secondOuterSpaceLine = null;

lines.forEach((line, idx) => {
  if (line.includes(':root {')) {
    rootCount++;
    if (rootCount === 2) secondRootLine = idx + 1;
  }
  if (line.includes('/* ─── Base ─── */')) {
    baseCount++;
    if (baseCount === 2) secondBaseLine = idx + 1;
  }
  if (line.includes('/* ─── Outer Space CSS Variables ─── */')) {
    outerSpaceCount++;
    if (outerSpaceCount === 2) secondOuterSpaceLine = idx + 1;
  }
});

console.log('3. DUPLICATE CONTENT CHECK:');
console.log('   :root { occurrences: ' + rootCount);
console.log('   /* ─── Base ─── */ occurrences: ' + baseCount);
console.log('   /* ─── Outer Space CSS Variables ─── */ occurrences: ' + outerSpaceCount);

if (rootCount > 1) {
  console.log('\n   ✓ FILE HAS DUPLICATE CONTENT!');
  console.log('   Duplicate section starts at line ' + secondOuterSpaceLine + '\n');
  
  const cutLine = secondOuterSpaceLine - 1;
  
  console.log('4. REWRITING FILE TO REMOVE DUPLICATES:');
  console.log('   Keeping lines 1-' + cutLine);
  console.log('   Removing lines ' + (cutLine + 1) + '-' + lines.length);
  
  const newContent = lines.slice(0, cutLine).join('\n');
  fs.writeFileSync(filePath, newContent, 'utf-8');
  
  const newLineCount = newContent.split('\n').length;
  console.log('   ✓ File successfully rewritten!');
  console.log('   Original: ' + lines.length + ' lines → New: ' + newLineCount + ' lines');
  console.log('   Removed: ' + (lines.length - newLineCount) + ' lines\n');
} else {
  console.log('\n   ✗ NO DUPLICATES FOUND - File is clean!\n');
}
