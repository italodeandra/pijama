import dynamic from "next/dynamic"
import { useRouter } from "next/router"

const Component = () => {
  const router = useRouter()
  const { component } = router.query
  const Demo = dynamic(
    () => import(`../../../lib/components/${component}/${component}Demo`)
  )

  return (
    <>
      <Demo />
    </>
  )
}

export default Component
