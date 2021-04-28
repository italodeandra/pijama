import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition"
import { Gray, useTheme, withTheme } from "../../styles"
import { IMessage, removeNotification, snackbarState } from "./snackbarState"
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group"
import { Button } from "../Button/Button"
import { css } from "@emotion/react"
import { Fade } from "../Fade/Fade"
import Icon from "@iconify/react"
import { useMeasure } from "react-use"
import { useSnapshot } from "valtio"
import { VFC } from "react"
import xIcon from "./icons/x"

export type SnackbarProps = {}

const snackbarContainerStyles = withTheme((theme, sh) =>
  css(
    sh({
      margin: [0, -1, -1, -1],
      overflow: "hidden",
      p: [2, 2, "", ""],
      pos: [0, 0, "", ""],
      position: "fixed",
      zIndex: 2,
    })
  )
)

const snackbarStyles = withTheme((theme, sh) =>
  css(
    sh({
      height: 0,
      transform: "translateX(120%)",
      transition: ["height", "transform"],
    })
  )
)

const innerSnackbarStyles = withTheme((theme, sh) =>
  css(
    sh({
      "& > span": {
        fontFamily: theme.typography.fontFamily,
        fontSize: 13,
        fontWeight: 500,
      },
      "&::before": {
        border: `1px solid ${Gray.N100}`,
        br: "inherit",
        pos: 0,
      },
      alignItems: "center",
      bgColor: "white",
      boxShadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`,
      br: 0.5,
      display: "flex",
      m: [0, 1, 1, 1],
      p: 2,
      position: "relative",
    })
  )
)

const closeButtonStyles = withTheme((theme, sh) =>
  css(
    sh({
      fontSize: 16,
      minH: 3,
      minW: 3,
      ml: 2,
    })
  )
)

const Message: VFC<{
  message: IMessage
  state: TransitionStatus
}> = ({ message, state }) => {
  const [ref, { height }] = useMeasure()
  const theme = useTheme()

  const autoHeightStyles = {
    height: [ENTERING, ENTERED].includes(state) ? height : 0,
  }

  const transitions = {
    /* eslint-disable sort-keys */
    [ENTERED]: {
      transform: "translateX(0%)",
      transitionDelay: `${theme.transition.duration}ms, 0ms`,
    },
    [EXITING]: {
      transform: "translateX(120%)",
      transitionDelay: `${theme.transition.duration}ms, 0ms`,
    },
    [EXITED]: { transform: "translateX(120%)" },
  }

  return (
    <div
      css={snackbarStyles}
      ref={message.nodeRef}
      style={{
        ...transitions[state],
        ...autoHeightStyles,
      }}
    >
      <div css={css({ overflow: "hidden" })} ref={ref}>
        <div css={innerSnackbarStyles}>
          <span>{message.content}</span>
          <Button
            color={Gray.N500}
            css={closeButtonStyles}
            icon
            onClick={() => removeNotification(message.id)}
            variant={"text"}
          >
            <Icon icon={xIcon} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Snackbar: VFC<SnackbarProps> = () => {
  const { messages } = useSnapshot(snackbarState)
  const theme = useTheme()

  return (
    <Fade in={!!messages.length}>
      <div css={snackbarContainerStyles}>
        <TransitionGroup>
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <Transition
                appear
                key={message.id}
                nodeRef={message.nodeRef}
                timeout={{
                  enter: theme.transition.duration,
                  exit: theme.transition.duration * 2,
                }}
              >
                {(state) => <Message message={message} state={state} />}
              </Transition>
            ))}
        </TransitionGroup>
      </div>
    </Fade>
  )
}
