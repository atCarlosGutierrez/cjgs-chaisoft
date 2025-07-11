const fs = require('fs');
const path = require('path');

const from = path.join(__dirname, 'esm', 'chai-soft-assertion.js');
const to = path.join(__dirname, 'esm', 'chai-soft-assertion.mjs');

fs.rename(from, to, (err) => {
  if (err) {
    console.error(`Rename failed: ${err.message}`);
    process.exit(1);
  } else {
    console.log(`Renamed ${from} → ${to}`);
  }
});
