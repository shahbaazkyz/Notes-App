const fs = require("fs");
const chalk = require("chalk");
// Adding Notes
const addNote = (title, body) => {
  const data = loadNotes();

  // const checkDuplicate = data.filter((note) => note.title === title);
  const checkDuplicate = data.find((note) => note.title === title);
  if (!checkDuplicate) {
    data.push({
      title: title,
      body: body,
    });

    updateNotes(data);
    console.log("Note added!");
  } else {
    console.log("Title already exists!");
  }
};

// Remove Note
const removeNote = (title) => {
  const data = loadNotes();

  const checkTitle = data.some((note) => note.title === title);

  if (checkTitle) {
    const newData = data.filter(function (note) {
      return note.title !== title;
    });
    updateNotes(newData);
    console.log(chalk.bgGreen.white.bold(title + " deleted succesfully!"));
  } else {
    console.log(chalk.bgRed.white.bold(title + " not found!"));
  }
};

// Read Note
const readNote = (a) => {
  const data = loadNotes();
  const readData = data.find((note) => note.title === a);
  if (readData) {
    console.log(chalk.bold(readData.title) + " : " + readData.body);
  } else {
    console.log(chalk.bgRed.white.bold("No note found!"));
  }
};

// List Notes

const listNotes = () => {
  const data = loadNotes();
  console.log(chalk.bgGreen.white.bold("Your Notes"));
  data.forEach((element) => {
    console.log(
      chalk.bold("Title : ") +
        element.title +
        chalk.bold(" , Body : ") +
        element.body
    );
  });
};

// Update Note

const updateNotes = (notes) => {
  const jsonData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", jsonData);
};

// Loading Notes

const loadNotes = () => {
  try {
    const receivedJSON = fs.readFileSync("notes.json");
    const stringJSON = receivedJSON.toString();
    return JSON.parse(stringJSON);
  } catch (error) {
    return [];
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
