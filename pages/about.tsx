import Head from "next/head";
import Hero from "components/hero";
import Container from "components/container";
import PostBody from "components/post-body";
import Contact from "components/contact";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "components/two-column";
import Meta from "components/meta";
import eyecatch from 'images/about.jpg'

export default function About() {
    return (
        <Container large>
            <Meta
                pageTitle="About"
                pageDesc=""
                pageImg=""
                pageImgW={200}
                pageImgH={200}
            />
            <Hero
                title="About"
                subtitle="About application contents"
                imageOn={false}
            />

            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                    <h1>What is MicroGlycoRepo?</h1>
                    <p>This system can introduce glycan-related information of microorganisms into MicroGlycoDB.</p>
                    <h1>What you can do</h1>
                    <p>You can create diagrams and data that you want to introduce into MicroGlycoDB.</p>
                    <p>Template: You will be provided, by default, with a template of your choice to draw from.</p>
                    <p>New create: You can start drawing from a blank campus.</p>
                    <h1>Acknowledgement</h1>

                    </PostBody>
                </TwoColumnMain>
                <TwoColumnSidebar>
                    <Contact />
                </TwoColumnSidebar>
            </TwoColumn>
        </Container>
    )
}