const {markdown} = require("markdown");
const fs = require("fs");
const path = require("path");

function getFileNames(pathName) {
  return fs.readdirSync(path.resolve(__dirname, pathName))
    .map(filename => {
        return path.join(__dirname, pathName, filename);
    });
}

const allTall = getFileNames("../mountain/8000");
const allOther = getFileNames("../mountain/other");
const allMountain = allTall.concat(allOther);
console.log(allMountain);
let lastFile;

function readAndParse(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, {encoding: "utf-8"}, (err, text) => {
      if (err) return reject(err);
      resolve(markdown.toHTML(text));
    });
  });
}

module.exports = function getRandomRecipe() {
  return new Promise(resolve => {
    let files;
    if (lastFile) {
      files = [].concat(allMountain);
      files.splice(allMountain.indexOf(lastFile), 1)
    } else {
      files = allMountain;
    }
    const index = Math.floor(Math.random() * files.length);
    lastFile = files[index];
    resolve(readAndParse(lastFile));
  });
};
