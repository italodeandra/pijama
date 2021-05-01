import { Box, Button, TextField, Tooltip } from "../components"
import { proxy, useSnapshot } from "valtio"
import { useDeepCompareEffect, useUnmount, useUpdateEffect } from "react-use"
import { useEffect, useRef } from "react"
import clipboardCopy from "@iconify/icons-heroicons-outline/clipboard-copy"
import { Gray } from "../styles"
import Icon from "@iconify/react"
import { mapValues } from "lodash"
import { render } from "react-dom"
import { useCopyToClipboard } from "./useCopyToClipboard"
import { useRouter } from "next/router"

const getComponentName = () => window.location.pathname.split("/").pop()

export const useDocumentation = (properties, example) => {
  const router = useRouter()
  const modalRef = useRef(document.createElement("div"))
  const state = useRef(
    proxy(
      mapValues(properties, (p) =>
        !p.readOnly && !p.disabled ? p.value : undefined
      )
    )
  )
  const snap = useSnapshot(state.current)

  useUpdateEffect(() => {
    void router.replace(
      `${window.location.pathname}?state=${JSON.stringify(snap)}`
    )
  }, [snap])

  useEffect(() => {
    try {
      Object.assign(
        state.current,
        JSON.parse((router.query.state as string) || "{}")
      )
    } catch (e) {
      void router.replace(window.location.pathname)
    }
  }, [router])

  useDeepCompareEffect(() => {
    const ref = modalRef.current

    document.body.appendChild(ref)

    const Documentation = () => {
      const [clipboard, copyToClipboard, resetClipboard] = useCopyToClipboard()
      const snap = useSnapshot(state.current)

      return (
        <Box
          onMouseLeave={resetClipboard}
          sh={(theme) => ({
            bgColor: "white",
            border: `1px solid ${Gray.N50}`,
            br: 0.5,
            display: "flex",
            flexDirection: "column",
            maxH: `calc(100vh - ${theme.spacing(4)})`,
            pos: [2, 2, "", ""],
            shadow: "md",
            width: 30,
          })}
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
          <Box
            sh={{
              overflowY: "auto",
              p: [0, 2],
            }}
          >
            {Object.keys(properties).map((key) => (
              <TextField
                key={key}
                label={
                  <Tooltip title={properties[key].description}>
                    <span>{key}</span>
                  </Tooltip>
                }
                name={key}
                onChangeValue={(value) => {
                  value =
                    typeof snap[key] === "boolean" ? value === "true" : value
                  return (state.current[key] = value)
                }}
                readOnly={properties[key].readOnly}
                select={!!properties[key].options}
                sh={{ mb: 2 }}
                value={
                  !properties[key].readOnly
                    ? typeof snap[key] === "boolean"
                      ? snap[key]
                        ? "true"
                        : "false"
                      : snap[key]
                    : properties[key].value
                }
              >
                {properties[key].options?.map((o) => (
                  <option key={o} value={o}>
                    {typeof o === "boolean" ? (o ? "True" : "False") : o}
                  </option>
                ))}
              </TextField>
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
