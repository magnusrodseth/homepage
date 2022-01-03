
import React from "react";
import Link from "next/link";
import classNames from "../utils/classNames";
import GitHubIcon from "./icons/GitHubIcon";
import Icon from "./icons/Icon";
import MailIcon from "./icons/MailIcon";
import LinkedInIcon from "./icons/LinkedInIcon";


const Footer = () => {
    const email = "magnus.rodseth@gmail.com";
    const linkedin = "https://www.linkedin.com/in/magnus-rodseth/";
    const github = "https://github.com/magnusrodseth"

    return (
        <div className="bg-gray-100 shadow-lg font-mono text-center fixed bottom-0 w-screen z-50 py-3">
            <div className="flex flex-row space-x-16 justify-center items-center">
                <Link href={github as string}>
                    <a >
                        <Icon className="rise-on-hover">
                            <GitHubIcon />
                        </Icon>
                    </a>
                </Link>

                <Link href={email as string}>
                    <a >
                        <Icon className="rise-on-hover">
                            < MailIcon />
                        </Icon>
                    </a>
                </Link>

                <Link href={linkedin as string}>
                    <a >
                        <Icon className="indigo-500 rise-on-hover">
                            < LinkedInIcon />
                        </Icon>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Footer;
