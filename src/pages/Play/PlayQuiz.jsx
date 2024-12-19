import React, { useState, useEffect } from "react";
import styles from "./QuizGame.module.css"; // Custom retro styles
import correctSound from "../../assets/sounds/correctSound.mp3"; // Retro sound effects
import wrongSound from "../../assets/sounds/wrongSound.mp3";
import cityscape from "/assets/cityscape.png";
import powerup from '../../assets/images/powerup.png';
import Timer from "../../components/Timer/Timer"; // Timer component
import Footer from "../../components/Footer/Footer";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import useContext from "../context/UserContext";
import gamebg from './gamebg.jpg';
import "../../index.css"
const QuizGame = () => {
  const [animationStopped, setAnimationStopped] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hintAvailable, setHintAvailable] = useState(false);
  const [hintCountdown, setHintCountdown] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const context = useContext();

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion(false);
    }
    const interval = setInterval(() => setTimer((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const fetchQuestions = () => {
    setLoading(true);
    fetch(endpoints.QUESTION, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.questions) {
          setQuestions(data.questions);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching questions:", err);
      });
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
    
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

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); // Reset timer for the next question
    } else {
      setIsGameOver(true);
    }
  };

  const toggleHint = () => setShowHint(!showHint);

  const getCurrentQuestion = () => {
    if (questions.length > 0) {
      return questions[currentQuestionIndex];
    }
    return { question: "Loading...", hint: "Loading hint..." };
  };

  
  const updateHintAvailability = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
    })
      .then((res) => {
        // Log the response to see if it's HTML
        res.text().then((text) => {
          console.log("Response Text:", text);
          try {
            const jsonResponse = JSON.parse(text); // Try parsing as JSON
            if (jsonResponse["not-available"]) {
              setHintAvailable(false);
            } else if (jsonResponse.available) {
              setHintAvailable(true);
              setHintCountdown(null);
            } else {
              setHintAvailable(false);
              setHintCountdown(jsonResponse.timeleft);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        });
      })
      .catch((err) => {
        console.error("Error fetching hint availability:", err);
      });
  };
  

  useEffect(() => {
    updateHintAvailability();
  }, [currentQuestionIndex]);

  return (
    <div
      className="bg-dark-blue min-h-screen flex flex-col relative"
      style={{
        height: "88vh",
        backgroundImage: `url(${gamebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="shooting-stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Twinkling Stars */}
      <div className="stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.quizContainer}>
        {isGameOver ? (
          <div className={styles.gameOver}>
            <h1>Game Over</h1>
            <p>Your final score: {score}</p>
          </div>
        ) : loading ? (
          <div className={styles.loading}>Loading questions...</div>
        ) : (
          <div className={styles.quizBox}>
            <div className={styles.header}>
              <div className={styles.timer}>
                <Timer time={timer} />
              </div>
              <div className={styles.score}>Score: {score}</div>
            </div>
            <div className={styles.questionBox}>
              <p className={styles.question}>
                {getCurrentQuestion().question}
              </p>
            </div>
            <div className={styles.answerBox}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className={styles.answerInput}
              />
              <button
                onClick={handleAnswerSubmit}
                className={styles.submitButton}
              >
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
                  {getCurrentQuestion().hint}
                </div>
              )}
            </div>
          </div>
        )}
        <Footer className="footer" />
      </div>
    </div>
  );
};

export default QuizGame;
