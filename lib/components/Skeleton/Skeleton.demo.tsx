import { Skeleton } from "./Skeleton"
import { useDocumentation } from "../../hooks"

export const SkeletonDemo = () => {
  const props = useDocumentation(
    {
      text: {
        description: "If the skeleton should be for a text.",
        options: [true, false],
        value: false,
      },
    },
    ({ text }) => `<Skeleton${text ? ` text` : ""} />`
  )

  return <Skeleton {...props} />
}
