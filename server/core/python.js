const { spawn } = require('child_process');
const fs = require('fs');

const run = (code) => {
    return new Promise((resolve, reject) => {
        if (!code) {
            return reject({ type: "error", data: "Code not provided" });
        }

        fs.writeFileSync('./main.py', code);

        const pythonProcess = spawn('python3', ['-u', './main.py']); 
        let output = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', () => {
            if (error) {
                reject({ type: "error", data: error });
            } else {
                resolve({ type: "output", data: output });
            }
        });
    });
};

module.exports = run;
