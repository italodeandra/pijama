import { Box, Button, TextField, Tooltip } from "../components"
import { proxy, useSnapshot } from "valtio"
import { useDeepCompareEffect, useUnmount } from "react-use"
import clipboardCopy from "@iconify/icons-heroicons-outline/clipboard-copy"
import { Gray } from "../styles"
import Icon from "@iconify/react"
import { mapValues } from "lodash"
import { render } from "react-dom"
import { useCopyToClipboard } from "./useCopyToClipboard"
import { useRef } from "react"

const getComponentName = () => window.location.pathname.split("/").pop()

export const useDocumentation = (properties, example) => {
  const modalRef = useRef(document.createElement("div"))
  const state = useRef(proxy(mapValues(properties, (p) => p.value)))
  const snap = useSnapshot(state.current)

  useDeepCompareEffect(() => {
    const ref = modalRef.current

    document.body.appendChild(ref)

    const Documentation = () => {
      const [clipboard, copyToClipboard, resetClipboard] = useCopyToClipboard()
      const snap = useSnapshot(state.current)

      return (
        <Box
          onMouseLeave={resetClipboard}
          sh={{
            bgColor: "white",
            border: `1px solid ${Gray.N50}`,
            br: 0.5,
            pos: [2, 2, "", ""],
            shadow: "md",
          }}
        >
          <Box sh={{ display: "flex", p: 2 }}>
            {getComponentName()}{" "}
            <Box sh={{ m: [-1, -1, 0, "auto"] }}>
              <Tooltip
                title={
                  clipboard.error
                    ? clipboard.error.message
                    : clipboard.value
                    ? "Example copied"
                    : "Copy component example"
                }
              >
                <Button
                  icon
                  onClick={() => copyToClipboard(example(snap))}
                  size="small"
                  variant="text"
                >
                  <Icon icon={clipboardCopy} />
                </Button>
              </Tooltip>
            </Box>
          </Box>
          <Box sh={{ p: [0, 2] }}>
            {Object.keys(properties).map((key) => (
              <TextField
                key={key}
                label={
                  <Tooltip title={properties[key].description}>
                    <span>{key}</span>
                  </Tooltip>
                }
                name={key}
                onChangeValue={(value) => (state.current[key] = value)}
                sh={{ mb: 2 }}
                value={snap[key]}
              />
            ))}
          </Box>
        </Box>
      )
    }

    render(<Documentation />, modalRef.current)
  }, [properties])

  useUnmount(() => {
    modalRef.current.remove()
  })

  return snap
}
