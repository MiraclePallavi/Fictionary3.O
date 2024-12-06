import React, { useState, useEffect } from "react";
import "./PlayQuiz.css";
import HintModal from "./HintModal";
import SnackBar from "./SnackBar";
import questions from "./data.json"; 
import cityscape from "/assets/cityscape.png";

const QuestionTextRenderer = ({ text }) => {
  const renderText = () => {
    const formattedText = text.replace(/\n/g, "<br />");
    return { __html: formattedText };
  };

  return <p className="retro-question" dangerouslySetInnerHTML={renderText()}></p>;
};

const PlayQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [state, setState] = useState({
    question: questions[0],
    loaded: true,
  });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({
    show: false,
    text: "",
    success: false,
  });

  const checkAnswer = () => {
    const answer = document.getElementById("answerInput").value.trim();
    const correctAnswer = state.question.answer;

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setSnackbarOptions({
        show: true,
        text: "Correct Answer!!",
        success: true,
      });

      setTimeout(() => {
        setSnackbarOptions((prev) => ({ ...prev, show: false }));

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setState((prevState) => ({
            ...prevState,
            question: questions[currentQuestionIndex + 1],
          }));
        } else {
          alert("You've completed the quiz!");
        }
      }, 2000);
    } else {
      setSnackbarOptions({
        show: true,
        text: "Wrong Answer. Please try again.",
        success: false,
      });

      setTimeout(() => {
        setSnackbarOptions((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative"
    style={{
      backgroundImage: `url(${cityscape})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      
    }} >
    <div className="retro-container">
      <HintModal
        open={hintModalOpen}
        onClose={() => setHintModalOpen(false)}
        hint={state.question.hint}
      />
      <SnackBar
        show={snackbarOptions.show}
        text={snackbarOptions.text}
        success={snackbarOptions.success}
      />
      <div className="retro-quiz">
        <section className="retro-quiz-container">
          <div className="crt-screen">
            {state.loaded ? (
              <>
                <div className="retro-ques-box">
                  <div className="retro-round-bg">
                    <span className="retro-round">ROUND {state.question.round}</span>
                  </div>
                  <QuestionTextRenderer text={state.question.text} />
                  <input
                    className="retro-answer"
                    id="answerInput"
                    type="text"
                    placeholder="Type your answer..."
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        checkAnswer();
                      }
                    }}
                  />
                </div>
                <div className="retro-btns">
                  <button className="retro-hint-btn" onClick={() => setHintModalOpen(true)}>
                    HINT
                  </button>
                  <button className="retro-submit-btn" onClick={checkAnswer}>
                    SUBMIT
                  </button>
                </div>
              </>
            ) : (
              <div className="loading">
                <p>Loading...</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default PlayQuiz;
