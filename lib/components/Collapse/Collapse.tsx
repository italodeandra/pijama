import {
  ENTERED,
  ENTERING,
  EnterHandler,
  ExitHandler,
} from "react-transition-group/Transition"
import { ReactElement, Ref, VFC, useRef } from "react"
import { Transition, TransitionStatus } from "react-transition-group"
import { useTheme, withTheme } from "../../styles"
import { css } from "@emotion/react"
import { useMeasure } from "react-use"

const collapseStyles = withTheme((theme, sh) =>
  css(
    sh({
      overflow: "hidden",
      transition: ["height"],
    })
  )
)

const CollapseTransition: VFC<{
  state: TransitionStatus
  nodeRef: Ref<HTMLDivElement>
  className?: string
  children: ReactElement
}> = ({ children, nodeRef, state, className }) => {
  const [ref, { height }] = useMeasure()

  const autoHeightStyles = {
    height: [ENTERING, ENTERED].includes(state) ? height : 0,
  }

  return (
    <div
      className={className}
      css={collapseStyles}
      ref={nodeRef}
      style={autoHeightStyles}
    >
      <div ref={ref}>{children}</div>
    </div>
  )
}

export type CollapseProps = {
  /**
   * Element that will be collapsed.
   */
  children: ReactElement
  /**
   * If the content should be collapsed.
   */
  in: boolean
  /**
   * Enter event handler.
   */
  onEnter?: EnterHandler<HTMLDivElement>
  /**
   * Entered event handler.
   */
  onEntered?: EnterHandler<HTMLDivElement>
  /**
   * Entering event handler.
   */
  onEntering?: EnterHandler<HTMLDivElement>
  /**
   * Exit event handler.
   */
  onExited?: ExitHandler<HTMLDivElement>
  /**
   * Exiting event handler.
   */
  onExiting?: ExitHandler<HTMLDivElement>
}

export const Collapse: VFC<CollapseProps> = ({
  children,
  in: inProp,
  onEnter,
  onEntered,
  onEntering,
  onExited,
  onExiting,
  ...props
}) => {
  const theme = useTheme()
  const nodeRef = useRef<HTMLDivElement>()

  return (
    <Transition
      appear
      in={inProp}
      mountOnEnter
      nodeRef={nodeRef}
      onEnter={onEnter}
      onEntered={onEntered}
      onEntering={onEntering}
      onExited={onExited}
      onExiting={onExiting}
      timeout={theme.transition.duration}
      unmountOnExit
    >
      {(state) => (
        <CollapseTransition nodeRef={nodeRef} state={state} {...props}>
          {children}
        </CollapseTransition>
      )}
    </Transition>
  )
}
