import "./SnackBar.css";

export default function SnackBar({ show, text, success }) {
  const color = success ? "#adff2f" : "#f44336"; // Green for success, red for error
  return (
    <div
      className={`container ${show ? "enter" : "leave"}`}
      style={{
        color: "white",
        border: `2px solid ${color}`,
        background: color + "99",
      }}
    >
      {text}
    </div>
  );
}
