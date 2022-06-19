import classNames from "classnames";
import { FrontMatter } from "../../types/frontmatter";
import NoContent from "../NoContent";
import ArticleCard from "./ArticleCard";

interface ArticleCardsProps {
    articles: FrontMatter[];
    backTo: string;
}

const ArticleCards = ({ articles, backTo }: ArticleCardsProps) => {
    return !articles || articles.length == 0
        ? <NoContent />
        : <div className={classNames(
            "flex flex-col justify-center align-center w-11/12 md:w-8/12 m-auto"
        )}>
            {articles.map((article, index) => {
                return (
                    <ArticleCard article={article} key={index} backTo={backTo.toLowerCase()} />
                );
            })}
        </div>
}

export default ArticleCards