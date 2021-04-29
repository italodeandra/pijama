import dynamic from "next/dynamic"

const Home = () => {
  const Demo = dynamic(() => import("../../lib/components/Box/BoxDemo"))

  return (
    <>
      <Demo />
    </>
  )
}

export default Home
