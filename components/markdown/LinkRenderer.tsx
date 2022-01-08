/**
 * Opens anchor tags rendered from Markdown in a new tab.
 * @param props is the props passed into the components. Not really important for my use case.
 */
const LinkRenderer = (props: any) => {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
}

export default LinkRenderer;