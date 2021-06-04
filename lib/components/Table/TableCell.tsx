import { ComponentShorthandProps, Gray, withTheme } from "../../styles"
import { ReactNode, useContext, useMemo, VFC } from "react"
import { Box } from "../Box/Box"
import { css } from "@emotion/react"
import { TableHeadContext } from "./TableHead"

export type TableCellProps = {
  children: ReactNode
  align?: "left" | "center" | "right"
} & ComponentShorthandProps

export const TableCell: VFC<TableCellProps> = ({
  children,
  align = "left",
  sh: shProp,
  ...props
}) => {
  const isTableHead = useContext(TableHeadContext)

  const tableCellStyles = useMemo(
    () =>
      withTheme((theme, sh) => {
        let styles = []
        if (!isTableHead) {
          const tableBodyCellStyles = css(
            sh({
              color: Gray.N600,
              fontSize: 14,
              p: [2, 3],
              "table.small &": {
                p: [1, 2],
              },
              "tr:not(:last-of-type) &": {
                borderBottom: `1px solid ${Gray.N200}`,
              },
            })
          )
          styles.push(tableBodyCellStyles)
        } else {
          const tableHeadCellStyles = css(
            sh({
              borderBottom: `1px solid ${Gray.N200}`,
              color: Gray.N500,
              fontSize: 12,
              fontWeight: 500,
              p: [1.5, 3],
              "table.small &": {
                p: [1, 2],
              },
              textTransform: "uppercase",
            })
          )
          styles.push(tableHeadCellStyles)
        }

        styles.unshift(
          sh({
            textAlign: align,
          })
        )

        if (shProp) {
          styles.push(
            typeof shProp === "function" ? sh(shProp(theme)) : sh(shProp)
          )
        }

        return css(styles)
      }),
    [isTableHead, align, shProp]
  )

  return (
    <Box as={isTableHead ? "th" : "td"} css={tableCellStyles} {...props}>
      {children}
    </Box>
  )
}
