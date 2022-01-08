import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

interface ErrorProps {
    message?: string;
    error?: any;
}

const Error = ({ message, error }: ErrorProps) => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex divide-x-2 divide-rose-600">
                <ExclamationCircleIcon className="icon text-rose-500" />
                <p className="text-rose-600 leading-loose ml-2 pl-2">
                    {message || "An error has occurred. Please try again later!"}
                </p>
            </div>
        </div>
    );
};

export default Error;
