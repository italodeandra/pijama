import { ReactNode, VFC } from "react"
import { css } from "@emotion/react"
import { withTheme } from "../../styles"

export type TableProps = {
  children: ReactNode
  /**
   * What size the table should be.
   * @default normal
   */
  size?: "normal" | "small"
}

const tableStyles = withTheme((theme, sh) =>
  css(
    sh({
      borderSpacing: 0,
      width: "100%",
    })
  )
)

export const Table: VFC<TableProps> = ({ children, size = "normal" }) => (
  <table className={size === "small" ? "small" : ""} css={tableStyles}>
    {children}
  </table>
)
