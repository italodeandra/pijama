import { Box } from "../../../lib"
import dynamic from "next/dynamic"
import examples from "../../examples"
import Head from "next/head"
import { useRouter } from "next/router"

const Example = () => {
  const router = useRouter()
  const { example } = router.query

  const Demo = examples[example as string] || (() => null)

  return (
    <Box sh={{ p: 2 }}>
      <Head>
        <title>{(example as string)?.replace(/-/g, " ") || "Pijama"}</title>
      </Head>
      <Demo />
    </Box>
  )
}

// noinspection JSUnusedGlobalSymbols
export default dynamic(() => Promise.resolve(Example), {
  ssr: false,
})
