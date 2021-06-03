import { createContext, ReactNode, VFC } from "react"
import { Gray, withTheme } from "../../styles"
import { css } from "@emotion/react"

export type TableHeadProps = {
  children: ReactNode
}

export const TableHeadContext = createContext(false)

const tableHeadStyles = withTheme((theme, sh) =>
  css(
    sh({
      tr: {
        bgColor: Gray.N100,
      },
    })
  )
)

export const TableHead: VFC<TableHeadProps> = ({ children }) => (
  <TableHeadContext.Provider value={true}>
    <thead css={tableHeadStyles}>{children}</thead>
  </TableHeadContext.Provider>
)
