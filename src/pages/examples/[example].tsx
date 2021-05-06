import { Box } from "../../../lib"
import examples from "../../examples"
import Head from "next/head"
import { useMount } from "react-use"
import { useRouter } from "next/router"

const Example = () => {
  const router = useRouter()
  const { example } = router.query

  const Demo = examples[example as string] || (() => null)

  useMount(() => {
    if (!Demo) {
      void router.replace("/")
    }
  })

  if (!Demo) {
    return null
  }

  return (
    <Box sh={{ p: 2 }}>
      <Head>
        <title>{(example as string)?.replace(/-/g, " ") || "Pijama"}</title>
      </Head>
      <Demo />
    </Box>
  )
}

export default Example
