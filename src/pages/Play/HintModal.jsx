import styles from "./HintModel.module.css";
import { useState, useEffect } from "react";
import endpoints from "../../utils/APIendpoints";
import useContext from "../context/UserContext";

export default function HintModal(props) {
  const [modalOpen, setmodalOpen] = useState(props.open);
  const [loaded, setLoaded] = useState(false);
  const [clue, setClue] = useState(null);
  const token = useContext().token;

  useEffect(() => {
    const getClue = () => {
      fetch(endpoints.CLUE, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((serverResponse) => {
          if (res.status === 200) {
            setLoaded(true);
            if (serverResponse.success) {
              let clue = serverResponse.clue.replace(/\n/g, "<br />");
              const start = clue.indexOf("__linkstart__");
              const end = clue.indexOf("__linkend__");
              if (start > -1 && end > -1) {
                clue =
                  clue.slice(0, start) +
                  `<a href="${clue.slice(
                    start + 13,
                    end
                  )}" target="_blank" class="${styles.neonLink}">` +
                  clue.slice(start + 13, end) +
                  "</a>" +
                  clue.slice(end + 11);
              }
              setClue(clue);
            } else {
              setClue(serverResponse.message);
            }
          }
        });
    };

    setmodalOpen(props.open);
    setLoaded(false);
    if (props.open) {
      getClue();
    }
  }, [props, token]);

  const handleClick = (evt) => {
    if (evt.target.id !== "hintModalBox") {
      setmodalOpen(false);
      props.onClose();
    }
  };

  return (
    <div
      className={styles.hintModalOverlay}
      style={{ display: modalOpen ? "flex" : "none" }}
      onClick={handleClick}
    >
      <div id="hintModalBox" className={styles.hintModalBox}>
        {loaded ? (
          <>
            <h2 className={`${styles.title} ${styles.neonText}`}>Clue</h2>
            <p
              className={`${styles.clueText} ${styles.neonParagraph}`}
              dangerouslySetInnerHTML={{ __html: clue }}
            ></p>
          </>
        ) : (
          <h2 className={`${styles.title} ${styles.neonText}`}>Loading...</h2>
        )}
      </div>
    </div>
  );
}
