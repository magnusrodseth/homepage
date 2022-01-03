import classNames from "../utils/classNames"

const UnderDevelopment = () => {
    return <div className={classNames("flex justify-center align-center w-screen mt-16 p-4")}>
        <h1 className="smooth text-2xl lg:text-4xl font-bold tracking-wide text-gray-800 dark:text-gray-200">
            <span className="mx-4">🚧</span>
            Under development
            <span className="mx-4">🚧</span>
        </h1>
    </div>
}

export default UnderDevelopment