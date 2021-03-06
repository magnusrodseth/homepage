import { ChevronDoubleDownIcon } from "@heroicons/react/outline"
import PageWrapper from "../src/components/PageWrapper"

const Contact = () => {
    return (
        <PageWrapper className="!h-screen flex">
            <div className="m-auto text-center text-2xl md:text-4xl dark:text-gray-200">
                <p className="mx-6 my-8" > Click on one of the links at the bottom of the page to contact me.</ p>

                <p className="mx-6 my-8">I&apos;m looking forward to get in touch with you 👋🏼</p>

                <div className="w-screen">
                    <ChevronDoubleDownIcon className="smooth icon drop-on-hover m-auto text-indigo-600 dark:text-indigo-400" />
                </div>
            </div >
        </PageWrapper >
    )
}
export default Contact