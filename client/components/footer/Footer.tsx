
import React from "react";
import GitHubIcon from "../icons/GitHubIcon";
import MailIcon from "../icons/MailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import { useContactQuery } from "../../generated/graphql";
import FooterWrapper from "./FooterWrapper";
import FooterLink from "./FooterLink";


const Footer = () => {
    const { data, loading, error } = useContactQuery();

    if (data?.contact?.data?.attributes) {
        const { email, github, linkedin } = data?.contact?.data?.attributes;


        return (
            <FooterWrapper>
                <FooterLink
                    href={github as string}
                    label="GitHub"
                    icon={<GitHubIcon />}
                />

                <FooterLink
                    href={`mailto:${email as string}`}
                    label="E-mail"
                    icon={<MailIcon />}
                />

                <FooterLink
                    href={linkedin as string}
                    label="LinkedIn"
                    icon={<LinkedInIcon />}
                />
            </FooterWrapper>
        )
    }

    if (loading) {
        return (
            <FooterWrapper>
                <span className="text-sm font-normal">
                    Loading...
                </span>
            </FooterWrapper>
        )
    }

    // Error is defined
    return (
        <FooterWrapper>
            <span className="text-sm font-normal">
                Contact information is unavailable.
            </span>
        </FooterWrapper>
    )

}

export default Footer;
