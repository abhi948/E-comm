const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function combineFiles(directory, outputFile) {
    const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf-8' });
    
    function readFiles(dir) {
        fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                readFiles(fullPath);
            } else {
                try {
                    const data = fs.readFileSync(fullPath, 'utf-8');
                    outputStream.write(`\n${'='.repeat(20)} ${fullPath} ${'='.repeat(20)}\n`);
                    outputStream.write(data);
                    outputStream.write("\n\n");
                } catch (error) {
                    outputStream.write(`\n${'='.repeat(20)} ERROR READING ${fullPath} ${'='.repeat(20)}\n`);
                    outputStream.write(error.toString());
                    outputStream.write("\n\n");
                }
            }
        });
    }
    
    readFiles(directory);
    outputStream.end();
}

rl.question('Enter the directory path: ', (directory) => {
    const outputFile = 'combined_output.txt';
    combineFiles(directory, outputFile);
    console.log(`All files combined into ${outputFile}`);
    rl.close();
});