import { useRouter } from 'next/router'


const Projects = () => {
    const router = useRouter()

    return <div className="mt-20 text-white"><h1>{router.query.slug}</h1></div>
}

export default Projects