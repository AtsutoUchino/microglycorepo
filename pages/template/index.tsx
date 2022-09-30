import Hero from "components/hero";
import Container from "components/container";
import Meta from "components/meta";
import Taxonomy from "components/taxonomy";
import Staining from "components/staining";
import Shape from "components/shape";

export default function Template() {
    return (
        <Container large>
            {/* @ts-ignore */}
            <Meta pageTitle="Template"/>
            <Hero
                title="Template"
                subtitle="Components to be displayed by default"
                imageOn={false}
            />

            <Taxonomy />
            <Staining />
            <Shape />
        </Container>
    )
}