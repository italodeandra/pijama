import { ComponentShorthandProps, Gray, withTheme } from "../../styles"
import { forwardRef, ReactNode, VFC } from "react"
import { Box } from "../Box/Box"
import { css } from "@emotion/react"

export type TextProps = {
  /**
   * If the text should be a block.
   */
  block?: boolean
  /**
   * If the text should be bold.
   */
  bold?: boolean
  /**
   * If the text should be centered.
   */
  center?: boolean
  /**
   * If the text should be a code.
   */
  code?: boolean
  /**
   * If the text should have ellipsis when too big.
   */
  ellipsis?: boolean
  /**
   * If the text should be a header.
   */
  header?: boolean
  /**
   * If the text should be italic.
   */
  italic?: boolean
  /**
   * If the text should be justified.
   */
  justify?: boolean
  /**
   * If the text should be a paragraph.
   */
  paragraph?: boolean
  /**
   * If should be possible to select the text.
   */
  select?: "all" | boolean
  /**
   * If the text should be a subheader.
   */
  subheader?: boolean

  /**
   * The content of the text.
   */
  children?: ReactNode
} & ComponentShorthandProps

/**
 * Style for texts.
 *
 * [Demo](https://pijama.majapi.com.br/components/Text)
 *
 * @example
 * <Text header>This is a header</Text>
 */
export const Text: VFC<TextProps> = forwardRef(
  (
    {
      children,
      as,

      paragraph,
      subheader,
      header,

      code,
      italic,
      bold,
      select,
      center,
      ellipsis,
      justify,
      block,

      ...props
    },
    ref
  ) => {
    select = typeof select !== "undefined" ? select : true

    if (!as) {
      if (paragraph || header || subheader) {
        as = "div"
      } else if (code && block) {
        as = "pre"
      } else if (code) {
        as = "code"
      }
    }

    const textStyles = withTheme((theme, sh) => {
      let styles = []
      try {
        if (paragraph || subheader || code || header || (code && block)) {
          const autoSpacingStyles = css(
            sh({
              "& + &.header": header
                ? {
                    mt: 4,
                  }
                : {},
              "& + &.subheader": subheader
                ? {
                    mt: 2,
                  }
                : {},
              "&:first-of-type": {
                mt: 0,
              },
              "&:last-of-type": {
                mb: 0,
              },
              m: !paragraph ? [1, 0] : undefined,
            })
          )
          styles.push(autoSpacingStyles)
        }
        if (paragraph || subheader || header || block) {
          const blockStyles = css(
            sh({
              display: "block",
              width: "100%",
            })
          )
          styles.push(blockStyles)
        }
        if (subheader) {
          const subheaderStyles = css(
            sh({
              fontWeight: 600,
            })
          )
          styles.push(subheaderStyles)
        }
        if (header) {
          const subheaderStyles = css(
            sh({
              fontSize: 18,
              fontWeight: 600,
            })
          )
          styles.push(subheaderStyles)
        }
        if (code) {
          const codeStyles = css(
            sh({
              bgColor: Gray.N100,
              boxSizing: "border-box",
              br: 0.5,
              color: Gray.N600,
              fontFamily:
                'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
            })
          )
          styles.push(codeStyles)
        }
        if (code && !block) {
          const codeStyles = css(
            sh({
              maxWidth: "100%",
              overflow: "auto",
              p: [0.5, 0.75],
              verticalAlign: "middle",
            })
          )
          styles.push(codeStyles)
        }
        if (code && block) {
          const codeBlockStyles = css(
            sh({
              "& pre": {
                backgroundColor: "transparent !important",
                border: "none !important",
                m: "0px !important",
                p: "0px !important",
              },
              overflow: "auto",
              p: [0.75, 1],
            })
          )
          styles.push(codeBlockStyles)
        }
        if (italic) {
          const italicStyles = css(
            sh({
              fontStyle: "italic",
            })
          )
          styles.push(italicStyles)
        }
        if (bold) {
          const boldStyles = css(
            sh({
              fontWeight: 500,
            })
          )
          styles.push(boldStyles)
        }
        if (center) {
          const centerStyles = css(
            sh({
              textAlign: "center",
            })
          )
          styles.push(centerStyles)
        }
        if (!select) {
          const noSelectStyles = css(
            sh({
              cursor: "default",
              userSelect: "none",
            })
          )
          styles.push(noSelectStyles)
        }
        if (select === "all") {
          const selectAllStyles = css(
            sh({
              userSelect: "all",
            })
          )
          styles.push(selectAllStyles)
        }
        if (ellipsis) {
          const ellipsisStyles = css(
            sh({
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            })
          )
          styles.push(ellipsisStyles)
        }
        if (justify) {
          const justifyStyles = css(
            sh({
              textAlign: "justify",
            })
          )
          styles.push(justifyStyles)
        }
      } catch (e) {}
      styles.unshift(
        sh({
          color: "rgba(0, 0, 0, 0.76)",
          cursor: "text",
          display: "inline-block",
          position: "relative",
          userSelect: "text",
        })
      )
      return css(styles)
    })

    return (
      <Box
        as={as}
        css={textStyles}
        // sh={(theme) => ({
        //   "& pre": {
        //     backgroundColor: "transparent !important",
        //     m: "0px !important",
        //     p: "0px !important",
        //   },
        //   bgColor: Gray.N100,
        //   br: 0.5,
        //   color: Gray.N600,
        //   display: block ? "block" : "inline-block",
        //   m: 0,
        //   mt: block ? 0 : "-2px",
        //   overflowX: "auto",
        //   p: block ? 2 : [0.25, 0.5],
        //   ...(typeof sh === "function"
        //     ? sh(theme)
        //     : typeof sh === "object"
        //     ? (sh as {})
        //     : {}),
        // })}
        {...props}
        ref={ref}
      >
        {children}
      </Box>
    )
  }
)
