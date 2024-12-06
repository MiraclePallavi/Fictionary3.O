import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import "./RulesModal.css";
// Rules data to be shared
export const rulesData = [
  "1-Answering each question will award you 10 points",
  "2-Each question's hint will be provided after a specific time displayed in the timer",
  "3-No negative scoring for wrong answers. This means you can try any question for an unlimited number of times",
];

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't show the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-gray-800 border-4 border-pink-500 p-8 rounded-lg shadow-lg max-w-lg text-center"
      >
        <h2
          className="text-pink-500 font-pixel text-4xl mb-4 glow"
          
        >
          Game Rules
        </h2>
        <ul className="text-blue-300 font-pixel text-xl space-y-4">
          {rulesData.map((rule, index) => (
            <motion.li
              key={index}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {rule}
            </motion.li>
          ))}
        </ul>
        <motion.button
          onClick={onClose}
          className="mt-4 bg-pink-900 text-gray-900 font-pixel px-4 py-2 rounded-lg hover:bg-pink-600 glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RulesModal;


