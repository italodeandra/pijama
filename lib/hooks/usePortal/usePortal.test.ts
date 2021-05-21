import { renderHook } from "@testing-library/react-hooks"
import { usePortal } from "./usePortal"

describe("usePortal", () => {
  test("should append an element to the body", () => {
    const { result } = renderHook(() => usePortal("test"))

    expect(result.current).toBeInTheDocument()
  })

  test("should reuse existing element on different hook", () => {
    const { result } = renderHook(() => [usePortal("test"), usePortal("test")])

    expect(result.current[0].id).toBe(result.current[1].id)
  })

  test("should reuse existing element on same hook rerender", () => {
    const { result, rerender } = renderHook(() => usePortal("test"))

    rerender()

    expect((result.all[0] as HTMLElement).id).toBe(
      (result.all[1] as HTMLElement).id
    )
  })
})
