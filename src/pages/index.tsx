import { Box, Link } from "../../lib"
import Head from 'next/head'
import NextLink from "next/link"
import { useQuery } from "react-query"

const Home = () => {
  const { data: components } = useQuery<string[]>(["/api/listComponentsDemos"])

  return (
    <Box sh={{ p: 2 }}>
      <Head>
        <title>Pijama</title>
      </Head>
      <Box sh={{ fontWeight: 500, mb: 2 }}>Components</Box>
      {components?.map((component) => (
        <Box key={component} sh={{ mb: 1 }}>
          <NextLink href={`/components/${component}`} passHref>
            <Link>{component}</Link>
          </NextLink>
        </Box>
      ))}
    </Box>
  )
}

export default Home
