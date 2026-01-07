// Path module - handling and transforming file paths

import path from 'path';

// Path module methods

// 1. path.basename() - returns the last portion of a path

const filePath = '/home/user/docs/file.txt';
const baseName = path.basename(filePath);
console.log('Base name:', baseName);            //file.txt

// 2. path.dirname() - returns the directory name of a path

const dirName = path.dirname(filePath);
console.log('Directory name:', dirName);        // /home/user/docs

// 3. path.extname() - returns the file extension of a path

const extName = path.extname(filePath);
console.log('Extension name:', extName);        // .txt

const filenameWithoutExt = path.basename('/users/docs/file.txt', '.txt');
console.log(filenameWithoutExt);                // file

console.log(path.extname('index.coffee.md'));   // .md

// 4. path.join() - joins all given path segments together using the platform-specific separator

const joinedPath = path.join('/home', 'user', 'docs', 'file.txt');
console.log('Joined path:', joinedPath);        // /home/user/docs/file.txt

console.log(path.join('/users', '../system', './logs', 'file.txt')); 

// 5. path.resolve() - resolves a sequence of paths or path segments into an absolute path

const resolvedPath = path.resolve('docs', 'file.txt');
console.log('Resolved path:', resolvedPath);    // e.g., /current/working/directory/docs/file.txt       

// 6. path.isAbsolute() - determines if a path is an absolute path

const absolutePath = '/home/user/docs/file.txt';
const relativePath = 'docs/file.txt';   

console.log(path.isAbsolute(absolutePath));  // true
console.log(path.isAbsolute(relativePath));  // false

// 7. path.parse() - returns an object whose properties represent significant elements of the path
const parsedPath = path.parse(filePath);
console.log('Parsed path:', parsedPath);

// 8. path.format() - returns a path string from an object
const formattedPath = path.format(parsedPath);
console.log('Formatted path:', formattedPath);  // /home/user/docs/file.txt

// 9. path.relative() - returns the relative path from one path to another
const fromPath = '/home/user/docs';
const toPath = '/home/user/images/photo.jpg';   
const relativePathResult = path.relative(fromPath, toPath);
console.log('Relative path:', relativePathResult);  // ../images/photo.jpg

// 10. path.sep - provides the platform-specific path segment separator
console.log('Path separator:', path.sep);  // '/' on POSIX, '\' on Windows

// 11. path.delimiter - provides the platform-specific path delimiter for PATH environment variable
console.log('Path delimiter:', path.delimiter); // ':' on POSIX, ';' on Windows
