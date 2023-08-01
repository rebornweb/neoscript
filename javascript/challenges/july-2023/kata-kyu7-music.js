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
      console.log(
        scale.notes.indexOf(element) + ' Equals: ' + element + ' Step: ' + step
      );

      let placement = scale.notes.indexOf(element) + step;
      // Ensure the placement wraps around to the first index when it exceeds the array's length
      placement = (placement + scale.notes.length) % scale.notes.length;
      
      console.log(placement);
      newNote = scale.notes[placement];
      console.log('New note: ' + newNote);

      return newNote; // Exit the loop and return newNote once it's found
    }
  }

  return newNote; // Return newNote as null if no match is found
};

const result = transpose("A", 1);
console.log("Result:", result);

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