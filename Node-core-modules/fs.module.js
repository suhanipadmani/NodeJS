
//File System Module (fs) - provides a set of methods for working with the file system 


// Reading a file

import fs from 'fs';   // import fs from "fs/promises";  (Promoise based)

fs.readFile('file.txt', 'utf8', (err, data) => {
   if (err) {
     console.error('Error reading file:', err);
     return;
   }
   console.log('File content:', data);
});

//with async/await
async function readFileExample() {
  try {
    const data =  await fs.promises.readFile('file.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
readFileExample();

// try {
//   // Read file synchronously
//   const data = fs.readFileSync('file.txt', 'utf8');
//   console.log('File content:', data);
// } catch (err) {
//   console.error('Error reading file:', err);
// }





// Writing to a file

async function writeFileEg() {
    try {
        const data = "This is some sample text to write to the file.";
        await fs.promises.writeFile("Output.txt", data, 'utf8');

        //Write JSON data
        const jsonData = {name : "Abc", age: 25, city: "Surat"};
        await fs.promises.writeFile("data.json", JSON.stringify(jsonData, null, 2));

        console.log("File written successfully");

    } catch (error) {
        console.error("Error writing file:", error);
    }
}
writeFileEg();





//append file

async function appendToFile() {
  try {
    // Append a timestamped log entry
    const logEntry = `${new Date().toISOString()}: Application started\n`;
    await fs.promises.appendFile('app.log', logEntry, 'utf8');

    console.log('Log entry added');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}

appendToFile();

//write file with file handle


async function writeWithFileHandle() {
  let fileHandle;

  try {
    
    fileHandle = await fs.promises.open('output.txt', 'w');

    await fileHandle.write('First line\n');
    await fileHandle.write('Second line\n');
    await fileHandle.write('Third line\n');

    console.log('Content written successfully');
  } catch (err) {
        console.error('Error writing to file:', err);
  } finally {
        if (fileHandle) {
            await fileHandle.close();
        }
  }
}

writeWithFileHandle();

// For writing large amounts of data, use streams to avoid high memory usage 
// - createWriteStream() and createReadStream() methods of fs module.
              



// Deleting a file
async function deleteFile() {
  try {
    await fs.promises.unlink('Output.txt');
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting file:', err);
  }         
}

deleteFile();