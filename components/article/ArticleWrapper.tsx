import Wrapper from "../Wrapper"

interface ArticleWrapperProps {
    children: any;
}

const ArticleWrapper = ({ children }: ArticleWrapperProps) => {
    return (
        <div className="h-full flex justify-center pb-16 m-4">
            <Wrapper className="w-full md:w-5/6 lg:w-3/4 bg-gray-100 dark:bg-gray-700">
                {children}
            </Wrapper>
        </div>
    )
}

export default ArticleWrapper