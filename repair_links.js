const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'frontend', 'src', 'pages');

const files = fs.readdirSync(dir);

files.forEach(file => {
    if (!file.endsWith('.jsx')) return;
    
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');
    let original = c;
    
    // Fix nested <Link><Link>
    // e.g. <Link to="/courses" className="btn"><Link to="#">Text</Link> -> <Link to="/courses" className="btn">Text</Link>
    const regex1 = /(<Link[^>]*>)<Link to="[^"]*">([^<]+)<\/Link>/g;
    c = c.replace(regex1, '$1$2</Link>');
    
    // Sometimes there are multiple nests or we missed ending tags. Let's do it heavily safe:
    // Some lines had </i><Link to="#">استكمل دروسك الآن</Link>
    // Wait, </i><Link to="#"> is totally valid JSX. The only invalid JSX was when we had an unclosed <Link> followed by <Link>.
    // But my 1st bad script actually DID close them implicitly by just appending <Link to="#"> in front of text.
    // So if the outer Link had no closing `</Link>`, it'll cause an error. But actually, the inner Link effectively closed the outer Link?
    // No, <Link to="/a"> <Link to="#">text</Link> is a missing closing tag error for the OUTER Link!
    // Because the file looks like:
    // <Link to="/a">
    // <Link to="#">text</Link>
    // So the outer Link has no closing tag. My regex1 fixes exactly this.
    
    // Let's run a second pass of the same regex in case of double nesting
    c = c.replace(regex1, '$1$2</Link>');

    if (c !== original) {
        fs.writeFileSync(p, c);
        console.log('Repaired nested Links in ' + file);
    }
});
console.log('Repair Complete!');
