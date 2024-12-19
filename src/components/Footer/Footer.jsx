import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./Footer.module.css";
import image from "/assets/DEBSOClogowhitePNG.svg";
const SocialLinks = () => {
  const handleClick = (e) => {
    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
    ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
    e.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600); 
  };

  return (
    <div className={styles["footer"]}>
      <a
        href="https://www.facebook.com/debatingsociety3103.nitd"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={styles["social-icon"]}
      >
        <FacebookIcon style={{ color: "1739f3" }} /> 
      </a>
      <a
        href="https://www.youtube.com/@thedebatingsocietynitdurga3689"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={styles["social-icon"]}
      >
        <YouTubeIcon style={{ color: "red" }} /> 
      </a>
      <a href="https://www.debsocnitdgp.in/" target="_blank" rel="noreferrer">
        <img className={styles.logods} src={image} alt="ds-logo" />
      </a>
      <a
        href="https://www.linkedin.com/company/debating-society-nit-durgapur/people/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={styles["social-icon"]}
      >
        <LinkedInIcon style={{ color: "#76bdee" }}/>
      </a>
      <a
        href="https://www.instagram.com/debsocnitd/profilecard/?igsh=MWk2a25panBrNjJlbQ=="
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={styles["social-icon"]}
      >
        <InstagramIcon style={{ color: "#df1b86" }} /> 
      </a>
    </div>
  );
};

export default SocialLinks;
