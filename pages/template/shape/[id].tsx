import dynamic from 'next/dynamic'
import { FC } from 'react'

const StageComponent = dynamic(() => import('components/ShapeStage'), { ssr: false })

const Shape: FC = () => {
    return (
        <>
            <br />
            <StageComponent />
            <br />
        </>
    )
}

export default Shape