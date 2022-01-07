
import React from "react";
import Link from "next/link";
import classNames from "../utils/classNames";
import GitHubIcon from "./icons/GitHubIcon";
import Icon from "./icons/Icon";
import MailIcon from "./icons/MailIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import { Contact, useContactQuery } from "../generated/graphql";
import FooterWrapper from "./footer/FooterWrapper";


const Footer = () => {
    const { data, loading, error } = useContactQuery();

    if (data?.contact?.data?.attributes) {
        const { email, github, linkedin } = data?.contact?.data?.attributes;


        return (
            <FooterWrapper>
                <Link href={github as string} passHref
                >
                    <a target="_blank" rel="noreferrer" className="flex flex-col space-y-2 justify-center rise-on-hover">
                        <Icon className={classNames("text-gray-800 m-auto dark:text-gray-300")}>
                            <GitHubIcon />
                        </Icon>
                        <span className="dark:text-gray-300 text-xs">GitHub</span>
                    </a>
                </Link>

                <Link href={`mailto:${email as string}`} passHref>
                    <a target="_blank" rel="noreferrer" className="flex flex-col space-y-2 justify-center rise-on-hover">
                        <Icon className={classNames("text-gray-800 m-auto dark:text-gray-300 ")}>
                            < MailIcon />
                        </Icon>
                        <span className="dark:text-gray-300 text-xs">E-mail</span>
                    </a>
                </Link>

                <Link href={linkedin as string} passHref>
                    <a target="_blank" rel="noreferrer" className="flex flex-col space-y-2 justify-center rise-on-hover">
                        <Icon className={classNames("text-gray-800 m-auto dark:text-gray-300")}>
                            < LinkedInIcon />
                        </Icon>
                        <span className="dark:text-gray-300 text-xs">LinkedIn</span>
                    </a>
                </Link>
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
