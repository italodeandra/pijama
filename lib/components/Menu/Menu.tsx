import {
  cloneElement,
  FocusEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react"
import { useNumber, useToggle } from "react-use"
import { useTheme, withTheme } from "../../styles"
import { css } from "@emotion/react"
import { Fade } from "../Fade/Fade"
import { Portal } from "../Portal/Portal"

const menuStyles = withTheme((theme, sh) =>
  css(
    sh({
      bgColor: "white",
      br: 0.5,
      outline: "none",
      p: [0.5, 0],
      position: "fixed",
      shadow: "md",
      whiteSpace: "nowrap",
    })
  )
)

export type MenuProps = {
  /**
   * Element that if clicked will toggle the menu.
   */
  children: ReactElement
  /**
   * Placement of the menu.
   * @default bottom
   */
  placement?: "bottom" | "mouse"
  /**
   * Content of the menu.
   */
  options: ReactNode
}

export const Menu: VFC<MenuProps> = ({
  children,
  options,
  placement = "bottom",
}) => {
  const menuTargetRef = useRef<HTMLDivElement>()
  const menuRef = useRef<HTMLDivElement>()

  const [update, { inc: triggerUpdate }] = useNumber()
  const [isOpen, toggleOpen] = useToggle(false)
  const [left, setLeft] = useState<number | undefined>(undefined)
  const [top, setTop] = useState<number | undefined>(undefined)
  const theme = useTheme()

  useEffect(() => {
    const menuRect = menuRef.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    }
    if (placement === "bottom") {
      const menuTargetRect = menuTargetRef.current?.getBoundingClientRect()
      let newLeft =
        menuTargetRect.left + menuTargetRect.width / 2 - menuRect.width / 2
      if (newLeft < 0) {
        newLeft = theme.spacingSize
      }
      if (
        newLeft + menuRect.width + theme.spacingSize >
        window.visualViewport.width
      ) {
        newLeft =
          window.visualViewport.width -
          menuRect.width -
          theme.spacingSize -
          window.scrollX
      }
      let newTop =
        menuTargetRect.top + menuTargetRect.height + theme.spacingSize
      if (newTop < 0) {
        newTop = menuTargetRect.top + menuTargetRect.height
      }
      if (
        newTop + menuRect.height + theme.spacingSize >
        window.visualViewport.height
      ) {
        newTop = menuTargetRect.top - menuRect.height - theme.spacingSize
      }
      setLeft(newLeft)
      setTop(newTop)
    }
  }, [isOpen, theme.spacingSize, placement, update, children])

  const handleMenuClick: MouseEventHandler = (e) => {
    if (placement === "mouse" && !isOpen) {
      setLeft(e.clientX)
      setTop(e.clientY)
    }
    toggleOpen()
    setTimeout(() => {
      menuRef.current?.focus()
    })
  }

  const handleMenuBlur: FocusEventHandler = (e) => {
    if (
      isOpen &&
      !menuRef.current?.contains(e.relatedTarget as Node) &&
      menuTargetRef.current !== e.relatedTarget
    ) {
      toggleOpen(false)
    }
  }

  const handleFocusTrap = () => {
    ;(menuRef.current.children[0] as HTMLElement)?.focus()
  }

  return (
    <>
      {cloneElement(children, {
        onBlur: handleMenuBlur,
        onClick: handleMenuClick,
        ref: menuTargetRef,
      })}
      <Portal>
        <Fade in={isOpen} innerRef={menuRef} onEnter={() => triggerUpdate()}>
          <div
            css={menuStyles}
            onBlur={handleMenuBlur}
            style={{ left, top }}
            tabIndex={1}
          >
            {options}
            <div onFocus={handleFocusTrap} tabIndex={1} />
          </div>
        </Fade>
      </Portal>
    </>
  )
}
