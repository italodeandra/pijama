import { ENTERED, EXITED, EXITING } from "react-transition-group/Transition"
import { ReactElement, Ref, VFC, cloneElement, useRef } from "react"
import { Transition } from "react-transition-group"
import { useTheme } from "../../styles"

const transitions = {
  /* eslint-disable sort-keys */
  [ENTERED]: {
    opacity: 1,
  },
  [EXITING]: {
    opacity: 0,
  },
  [EXITED]: {
    opacity: 0,
  },
}

export type FadeProps = {
  /**
   * If the content should be un-faded.
   */
  in: boolean
  /**
   * React Element that will receive the fade animation.
   */
  children: ReactElement
  /**
   * Access the ref from the outside.
   */
  innerRef?: Ref<HTMLDivElement>
}

export const Fade: VFC<FadeProps> = ({ children, in: inProp, innerRef }) => {
  const theme = useTheme()
  const nodeRef = useRef<HTMLDivElement>()

  const fadeStyles = theme.shorthand({
    opacity: 0,
    transition: ["opacity"],
  }) as object

  return (
    <Transition
      appear
      in={inProp}
      mountOnEnter
      nodeRef={innerRef || nodeRef}
      timeout={{
        enter: 1,
        exit: theme.transition.duration,
      }}
      unmountOnExit
    >
      {(state) =>
        cloneElement(children, {
          ref: innerRef || nodeRef,
          style: {
            ...children.props.style,
            ...fadeStyles,
            ...transitions[state],
          },
        })
      }
    </Transition>
  )
}
