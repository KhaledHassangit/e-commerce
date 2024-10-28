import { memo } from "react"

const SectionTitle = memo(({title}:{title:string}) => {
    return (
        <h2 className="mb-3 mt-2 " style={{fontSize:"26px"}}>
            {title}
        </h2>
    )
})

export default SectionTitle
