import classNames from "classnames";
import Tag from "./Tag";

interface TagsProps {
    tags: string[];
    className?: string;
}

const Tags = ({ tags, className }: TagsProps) => {
    const styles = className ? className : "";

    return <div className="mb-3">
        {tags
            ? tags.map((tag, index) => {
                return <Tag tag={tag} key={index}
                    className={classNames(styles)} />
            })
            : null}
    </div>
}

export default Tags