
import React from "react";
import Link from "next/link";
import classNames from "../utils/classNames";
import GitHubIcon from "./icons/GitHubIcon";
import Icon from "./icons/Icon";
import MailIcon from "./icons/MailIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import { useContactQuery } from "../generated/graphql";


const Footer = () => {
    const { data, loading, error } = useContactQuery();

    if (loading) {
        return <h1>loading...</h1>
    }

    if (error) {
        return <h1>error!</h1>
    }

    if (data?.contact?.data?.attributes) {
        const { email, linkedin, github } = data?.contact?.data?.attributes

        return (
            <div className="smooth bg-gray-100 dark:bg-gray-800 dark:text-gray-100  shadow-lg font-mono text-center fixed bottom-0 w-screen z-50 py-3">
                <div className="flex flex-row space-x-16 justify-center items-center">
                    <Link href={github as string} passHref
                    >
                        <a target="_blank" rel="noreferrer">
                            <Icon className={classNames("text-gray-800 dark:text-gray-300 rise-on-hover")}>
                                <GitHubIcon />
                            </Icon>
                        </a>
                    </Link>

                    <Link href={`mailto:${email as string}`} passHref>
                        <a target="_blank" rel="noreferrer">
                            <Icon className={classNames("text-gray-800 dark:text-gray-300 rise-on-hover")}>
                                < MailIcon />
                            </Icon>
                        </a>
                    </Link>

                    <Link href={linkedin as string} passHref>
                        <a target="_blank" rel="noreferrer">
                            <Icon className={classNames("text-gray-800 dark:text-gray-300 rise-on-hover")}>
                                < LinkedInIcon />
                            </Icon>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Footer;
