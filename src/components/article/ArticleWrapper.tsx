import Wrapper from "../Wrapper"

interface ArticleWrapperProps {
    children: any;
}

const ArticleWrapper = ({ children }: ArticleWrapperProps) => {
    return (
        <div className="h-full flex justify-center pb-16 m-4">
            <div className="m-2 md:m-6 p-1 w-full md:w-5/6 lg:w-3/4">
                {children}
            </div>
        </div>
    )
}

export default ArticleWrapper