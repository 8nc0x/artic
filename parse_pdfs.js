const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function decodeA85(str) {
  str = str.replace(/\s+/g, '').replace(/^<~/, '').replace(/~>$/, '');
  const bytes = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] === 'z') {
      bytes.push(0, 0, 0, 0);
      i++;
      continue;
    }
    let count = 0;
    let val = 0;
    for (let j = 0; j < 5; j++) {
      if (i + j < str.length && str[i + j] !== '~') {
        val = val * 85 + (str.charCodeAt(i + j) - 33);
        count++;
      } else {
        val = val * 85 + 84;
      }
    }
    const b1 = (val >>> 24) & 255;
    const b2 = (val >>> 16) & 255;
    const b3 = (val >>> 8) & 255;
    const b4 = val & 255;
    if (count >= 2) bytes.push(b1);
    if (count >= 3) bytes.push(b2);
    if (count >= 4) bytes.push(b3);
    if (count >= 5) bytes.push(b4);
    i += Math.min(count, 5);
  }
  return Buffer.from(bytes);
}

function extractPdf(filename) {
  const buf = fs.readFileSync(filename);
  const s = buf.toString('latin1');
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  let lines = [];
  while ((match = streamRegex.exec(s)) !== null) {
    const raw = match[1].trim();
    let streamText = '';
    try {
      streamText = zlib.inflateSync(decodeA85(raw)).toString('latin1');
    } catch(e) {
      try {
        streamText = zlib.inflateSync(Buffer.from(raw, 'latin1')).toString('latin1');
      } catch(e2) {
        continue;
      }
    }
    
    // Extract strings inside parentheses
    const strPattern = /\(((?:\\.|[^()])*)\)\s*(?:Tj|'|")/g;
    let sm;
    while ((sm = strPattern.exec(streamText)) !== null) {
      let clean = sm[1]
        .replace(/\\([0-7]{1,3})/g, (m, oct) => String.fromCharCode(parseInt(oct, 8)))
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\(.)/g, '$1');
      if (clean.trim()) {
        lines.push(clean.trim());
      }
    }
    
    // Also handle TJ array of strings: [ (str) num (str) ] TJ
    const tjPattern = /\[([\s\S]*?)\]\s*TJ/g;
    let tm;
    while ((tm = tjPattern.exec(streamText)) !== null) {
      const arrContent = tm[1];
      const innerStrPattern = /\(((?:\\.|[^()])*)\)/g;
      let ism;
      let combined = '';
      while ((ism = innerStrPattern.exec(arrContent)) !== null) {
        let clean = ism[1]
          .replace(/\\([0-7]{1,3})/g, (m, oct) => String.fromCharCode(parseInt(oct, 8)))
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\(.)/g, '$1');
        combined += clean;
      }
      if (combined.trim()) {
        lines.push(combined.trim());
      }
    }
  }
  return lines.join('\n');
}

const files = [
  'NCPOR_Datasets_PostgreSQL_Schema_Updated.pdf', 
  'Polar_Science_Portal_COMPLETE_Brainstorm_and_Technical_Documentation.pdf', 
  'Polar_Science_Portal_Full_Architecture_Documentation.pdf'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    const txt = extractPdf(fullPath);
    const outName = path.join(__dirname, f.replace('.pdf', '.txt'));
    fs.writeFileSync(outName, txt);
    console.log(f, '-> lines:', txt.split('\n').length, 'chars:', txt.length);
  }
});
