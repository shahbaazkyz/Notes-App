const fs = require("fs");
const chalk = require("chalk");

function getNotes(note) {
  return "This is note : " + note;
}

// Adding Notes
function addNote(title, body) {
  const data = loadNotes();

  const checkDuplicate = data.filter(function (note) {
    return note.title === title;
  });
  if (checkDuplicate.length === 0) {
    data.push({
      title: title,
      body: body,
    });

    updateNotes(data);
    console.log("Note added!");
  } else {
    console.log("Title already exists!");
  }
}

// Remove Note

function removeNote(title) {
  const data = loadNotes();

  const checkTitle = data.some((note) => note.title === title);

  if (checkTitle) {
    const newData = data.filter(function (note) {
      return note.title !== title;
    });
      updateNotes(newData);
      console.log(chalk.bgGreen.white.bold(title + " deleted succesfully!"));
    }
  else {
      console.log(chalk.bgRed.white.bold(title + " not found!"));
    }
}

// Update Note

function updateNotes(notes) {
  const jsonData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", jsonData);
}

// Loading Notes

function loadNotes() {
  try {
    const receivedJSON = fs.readFileSync("notes.json");
    const stringJSON = receivedJSON.toString();
    return JSON.parse(stringJSON);
  } catch (error) {
    return [];
  }
}

module.exports = { getNotes, addNote, removeNote };
