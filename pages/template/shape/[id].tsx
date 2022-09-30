import { useRouter } from "next/router";
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

// export async function getStaticProps({ params }: any) {
//     const req = await fetch(`http://localhost:3000/json/template/shape/${params.id}.json`);
//     const data = await req.json();

//     return {
//         props: {
//             shape: data,
//         },
//     };
// }

// export async function getStaticPaths({ params }: any) {
//     const req = await fetch(`http://localhost:3000/json/template/shape/shape.json`);
//     const data = await req.json();

//     const paths = data.map(shape => {
//         return {
//             params: {
//                 id: shape,
//             }
//         }
//     })

//     return {
//         paths,
//         fallback: false,
//     };
// }

// const Shape = ({ shape }: any) => {
//     const router = useRouter();
//     // console.log(router.query);
//     const {id} = router.query;
//     // console.log(shape);
//     return (
//         <div>
//             <h2>select: {id}</h2>
//             <img src={shape.image} alt="" width="500" height="500" />
//         </div>
//     );
// }

// export default Shape;

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