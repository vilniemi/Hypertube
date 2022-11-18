// const spawn = require("child_process").spawn;

// import { NextApiRequest, NextApiResponse } from 'next';
// import cron from 'node-cron';
// import { prisma } from '../../server/db/client';
// import fs from 'fs';

// export default function updateMovies(){
//   return new Promise(async (reject, resolve) => {
//       const task = cron.schedule('0 23 * * *', async () => { // '*/1 * * * * *' every second for testing
//         const pythonProcess = spawn('python3',["/utils/to/script.py", arg1, arg2, ...]);
//       }

//       task.start();
//     });
//   };
//     }
//   };

//   const { exec } = require("child_process");

// exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
