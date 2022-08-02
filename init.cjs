const childProcess = require("child_process");


childProcess.exec("npm run localdb", (err, data) => {
    console.log(data);
});
childProcess.exec("npm run dev", (err, data) => {
    console.log(data);
});
childProcess.exec("npm run server-dev", (err, data) => {
    console.log(data);
});