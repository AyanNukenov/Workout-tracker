/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/components/ScrollToTopButton.js",
    "./src/components/WorkoutGroup.js",
    "./src/components/ConfirmationModal.js",
    "./src/components/Account.js",
    "./src/components/NavigationBar.js",
    "./src/components/ExcerciseInput.js",
    "./src/components/AddWorkout.js",
    "./src/components/Pagination.js",
    "./src/components/Statistics.js",
    ".src/components/MassGainProgram.js",
    ".src/components/Programs.js",
  ],
  theme: {
    extend: {
      animation: {  
        fadeIn: "fadeIn 1s ease-in-out",  
      },  
      keyframes: {  
        fadeIn: {  
          "0%": { opacity: 0 },  
          "100%": { opacity: 1 },  
        },  
      },  
    },
  },
  plugins: [],
}

