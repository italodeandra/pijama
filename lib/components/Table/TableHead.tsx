import { createContext, ReactNode, VFC } from "react"

export type TableHeadProps = {
  children: ReactNode
}

export const TableHeadContext = createContext(false)

export const TableHead: VFC<TableHeadProps> = ({ children }) => {
  return (
    <TableHeadContext.Provider value={true}>
      <thead>{children}</thead>
    </TableHeadContext.Provider>
  )
}
