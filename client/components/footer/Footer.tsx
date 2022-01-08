
import React from "react";
import GitHubIcon from "../icons/GitHubIcon";
import MailIcon from "../icons/MailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import FooterWrapper from "./FooterWrapper";
import FooterLink from "./FooterLink";


const Footer = () => {
    const github = "https://github.com/magnusrodseth";
    const email = "magnus.rodseth@gmail.com";
    const linkedin = "https://www.linkedin.com/in/magnus-rodseth/";

    return (
        <FooterWrapper>
            <FooterLink
                href={github}
                label="GitHub"
                icon={<GitHubIcon />}
            />

            <FooterLink
                href={`mailto:${email}`}
                label="E-mail"
                icon={<MailIcon />}
            />

            <FooterLink
                href={linkedin}
                label="LinkedIn"
                icon={<LinkedInIcon />}
            />
        </FooterWrapper>
    )
}

export default Footer;
