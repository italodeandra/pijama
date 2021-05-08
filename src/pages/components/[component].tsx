import { Box } from "../../../lib"
import demos from "../../demos"
import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Component = () => {
  const router = useRouter()
  const { component } = router.query

  const Demo = demos[component as string]

  useEffect(() => {
    if (component && !Demo) {
      void router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component])

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
