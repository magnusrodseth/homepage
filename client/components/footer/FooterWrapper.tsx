import classNames from "../../utils/classNames";

interface FooterWrapper {
    className?: string;
    children: any;
}

const FooterWrapper = ({ className, children }: FooterWrapper) => {
    const styles = className ? className : "";
    return (
        <div className={classNames(styles,
            "smooth bg-gray-100 dark:bg-gray-800 dark:text-gray-100",
            "shadow-lg font-mono text-center fixed bottom-0 w-screen z-50 py-3")}>

            <div className="flex flex-row space-x-16 justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default FooterWrapper