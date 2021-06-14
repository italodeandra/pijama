import { Box, Fade, Theme, useTheme } from "@material-ui/core"
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition"
import { IMessage, removeNotification, snackbarState } from "./snackbarState"
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group"
import { useEffect, useState, VFC } from "react"
import { Button } from "../Button/Button"
import { Gray } from "../../styles"
import Icon from "@iconify/react"
import { SxProps } from "@material-ui/system"
import { useMeasure } from "react-use"
import { useSnapshot } from "valtio"
import xIcon from "@iconify/icons-heroicons-outline/x"

export type SnackbarProps = {}

const snackbarContainerStyles: SxProps<Theme> = {
  margin: (theme) => theme.spacing(0, -1, -1, -1),
  overflow: "hidden",
  padding: (theme) => theme.spacing(2, 2, "", ""),
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: (theme) => theme.zIndex.appBar + 1,
}

const snackbarStyles: SxProps<Theme> = {
  height: 0,
  transform: "translateX(120%)",
  transition: (theme) => theme.transitions.create(["height", "transform"]),
}

const innerSnackbarStyles: SxProps<Theme> = {
  "& > span": {
    fontFamily: (theme) => theme.typography.fontFamily,
    fontSize: (theme) => theme.typography.pxToRem(13),
    fontWeight: 500,
  },
  "&::before": {
    border: `1px solid ${Gray.N100}`,
    borderRadius: "inherit",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: (theme) => theme.spacing(0.5),
  boxShadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`,
  display: "flex",
  margin: (theme) => theme.spacing(0, 1, 1, 1),
  padding: (theme) => theme.spacing(2),
  position: "relative",
}

const closeButtonStyles: SxProps<Theme> = {
  color: Gray.N500,
  fontSize: (theme) => theme.typography.pxToRem(16),
  minWidth: 0,
  ml: 2,
  p: 0.5,
}

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
      transitionDelay: `${theme.transitions.duration.enteringScreen}ms, 0ms`,
    },
    [EXITING]: {
      transform: "translateX(120%)",
      transitionDelay: `${theme.transitions.duration.leavingScreen}ms, 0ms`,
    },
    [EXITED]: { transform: "translateX(120%)" },
  }

  return (
    <Box
      ref={message.nodeRef}
      style={{
        ...transitions[state],
        ...autoHeightStyles,
      }}
      sx={snackbarStyles}
    >
      <Box overflow="hidden" ref={ref}>
        <Box sx={innerSnackbarStyles}>
          <span>{message.content}</span>
          <Button
            data-testid="remove"
            onClick={() => removeNotification(message.id)}
            sx={closeButtonStyles}
            variant="text"
          >
            <Icon icon={xIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * A snackbar that shows up in the top right of the page. The messages are
 * created by using it's API `notify` or `removeNotification`.
 *
 * [Demo](https://pijama.majapi.com.br/?path=/story/components-snackbar--snackbar)
 */
export const Snackbar: VFC<SnackbarProps> = () => {
  const { messages } = useSnapshot(snackbarState)
  const theme = useTheme()

  const [top, setTop] = useState(0)

  useEffect(() => {
    const newTop =
      document.querySelector(".MuiAppBar-root")?.getBoundingClientRect()
        .height || 0
    setTop(newTop)
  }, [messages])

  return (
    <Fade in={!!messages.length}>
      <Box style={{ top }} sx={snackbarContainerStyles}>
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
                  enter: theme.transitions.duration.enteringScreen,
                  exit: theme.transitions.duration.leavingScreen * 2,
                }}
              >
                {(state) => <Message message={message} state={state} />}
              </Transition>
            ))}
        </TransitionGroup>
      </Box>
    </Fade>
  )
}
