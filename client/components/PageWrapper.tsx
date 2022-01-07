import classNames from "../utils/classNames";

interface PageWrapperProps {
    className?: string;
    children: any
}

const PageWrapper = ({ className, children }: PageWrapperProps) => {
    const styles = className ? className : "";

    return (
        <div className={classNames("h-full pb-16", styles)}>
            {children}
        </div>
    )
}

export default PageWrapper