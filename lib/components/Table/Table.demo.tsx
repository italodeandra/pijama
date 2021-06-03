import { Table } from "./Table"
import { TableBody } from "./TableBody"
import { TableCell } from "./TableCell"
import { TableHead } from "./TableHead"
import { TableRow } from "./TableRow"
import { useDocumentation } from "../../hooks"

export const TableDemo = () => {
  const props = useDocumentation({
    size: {
      description: "What size the table should be.",
      options: ["normal", "small"],
      value: "normal",
    },
  })

  return (
    <Table {...props}>
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
        <TableRow>
          <TableCell>Ítalo</TableCell>
          <TableCell>italodeandra@gmail.com</TableCell>
          <TableCell>Ranger</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
