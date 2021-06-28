import { Box, Theme, useTheme } from "../index"
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition"
import { IMessage, removeNotification } from "./snackbarState"
import { Button } from "../Button/Button"
import { Gray } from "../../styles"
import Icon from "@iconify/react"
import { SxProps } from "../index"
import { TransitionStatus } from "react-transition-group"
import { useMeasure } from "react-use"
import { VFC } from "react"
import xIcon from "@iconify/icons-heroicons-outline/x"

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
  boxShadow: (theme) => theme.shadows[3],
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

export const Message: VFC<{
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
