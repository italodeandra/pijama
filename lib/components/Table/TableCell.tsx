import { Gray, withTheme } from "../../styles"
import { ReactNode, useContext, VFC } from "react"
import { css } from "@emotion/react"
import { TableHeadContext } from "./TableHead"

export type TableCellProps = {
  children: ReactNode
}

const tableCellStyles = withTheme((theme, sh) =>
  css(
    sh({
      color: Gray.N600,
      fontSize: 14,
      p: [2, 3],
      "table.small &": {
        p: [1, 2],
      },
      textAlign: "left",
      "tr:not(:last-of-type) &": {
        borderBottom: `1px solid ${Gray.N200}`,
      },
    })
  )
)

const tableHeadCellStyles = withTheme((theme, sh) =>
  css(
    sh({
      borderBottom: `1px solid ${Gray.N200}`,
      color: Gray.N500,
      fontSize: 12,
      fontWeight: 500,
      p: [1.5, 3],
      "table.small &": {
        p: [1, 2],
      },
      textAlign: "left",
      textTransform: "uppercase",
    })
  )
)

export const TableCell: VFC<TableCellProps> = ({ children }) => {
  const tableHead = useContext(TableHeadContext)
  const Component = tableHead ? "th" : "td"
  return (
    <Component css={tableHead ? tableHeadCellStyles : tableCellStyles}>
      {children}
    </Component>
  )
}
