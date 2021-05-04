import { Box, Button, TextField, Tooltip } from "../components"
import { proxy, useSnapshot } from "valtio"
import { useEffect, useRef } from "react"
import { useMount, useUnmount, useUpdateEffect } from "react-use"
import clipboardCopy from "@iconify/icons-heroicons-outline/clipboard-copy"
import { Gray } from "../styles"
import Icon from "@iconify/react"
import { mapValues } from "lodash"
import qs from "qs"
import { render } from "react-dom"
import { useCopyToClipboard } from "./useCopyToClipboard"
import { useRouter } from "next/router"

const getComponentName = () =>
  window.location.pathname.split("/").pop().replace(/-/g, " ")

export type UseDocumentation = <
  P extends {
    [key: string]: {
      description: string
      disabled?: boolean
      options?: any[]
      readOnly?: boolean
      value: any
    }
  }
>(
  properties: P,
  example: (values: { [key: string]: any }) => string,
  description?: string
) => any

export const useDocumentation: UseDocumentation = (
  properties,
  example,
  description
) => {
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
    void router.replace(`${window.location.pathname}?${qs.stringify(snap)}`)
  }, [snap])

  useMount(() => {
    const { component, example, ...newQueries } = router.query
    try {
      Object.keys(newQueries).forEach((k) => {
        if (
          typeof newQueries[k] === "string" &&
          typeof state.current[k] === "boolean"
        ) {
          // @ts-ignore
          state.current[k] = newQueries[k] === "true"
        } else {
          // @ts-ignore
          state.current[k] = newQueries[k]
        }
      })
    } catch (e) {
      void router.replace(window.location.pathname)
    }
  })

  useEffect(() => {
    const ref = modalRef.current

    document.body.appendChild(ref)

    const Documentation = () => {
      const [clipboard, copyToClipboard, resetClipboard] = useCopyToClipboard()
      const snap = useSnapshot(state.current)

      const keys = Object.keys(properties)

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
            <Box sh={{ m: "-6px -6px -7px auto" }}>
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
          {description && (
            <Box sh={{ color: "textSecondary", m: [0, 2, 2, 2] }}>
              {description}
            </Box>
          )}
          {!!keys.length && (
            <Box
              sh={{
                overflowY: "auto",
                p: [0, 2],
              }}
            >
              {keys.map((key) => (
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
                    // @ts-ignore
                    return (state.current[key] = value)
                  }}
                  readOnly={properties[key].readOnly}
                  sh={{ mb: 2 }}
                  type={!!properties[key].options ? "select" : undefined}
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
          )}
        </Box>
      )
    }

    render(<Documentation />, modalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.keys(properties)])

  useUnmount(() => {
    modalRef.current.remove()
  })

  return snap
}
