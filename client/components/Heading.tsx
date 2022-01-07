import classNames from "../utils/classNames"

interface HeadingProps {
    header: string;
    description?: string;
}

const Heading = ({ header, description }: HeadingProps) => {
    return (
        <div className="text-center mx-4">
            <h1 className={classNames(
                "smooth m-auto text-4xl md:text-6xl my-6 font-mono tracking-tight font-bold",
                "text-indigo-400 dark:text-indigo-300"
            )}>
                {header}
            </h1>
            {description
                ?
                <p className="text-lg md:text-2xl my-6">
                    {description}
                </p>
                : null
            }
        </div>
    )
}

export default Heading