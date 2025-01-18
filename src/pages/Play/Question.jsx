import React from "react";
import "./Question.css";

import { useState, useEffect } from "react";
import HintModal from "./HintModal";
import SnackBar from "./SnackBar";
import HintCountDown from "./HintCountDown";
import useContext from "../context/UserContext";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import bg from "/assets/bg.jpg";

const QuestionTextRenderer = ({ text }) => {
  text = typeof text === "string" ? text : "";

  while (text.indexOf("\n") > -1) {
    text = text.replace("\n", "<br />");
  }
  const start = text.indexOf("__linkstart__");
  const end = text.indexOf("__linkend__");
  if (start > -1 && end > -1) {
    text =
      text.slice(0, start) +
      '<a href="' +
      text.slice(start + 13, end) +
      '" target="blank">' +
      text.slice(start + 13, end) +
      "</a>" +
      text.slice(end + 11);
  }
  return (
    <p className="question-text" dangerouslySetInnerHTML={{ __html: text }}></p>
  );
};

const Question = () => {
  const [state, setState] = useState({
    question: {
      text: "Loading...",
      round: 0,
      ogmedia: "",
      year: 0,
      country: "",
      language: "",
      show_country: false,
      show_media: false,
      show_language: false,
      show_year: false,
      media:" ",
    },
    loaded: true,
  });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({
    show: false,
    text: "",
    success: false,
  });
  const [hintAvailable, setHintAvailable] = useState(null);
  const [hintCountdown, setHintCountdown] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const navigate = useNavigate();
  const context = useContext();

  const updateHint = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          clearTimeout(timer);
          if (serverResponse["not-available"]) {
            setHintAvailable(false);
          } else if (serverResponse.available) {
            setHintAvailable(true);
            setHintCountdown(null);
          } else {
            setTimer(setTimeout(updateHint, serverResponse.timeleft * 1000));
            setHintCountdown(serverResponse.timeleft);
          }
        }
      });
    });
  };
  const [gameLive, setGameLive] = useState(true);

  const getQuestion = () => {
    setState({ ...state, loaded: false });
    fetch(endpoints.QUESTION, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          context.logout();
          navigate("/sign-in?redirected=true");
          return;
        }
        return res.json();
      })
      .then((res) => {
        if (res.game_not_live) {
          setGameLive(false); 
          navigate("/?redirected=true");
        } else if (res.gameOver) {
          navigate("/game-finished");
        } else {
          clearInterval(timer);
          updateHint();
          setGameLive(true); 
          setState({
            question: res,
            loaded: true,
          });
        }
      })
      .catch((error) => {
        setState({
          question: { text: "Error loading question", round: 0 },
          loaded: true,
        });
      });
  };

  const checkAnswer = () => {
    const answer = document.getElementById("answerInput");
    fetch(endpoints.ANSWER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
      body: JSON.stringify({ answer: answer.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.game_not_live) {
          navigate("/?redirected=true");
        }
        if (res.success) {
          answer.value = "";
          setSnackbarOptions({
            show: true,
            text: "Correct Answer!!",
            success: true,
          });
          setTimeout(
            () =>
              setSnackbarOptions((prev) => ({
                ...prev,
                show: false,
              })),
            3000
          );
          getQuestion();
        } else {
          setSnackbarOptions({
            show: true,
            text: "Wrong Answer. Please try again.",
            success: false,
          });
          setTimeout(
            () =>
              setSnackbarOptions((prev) => ({
                ...prev,
                show: false,
              })),
            3000
          );
        }
      });
  };

  useEffect(() => {
    getQuestion();
    if (gameLive) {
      const introTimer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(introTimer);
    }
  }, [context.token, gameLive]);

  return (
    <div
      className="bg-dark-blue h-screen flex flex-col relative items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      {gameLive && showIntro && (
        <div className="cinematic-intro justify-center items-center font-alagard text-center">
          <h1 className="text-white xl:text-4xl md:text-4xl sm:text-2xl glow-effect">
            Welcome to Fictionary!
          </h1>
          <p className="text-white xl:text-2xl md:text-2xl sm:text-1xl mt-4">
            Get ready to challenge your mind...
          </p>
        </div>
      )}
      <HintModal
        open={hintModalOpen}
        onClose={() => {
          setHintModalOpen(false);
        }}
      />
      <SnackBar
        show={snackbarOptions.show}
        text={snackbarOptions.text}
        success={snackbarOptions.success}
      />
      {!showIntro && (
        <div className="arcade-screen">
          {state.question.round > 45 ? (
            <div className="thank-you-message text-center text-white">
              <h2 className="text-3xl font-bold">
                Thank you for playing!
              </h2>
              <p className="text-xl mt-4">
                The next round begins in <span className="text-red-500 font-bold">few hours</span> Stay Tuned—see you then!
              </p>
            </div>
          ) : state.loaded ? (
            <>
              <div className="question-box">
                <div className="round-display">
                  Round: {state.question.round}
                </div>
                <QuestionTextRenderer
                  text={state.question.text}
                  className="question"
                />
                <input
                  className="answer-input"
                  id="answerInput"
                  type="text"
                  placeholder="Type your answer"
                  onKeyDown={(evt) => {
                    if (evt.key === "Enter") {
                      checkAnswer();
                    }
                  }}
                />
                {hintCountdown && <HintCountDown time={hintCountdown} />}
              </div>
              <div className="controls">
                <button
                  className={`hint-button ${
                    hintCountdown !== null || !hintAvailable ? "disabled" : ""
                  }`}
                  onClick={
                    hintCountdown !== null || !hintAvailable
                      ? () => {}
                      : () => setHintModalOpen(true)
                  }
                >
                  HINT
                </button>
                <button className="submit-button" onClick={checkAnswer}>
                  SUBMIT
                </button>
              </div>
              <div className="font-bold fontVT323">
                {state.question.show_country && (
                  <>
                    Country: {state.question.country}
                    <br />
                  </>
                )}
                {state.question.show_media && (
                  <>
                    Original Media: {state.question.ogmedia}
                    <br />
                  </>
                )}
                {state.question.show_language && (
                  <>
                    Language: {state.question.language}
                    <br />
                  </>
                )}
                {state.question.show_year && <>Year: {state.question.year}</>}
              </div>
            </>
          ) : (
            <div className="loading">
              <ColorRing
                visible={true}
                height="135"
                width="135"
                ariaLabel="loading"
                wrapperClass="spinner"
                colors={[
                  "#ff00e4", 
                  "#00ffcc", 
                  "#fffb00", 
                  "#ff6f00", 
                  "#0000ff", 
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Question;