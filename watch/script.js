#!/usr/bin/env node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");
const fs = require("fs");
const { spawn } = require("child_process");
const chalk = require("chalk");

program
  .version("1.0.0")
  .argument("[filename]", "Filename that You want to watch.")
  .action(async ({ filename }) => {
    const name = filename || "script.js";
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    let proc;

    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log(chalk.green("-----Process started-----"));
      proc = spawn("node", [name], { stdio: "inherit" });
    }, 100);

    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });
program.parse(process.argv);
