import { Box } from "../../../lib"
import demos from "../../demos"
import Head from "next/head"
import { useMount } from "react-use"
import { useRouter } from "next/router"

const Component = () => {
  const router = useRouter()
  const { component } = router.query

  const Demo = demos[component as string]

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
        <title>{component || "Pijama"}</title>
      </Head>
      <Demo />
    </Box>
  )
}

export default Component
