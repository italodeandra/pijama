import { screen, waitFor } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { useDocumentation } from "./useDocumentation"
import user from "@testing-library/user-event"
import writeText from "copy-to-clipboard"

let mockQuery = {}

// noinspection JSUnusedGlobalSymbols
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    query: mockQuery,
    replace: () => {},
  }),
}))

jest.mock("copy-to-clipboard", () => {
  const original = jest.requireActual("copy-to-clipboard")
  return {
    __esModule: true,
    default: jest.fn(original.default),
  }
})

describe("useDocumentation", () => {
  afterEach(() => {
    ;(writeText as any).mockReset()
  })

  test("should show render a documentation dialog without properties and with a description", async () => {
    renderHook(() =>
      useDocumentation(undefined, undefined, "This is a description")
    )

    const documentation = screen.getByTestId("documentation")

    expect(documentation).toBeInTheDocument()
  })

  test("should update the value from the query", async () => {
    mockQuery = { test: "Test 2", testBool: "true" }

    const { waitForNextUpdate } = renderHook(() =>
      useDocumentation({
        test: {
          description: "This is a description",
          value: "Test",
        },
        testBool: {
          description: "",
          value: false,
        },
      })
    )

    const test2 = screen.getByDisplayValue("Test 2")
    const testBool = screen.getByDisplayValue("true")

    await waitForNextUpdate()

    expect(test2).toBeInTheDocument()
    expect(testBool).toBeInTheDocument()

    mockQuery = {}
  })

  describe("when clicking the copy button", () => {
    test("should copy example", () => {
      const example = "example"
      renderHook(() =>
        useDocumentation(
          {
            test: {
              description: "This is a description",
              value: "Test",
            },
          },
          () => example
        )
      )

      const exampleCopyButton = screen.getByTestId("example-copy-button")

      user.click(exampleCopyButton)

      expect(writeText).toBeCalledTimes(1)
      expect(writeText).toHaveBeenCalledWith(example)
    })

    test("should show error on the tooltip", () => {
      ;(writeText as any).mockImplementationOnce(() => {
        throw Error("This an error")
      })

      const example = "example"
      renderHook(() =>
        useDocumentation(
          {
            test: {
              description: "This is a description",
              value: "Test",
            },
          },
          () => example
        )
      )

      const exampleCopyButton = screen.getByTestId("example-copy-button")

      user.click(exampleCopyButton)

      expect(writeText).toBeCalledTimes(1)
      expect(writeText).toHaveBeenCalledWith(example)

      user.hover(exampleCopyButton)

      const tooltip = screen.getByText("This an error")
      expect(tooltip).toBeInTheDocument()
    })
  })

  describe("when changing values", () => {
    test("should show a select and change hook state value when selecting different option", async () => {
      const { result } = renderHook(() =>
        useDocumentation({
          yesOrNo: {
            description: "",
            options: [true, false, "Other"],
            value: true,
          },
        })
      )

      expect(result.current.yesOrNo).toBe(true)

      const select = screen.getByDisplayValue("True")

      user.click(select)

      user.selectOptions(select, "False")

      await waitFor(() => expect(result.current.yesOrNo).toBe(false))

      user.click(select)

      user.selectOptions(select, "True")

      await waitFor(() => expect(result.current.yesOrNo).toBe(true))

      user.click(select)

      user.selectOptions(select, "Other")

      await waitFor(() => expect(result.current.yesOrNo).toBe("Other"))
    })

    test("should show a field and change hook state value when change the value", async () => {
      const { result } = renderHook(() =>
        useDocumentation({
          name: {
            description: "",
            value: "Ítalo",
          },
        })
      )

      expect(result.current.name).toBe("Ítalo")

      const field = screen.getByDisplayValue("Ítalo")

      user.click(field)
      user.clear(field)
      user.type(field, "Andrade")

      await waitFor(() => expect(result.current.name).toBe("Andrade"))
    })
  })

  test("should not return readOnly or disabled values", async () => {
    const { result } = renderHook(() =>
      useDocumentation({
        thisIsDisabled: {
          description: "",
          disabled: true,
          value: "Disabled",
        },
        thisIsReadonly: {
          description: "",
          readOnly: true,
          value: "Readonly",
        },
      })
    )

    expect(result.current.thisIsDisabled).toBeUndefined()
    expect(result.current.thisIsReadonly).toBeUndefined()
  })
})
