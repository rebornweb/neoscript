const transpose = (note, step) => {
  const scale = {
    notes: [
      "A",
      "A#",
      "B",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
    ],
  };

  let newNote = null;

  for (let i = 0; i < scale.notes.length; i++) {
    const element = scale.notes[i];
    if (note === element) {
      let placement = scale.notes.indexOf(element) + step;
      placement = (placement + scale.notes.length) % scale.notes.length;
      newNote = scale.notes[placement];
      return newNote;
    }
  }

  return newNote;
};

const result = transpose("A", 1);
console.log("Result:", result); // Output: Result: A#


// function transpose(noteArr, step) {
//   const scale = {
//     notes: [
//       "A",
//       "A#",
//       "B",
//       "C",
//       "C#",
//       "D",
//       "D#",
//       "E",
//       "F",
//       "F#",
//       "G",
//       "G#",
//     ],
//   };

//   return noteArr.map((note) => {
//     const index = scale.notes.indexOf(note);
//     if (index !== -1) {
//       let placement = (index + step + scale.notes.length) % scale.notes.length;
//       return scale.notes[placement];
//     }
//     return null;
//   });
//}
