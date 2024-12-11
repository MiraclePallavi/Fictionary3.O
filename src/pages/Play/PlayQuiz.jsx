import React, { useState, useEffect } from "react";
import styles from "./QuizGame.module.css"; // Custom retro styles
import correctSound from "../../assets/sounds/correctSound.mp3"; // Retro sound effects
import wrongSound from "../../assets/sounds/wrongSound.mp3";
import cityscape from "/assets/cityscape.png";
import powerup from '../../assets/images/powerup.png';
import Timer from "../../components/Timer/Timer";// Timer component
import Footer from "../../components/Footer/Footer";
const questions = [
  {
    id: 1,
    type: "text",
    question: "What is the capital of France?",
    answer: "Paris",
    hint: "It's known as the City of Light.",
  },
  {
    id: 2,
    type: "image",
    question: "What is this landmark?",
    image: "../assets/images/eft.png",
    answer: "Eiffel Tower",
    hint: "A famous landmark in France.",
  },
];

const QuizGame = () => {
  const [animationStopped, setAnimationStopped] = useState(false);

 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
 
  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion(false);
    }
    const interval = setInterval(() => setTimer((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerSubmit = () => {
    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      questions[currentQuestion].answer.trim().toLowerCase();
    if (isCorrect) {
      setScore(score + 10);
      new Audio(correctSound).play();
    } else {
      new Audio(wrongSound).play();
    }
    handleNextQuestion(isCorrect);
  };

  const handleNextQuestion = (isCorrect) => {
    setUserAnswer("");
    setShowHint(false);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30); // Reset timer for the next question
    } else {
      setIsGameOver(true);
    }
  };

  const toggleHint = () => setShowHint(!showHint);
  const handleStopAnimation = () => {
    setAnimationStopped(true);
  };
  return (
    <div
    className="bg-dark-blue min-h-screen flex flex-col relative"
    style={{
      height: "88vh",
      backgroundImage: `url(${cityscape})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
   
    <div className={styles.quizContainer}>
      {isGameOver ? (
        <div className={styles.gameOver}>
          <h1>Game Over</h1>
          <p>Your final score: {score}</p>
        </div>
      ) : (
        <div className={styles.quizBox}>
          <div className={styles.header}>
            <div className={styles.timer}>
              <Timer time={timer} />
            </div>
            <div className={styles.score}>Score: {score}</div>
          </div>
          <div className={styles.questionBox}>
            {questions[currentQuestion].type === "text" ? (
              <p className={styles.question}>
                {questions[currentQuestion].question}
              </p>
            ) : (
              <img
                src={questions[currentQuestion].image}
                alt="question"
                className={styles.questionImage}
              />
            )}
          </div>
          <div className={styles.answerBox}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer..."
              className={styles.answerInput}
            />
            <button onClick={handleAnswerSubmit} className={styles.submitButton}>
              Submit
            </button>
          </div>
          <div className={styles.hintSection}>
            <img
              src={powerup}
              alt="Hint"
              onClick={toggleHint}
              className={styles.hintIcon}
            />
            {showHint && (
              <div className={styles.hintBox}>
                {questions[currentQuestion].hint}
              </div>
            )}
          </div>
        </div>
      )}
      <Footer className ="footer"/>
    </div>
    
    </div>
  );
};

export default QuizGame;
