// Extract all translatable strings from bushcraft_training.js data structures
const fs = require('fs');
const src = fs.readFileSync('bushcraft_training.js', 'utf8');

// Extract the IIFE content and eval just the data structures
// We'll create a temporary scope to evaluate the const declarations

// Find each data structure block and evaluate it
function extractBlock(varName, src) {
  // Match from "const VARNAME = " to the closing "];" or "};"
  const startMarker = 'const ' + varName + ' = ';
  const startIdx = src.indexOf(startMarker);
  if (startIdx === -1) return null;
  
  // Find the end - look for the pattern "  ];" or "  };" at the right indentation
  const afterStart = src.substring(startIdx);
  let endIdx;
  if (varName === 'SURVIVAL_TRAIL') {
    endIdx = afterStart.indexOf('\n  };');
  } else {
    endIdx = afterStart.indexOf('\n  ];');
  }
  if (endIdx === -1) return null;
  
  const block = afterStart.substring(0, endIdx + 4);
  // Replace "const X = " with "var X = "
  const evalStr = block.replace('const ' + varName + ' = ', 'var ' + varName + ' = ');
  return evalStr;
}

const strings = new Set();

// Helper to add a string if it's non-empty and looks like English text
function addStr(s) {
  if (typeof s !== 'string') return;
  if (s.trim().length === 0) return;
  strings.add(s);
}

try {
  // Evaluate each block
  const blocks = [
    extractBlock('RANKS', src),
    extractBlock('TOOLS', src),
    extractBlock('MISSIONS', src),
    extractBlock('LEARN_ARTICLES', src),
    extractBlock('SURVIVAL_TRAIL', src),
  ];
  
  // Evaluate all blocks together in a single scope
  const allCode = blocks.join('\n');
  eval(allCode);
  
  // RANKS
  RANKS.forEach(r => {
    addStr(r.name);
    addStr(r.callsign);
  });
  
  // TOOLS
  TOOLS.forEach(t => {
    addStr(t.label);
  });
  
  // MISSIONS
  MISSIONS.forEach(m => {
    addStr(m.title);
    addStr(m.desc);
    addStr(m.brief);
    if (m.tasks) {
      m.tasks.forEach(task => {
        addStr(task.prompt);
        if (task.type === 'select' && task.options) {
          task.options.forEach(opt => {
            addStr(opt.text);
            if (opt.fb) addStr(opt.fb);
          });
        }
        if (task.type === 'order' && task.items) {
          task.items.forEach(item => addStr(item));
        }
        if (task.fb) addStr(task.fb);
      });
    }
  });
  
  // LEARN_ARTICLES
  LEARN_ARTICLES.forEach(a => {
    addStr(a.title);
    addStr(a.desc);
    if (a.body) addStr(a.body);
  });
  
  // SURVIVAL_TRAIL
  if (SURVIVAL_TRAIL.stages) {
    SURVIVAL_TRAIL.stages.forEach(s => {
      addStr(s.title);
      addStr(s.narrative);
      addStr(s.prompt);
      if (s.choices) {
        s.choices.forEach(c => {
          addStr(c.title);
          addStr(c.desc);
          addStr(c.fbTitle);
          addStr(c.fbDetail);
        });
      }
    });
  }
  
} catch(e) {
  console.error('Error:', e.message);
  console.error(e.stack);
}

// Also extract HTML data-i18n strings
const html = fs.readFileSync('bushcraft_training.html', 'utf8');
const i18nMatches = html.matchAll(/data-i18n="([^"]*)"/g);
for (const match of i18nMatches) {
  addStr(match[1]);
}

// Output as JSON array
const arr = Array.from(strings).sort();
fs.writeFileSync('bushcraft_strings.json', JSON.stringify(arr, null, 2));
console.log('Total unique strings:', arr.length);
console.log('Saved to bushcraft_strings.json');
