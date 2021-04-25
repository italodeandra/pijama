import { Gray, useTheme, withTheme } from "../../styles"
import {
  ReactElement,
  VFC,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react"
import { Fade } from "../Fade/Fade"
import { createPortal } from "react-dom"
import { css } from "@emotion/react"
import { useHover } from "react-use"
import useMeasureDirty from "react-use/lib/useMeasureDirty"

const tooltipStyles = withTheme((theme, sh) =>
  css(
    sh({
      bgColor: Gray.N700,
      br: 0.5,
      color: "white",
      fontSize: 12,
      p: [1, 2],
      position: "absolute",
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
  const hoverableMeasure = useMeasureDirty(hoverableRef)
  const tooltipMeasure = useMeasureDirty(tooltipRef)
  let [hoverable, hovered] = useHover(
    cloneElement(children, { ref: hoverableRef })
  )
  const [position, setPosition] = useState({})
  const theme = useTheme()

  useEffect(() => {
    const hoverableRect = hoverableRef.current?.getBoundingClientRect()
    const tooltipRect = tooltipRef.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    }
    let left =
      hoverableRect.left + hoverableRect.width / 2 - tooltipRect.width / 2
    if (left < 0) {
      left = theme.spacingSize
    }
    let top =
      placement === "bottom"
        ? hoverableRect.top + hoverableRect.height + theme.spacingSize
        : hoverableRect.top - tooltipRect.height - theme.spacingSize
    if (top < 0) {
      top = hoverableRect.top + hoverableRect.height + theme.spacingSize
    }
    if (
      top + tooltipRect.height + theme.spacingSize >
      window.visualViewport.height
    ) {
      top =
        hoverableRect.top -
        tooltipRect.height -
        theme.spacingSize +
        window.scrollY
    }
    setPosition({
      left,
      top,
    })
  }, [hovered, hoverableMeasure, tooltipMeasure, theme.spacingSize, placement])

  return (
    <>
      {hoverable}
      {createPortal(
        <Fade in={hovered && !!title} innerRef={tooltipRef}>
          <div css={tooltipStyles} style={position}>
            {title}
          </div>
        </Fade>,
        document.body
      )}
    </>
  )
}
