import dynamic from 'next/dynamic'
import { FC } from 'react'

const StageComponent = dynamic(() => import('components/StainingStage'), { ssr: false })

const Staining: FC = () => {
    return (
        <>
            <br />
            <StageComponent />
            <br />
        </>
    )
}

export default Staining