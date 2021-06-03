import { ReactNode, VFC } from "react"

export type TableBodyProps = {
  children: ReactNode
}

export const TableBody: VFC<TableBodyProps> = ({ children }) => (
  <tbody>{children}</tbody>
)
