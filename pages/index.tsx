import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'

export default function Home () {
  return (
    <Container large>
      {/* @ts-ignore */}
      <Meta />
      <Hero
        title="MGR"
        subtitle="Curation system for MicroGlycoDB"
        imageOn
      />
    </Container>
  )
}