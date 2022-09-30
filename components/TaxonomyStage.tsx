import { FC } from 'react'
import { Stage, Layer, Text, Circle } from 'react-konva';
import { useRouter } from "next/router";

const TaxonomyStage: FC = () => {
    const router = useRouter();
    console.log(router.query);
    const {id} = router.query;
    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ border: '1px solid grey' }}
                >
                <Layer>
                <Text
                // @ts-ignore
                    text={id}
                    fontSize={50}
                    fontStyle='bold italic'
                    x={10}
                    y={10}
                    />
                </Layer>
            </Stage>
        </>
    )
}

export default TaxonomyStage