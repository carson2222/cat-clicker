import React from "react";
import discordIcon from "../../images/discord_icon.png";
import githubIcon from "../../images/github_icon.png";
import linkedinIcon from "../../images/linkedin_icon.png";
import classes from "./_footer.module.scss";

export function Footer({}) {
  return (
    <footer className={classes.footer}>
      <p className={classes.text}></p>
      <div className={classes.iconsBox}>
        <img src={githubIcon} alt="Github icon" className={classes.icon} />
        <img src={discordIcon} alt="Discord icon" className={classes.icon} />
        <img src={linkedinIcon} alt="Linkedin icon" className={classes.icon} />
      </div>
    </footer>
  );
}
