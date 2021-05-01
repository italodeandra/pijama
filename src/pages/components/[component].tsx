import { Box } from "../../../lib"
import dynamic from "next/dynamic"
import Head from 'next/head'
import { useMemo } from "react"
import { useRouter } from "next/router"

const Component = () => {
  const router = useRouter()
  const { component } = router.query

  const loading = <span>Loading demo...</span>

  const Demo = useMemo(
    () =>
      dynamic(
        () =>
          import(`../../../lib/components/${component}/${component}.demo`).then(
            (mod) => mod[`${component}Demo`]
          ),
        {
          loading: () => loading,
          ssr: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [component]
  )

  return (
    <Box sh={{ p: 2 }}>
      <Head>
        <title>{component}</title>
      </Head>
      {Demo ? <Demo /> : loading}
    </Box>
  )
}

export default Component
