import snackbarState, { IMessage } from "./snackbarState"
import { Transition, TransitionGroup } from "react-transition-group"
import { useEffect, useState, VFC } from "react"
import Box from "@material-ui/core/Box"
import Fade from "@material-ui/core/Fade"
import Message from "./Message"
import type { SxProps } from "@material-ui/system/styleFunctionSx"
import type { Theme } from "@material-ui/core/styles"
import { useSnapshot } from "valtio"
import { useTheme } from "@material-ui/core/styles"

const snackbarContainerStyles: SxProps<Theme> = {
  margin: (theme) => theme.spacing(0, -1, -1, -1),
  overflow: "hidden",
  padding: (theme) => theme.spacing(2, 2, "", ""),
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: (theme) => theme.zIndex.appBar + 1,
}

export interface SnackbarProps {}

/**
 * A snackbar that shows up in the top right of the page. The messages are
 * created by using it's API `notify` or `removeNotification`.
 *
 * [Demo](https://pijama.majapi.com/?path=/story/components-snackbar--snackbar)
 */
const Snackbar: VFC<SnackbarProps> = () => {
  const { messages } = useSnapshot(snackbarState) as { messages: IMessage[] }
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

export default Snackbar
