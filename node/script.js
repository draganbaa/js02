const fs = require("fs");

//process.cwd() current working dir
fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    // console.log(err);
    throw new Error(err);
  }
  //checking is file or folder
  fs.lstat(process.cwd(), function (err, stats) {
    if (err) {
      // console.log(err);
      throw new Error(err);
    }
    stats.isDirectory();
  });
});
