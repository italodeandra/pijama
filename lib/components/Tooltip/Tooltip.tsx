import {
  cloneElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react"
import { Gray, useTheme, withTheme } from "../../styles"
import { useHover, useNumber } from "react-use"
import { css } from "@emotion/react"
import { Fade } from "../Fade/Fade"
import { Portal } from "../Portal/Portal"

const tooltipStyles = withTheme((theme, sh) =>
  css(
    sh({
      bgColor: Gray.N700,
      br: 0.5,
      color: "white",
      fontSize: 12,
      p: [1, 2],
      position: "absolute",
      whiteSpace: "nowrap",
      zIndex: 1
    })
  )
)

export type TooltipProps = {
  /**
   * Element that if hovered will show the tooltip.
   */
  children: ReactElement
  /**
   * Placement of the tooltip.
   * @default bottom
   */
  placement?: "top" | "bottom"
  /**
   * Content of the tooltip.
   */
  title?: string
}

export const Tooltip: VFC<TooltipProps> = ({
  children,
  placement = "bottom",
  title,
}) => {
  const hoverableRef = useRef<HTMLDivElement>()
  const tooltipRef = useRef<HTMLDivElement>()

  const [update, { inc: triggerUpdate }] = useNumber()
  let [hoverable, hovered] = useHover(
    cloneElement(children, { ref: hoverableRef })
  )
  const [left, setLeft] = useState<number | undefined>(undefined)
  const [top, setTop] = useState<number | undefined>(undefined)
  const theme = useTheme()

  useEffect(() => {
    const hoverableRect = hoverableRef.current?.getBoundingClientRect()
    const tooltipRect = tooltipRef.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    }
    let newLeft =
      hoverableRect.left + hoverableRect.width / 2 - tooltipRect.width / 2
    if (newLeft < 0) {
      newLeft = theme.spacingSize
    }
    if (
      newLeft + tooltipRect.width + theme.spacingSize >
      window.visualViewport.width
    ) {
      newLeft =
        window.visualViewport.width -
        tooltipRect.width -
        theme.spacingSize -
        window.scrollX
    }
    let newTop =
      placement === "bottom"
        ? hoverableRect.top + hoverableRect.height + theme.spacingSize
        : hoverableRect.top - tooltipRect.height - theme.spacingSize
    if (newTop < 0) {
      newTop = hoverableRect.top + hoverableRect.height + theme.spacingSize
    }
    if (
      newTop + tooltipRect.height + theme.spacingSize >
      window.visualViewport.height
    ) {
      newTop =
        placement !== "bottom"
          ? window.visualViewport.height -
            tooltipRect.height -
            theme.spacingSize
          : hoverableRect.top - tooltipRect.height - theme.spacingSize
    }
    setLeft(newLeft)
    setTop(newTop)
  }, [hovered, theme.spacingSize, placement, update, children])

  return (
    <>
      {hoverable}
      <Portal>
        <Fade
          in={hovered && !!title}
          innerRef={tooltipRef}
          onEnter={() => triggerUpdate()}
        >
          <div css={tooltipStyles} style={{ left, top }}>
            {title}
          </div>
        </Fade>
      </Portal>
    </>
  )
}
