import classNames from "classnames";
import { FrontMatter } from "../../types/frontmatter";
import NoContent from "../NoContent";
import ArticleCard from "./ArticleCard";

const ArticleCards = ({ articles }: { articles: FrontMatter[] }) => {
    return !articles || articles.length == 0
        ? <NoContent />
        : <div className={classNames(
            "flex flex-col justify-center align-center w-8/12 m-auto"
        )}>
            {articles.map((article, index) => {
                return (
                    <ArticleCard article={article} key={index} />
                );
            })}
        </div>
}

export default ArticleCards