// src/pages/RulesPage.js
import React from "react";

// Rules data to be shared
export const rulesData = [
  "Each player gets 60 seconds per turn.",
  "Draw clues for others to guess the word.",
  "No letters or numbers in the drawing.",
  "Points are awarded for correct guesses.",
  "Have fun and be creative!",
];

const RulesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      <div className="bg-gray-800 border-4 border-pink-500 p-8 rounded-lg shadow-lg max-w-lg text-center">
        <h2 className="text-pink-500 font-pixel text-4xl mb-4">Game Rules</h2>
        <ul className="text-blue-300 font-pixel text-xl space-y-4">
          {rulesData.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RulesPage;
