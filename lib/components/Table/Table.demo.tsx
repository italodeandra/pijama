import { Table } from "./Table"
import { TableBody } from "./TableBody"
import { TableCell } from "./TableCell"
import { TableHead } from "./TableHead"
import { TableRow } from "./TableRow"
import { useDocumentation } from "../../hooks"

export const TableDemo = () => {
  useDocumentation()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Class</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Ítalo</TableCell>
          <TableCell>italodeandra@gmail.com</TableCell>
          <TableCell>Ranger</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
