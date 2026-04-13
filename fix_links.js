const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'frontend', 'src', 'pages');

const files = fs.readdirSync(dir);

files.forEach(file => {
    if (!file.endsWith('.jsx')) return;
    
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');
    let hasChanges = false;
    
    // We are looking for something like:
    // Some Text</Link> 
    // And fixing it to <Link to="/">Some Text</Link>
    // This is a naive but effective fix for what the automated script broke.
    
    // A simple regex that finds characters before </Link> that don't have a > 
    const regex = /([^<>]+)(<\/Link>)/g;
    
    if (c.match(regex)) {
        c = c.replace(regex, (match, text, closingTag) => {
            return `<Link to="#">${text.trim()}</Link>`;
        });
        hasChanges = true;
    }
    
    // Also missing <br> or <img/> closing
    if (c.includes('<source')) {
        c = c.replace(/<source([^>]*)>/g, '<source$1 />');
        hasChanges = true;
    }
    if (c.includes('<video')) {
        c = c.replace(/<video([^>]*)>/g, '<video$1 />'); // Wait video has </video>! No, this regex breaks <video>. Reversing it mentally.
    }
    
    if (hasChanges) {
        // Fix the video regex so we don't break valid things
        c = c.replace(/<video(.*?)\/>/g, '<video$1>');
        
        fs.writeFileSync(p, c);
        console.log('Fixed JSX tags in ' + file);
    }
});
console.log('JSX Fix Script Finished!');
