
import React from "react";
import GitHubIcon from "../icons/GitHubIcon";
import MailIcon from "../icons/MailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import FooterWrapper from "./FooterWrapper";
import FooterLink from "./FooterLink";


const Footer = () => {
    return (
        <FooterWrapper>
            <FooterLink
                href={"github" as string}
                label="GitHub"
                icon={<GitHubIcon />}
            />

            <FooterLink
                href={`mailto:${"email" as string}`}
                label="E-mail"
                icon={<MailIcon />}
            />

            <FooterLink
                href={"linkedin" as string}
                label="LinkedIn"
                icon={<LinkedInIcon />}
            />
        </FooterWrapper>
    )
}

export default Footer;
