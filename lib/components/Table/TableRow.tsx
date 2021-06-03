import { ReactNode, VFC } from "react"
import { css } from "@emotion/react"
import { withTheme } from "../../styles"

export type TableRowProps = {
  children: ReactNode
}

const tableRowStyles = withTheme((theme, sh) =>
  css(
    sh({
      td: {},
    })
  )
)

export const TableRow: VFC<TableRowProps> = ({ children }) => (
  <tr css={tableRowStyles}>{children}</tr>
)
