import { ReactNode, useContext, VFC } from "react"
import { css } from "@emotion/react"
import { TableHeadContext } from "./TableHead"
import { withTheme } from "../../styles"

export type TableCellProps = {
  children: ReactNode
}

const tableCellStyles = withTheme((theme, sh) =>
  css(
    sh({
      textAlign: "left",
    })
  )
)

export const TableCell: VFC<TableCellProps> = ({ children }) => {
  const tableHead = useContext(TableHeadContext)
  const Component = tableHead ? "th" : "td"
  return <Component css={tableCellStyles}>{children}</Component>
}
