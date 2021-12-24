const notes = require("./notes");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");

yargs.version("1.1.0");

// Add command
yargs.command({
  command: "add",
  describe: "Adding Item",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(a) {
    notes.addNote(a.title, a.body);
  },
});

// Remove Command
yargs.command({
  command: "remove",
  describe: "removing an item!",
  builder: {
    title: {
      describe: "Remove Note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv){
    notes.removeNote(argv.title);
  },
});

// List command

yargs.command({
  command: "list",
  describe: "Listing items!",
  handler() {
    notes.listNotes();
  },
});

//Read Command

yargs.command({
  command: "read",
  describe: "Reading Items!",
  builder: {
    title: {
      describe: "Reading Note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
   notes.readNote(argv.title)
  },
});

yargs.parse();

// const takeNote = notes("Hello World!");
// if (validator.isEmail("shahbaz@gmail.com")) {
//     console.log(chalk.bgGreen.white.bold("Success!"));
// }
// console.log(takeNote);

// ====================================

//Manual Way
// var input = process.argv[2]
// if (input === "add") {
//     console.log("Adding Note!")

// } else if(input === "remove") {
//     console.log("Removing Note!")
// }
