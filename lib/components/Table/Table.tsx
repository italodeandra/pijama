import { ReactNode, VFC } from "react"
import { css } from "@emotion/react"
import { withTheme } from "../../styles"

export type TableProps = {
  children: ReactNode
}

const tableStyles = withTheme((theme, sh) =>
  css(
    sh({
      width: "100%",
    })
  )
)

export const Table: VFC<TableProps> = ({ children }) => (
  <table css={tableStyles}>{children}</table>
)
