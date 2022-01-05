import { getAbout } from '../lib/api';
import { About } from "../generated/graphql"
import Markdown from '../components/Markdown';
import Wrapper from '../components/Wrapper';


const About = ({ attributes }: { attributes: About }) => {
    const { content, updatedAt } = attributes

    return (
        <div className="h-full">
            <Wrapper className="p-4 bg-gray-500">
                <Markdown>{content}</Markdown>
            </Wrapper>

        </div>
    )
}

export const getStaticProps = async () => {
    const response = await getAbout();
    const { about: { data: { attributes } } } = response;

    return { props: { attributes } }
}

export default About