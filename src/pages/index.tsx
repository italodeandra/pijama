import { Box, Link } from "../../lib"
import demoList from "../demos"
import exampleList from "../examples"
import Head from "next/head"
import NextLink from "next/link"

const Home = () => {
  const components = Object.keys(demoList)
  const examples = Object.keys(exampleList)

  return (
    <Box sh={{ p: 2 }}>
      <Head>
        <title>Pijama</title>
      </Head>
      <Box sh={{ fontWeight: 500, mb: 2 }}>Components</Box>
      {components.map((component) => (
        <Box key={component} sh={{ mb: 1 }}>
          <NextLink href={`/components/${component}`} passHref>
            <Link>{component}</Link>
          </NextLink>
        </Box>
      ))}
      <Box sh={{ fontWeight: 500, m: [2, 0, 2, 0] }}>Examples</Box>
      {examples.map((example) => (
        <Box key={example} sh={{ mb: 1 }}>
          <NextLink href={`/examples/${example}`} passHref>
            <Link>{example.replace(/-/g, " ")}</Link>
          </NextLink>
        </Box>
      ))}
    </Box>
  )
}

export default Home
