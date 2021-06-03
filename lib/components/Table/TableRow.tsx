import { ReactNode, VFC } from "react"

export type TableRowProps = {
  children: ReactNode
}

export const TableRow: VFC<TableRowProps> = ({ children }) => (
  <tr>{children}</tr>
)
