import { Box, Link, Skeleton } from "../../lib"
import examples from "../examples"
import Head from "next/head"
import NextLink from "next/link"
import { useQuery } from "react-query"

const Home = () => {
  let { data: components, isLoading } = useQuery<string[]>([
    "/api/listComponentsDemos",
  ])

  return (
    <Box sh={{ p: 2 }}>
      <Head>
        <title>Pijama</title>
      </Head>
      <Box sh={{ fontWeight: 500, mb: 2 }}>Components</Box>
      {!components?.length && isLoading && <Skeleton width={20} />}
      {components?.map((component) => (
        <Box key={component} sh={{ mb: 1 }}>
          <NextLink href={`/components/${component}`} passHref>
            <Link>{component}</Link>
          </NextLink>
        </Box>
      ))}
      <Box sh={{ fontWeight: 500, m: [2, 0, 2, 0] }}>Examples</Box>
      {Object.keys(examples).map((example) => (
        <Box key={example} sh={{ mb: 1 }}>
          <NextLink href={`/examples/${example}`} passHref>
            <Link>{example.replace(/-/g, " ")}</Link>
          </NextLink>
        </Box>
      ))}
    </Box>
  )
}

// noinspection JSUnusedGlobalSymbols
export default Home
