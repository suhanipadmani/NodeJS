console.log("Node.js")

import fs from 'fs';

fs.writeFile("Output.txt", "Hello World!", (err) => {
    if (err) throw err;
    console.log("File created successfully.");
});