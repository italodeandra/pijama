import { renderHook } from "@testing-library/react-hooks"
import { useBreakpoint } from "./useBreakpoint"

let mockUseMediaResponse = true

// noinspection JSUnusedGlobalSymbols
jest.mock("react-use", () => ({
  useMedia: () => mockUseMediaResponse,
}))

describe("useBreakpoint", () => {
  test("should return true for screen that fit the breakpoint", () => {
    const { result } = renderHook(() => useBreakpoint("sm"))
    expect(result.current).toBe(true)
  })

  test("should return true for screen that fit the breakpoint", () => {
    mockUseMediaResponse = false
    const { result } = renderHook(() => useBreakpoint("lg"))
    expect(result.current).toBe(false)
  })
})
