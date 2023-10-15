import React from "react";
import discordIcon from "./images/discord_icon.png";
import githubIcon from "./images/github_icon.png";
import linkedinIcon from "./images/linkedin_icon.png";
export function Footer({}) {
  return (
    <footer className="footer">
      <p className="footer__text"></p>
      <div className="footer__icons-box">
        <img src={githubIcon} alt="Github icon" className="footer__icon footer__icon--github" />
        <img src={discordIcon} alt="Discord icon" className="footer__icon footer__icon--discord" />
        <img src={linkedinIcon} alt="Linkedin icon" className="footer__icon footer__icon--linkedin" />
      </div>
    </footer>
  );
}
