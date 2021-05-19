// eslint-disable-next-line no-restricted-imports
import * as reactUse from "react-use"
import { act, render, screen, waitFor } from "@testing-library/react"
import { nprogress, nprogressState } from "./nprogressState"
import { NProgress } from "./NProgress"
import { Router } from "next/router"
import { useEffect } from "react"

describe("NProgress", () => {
  beforeEach(() => {
    nprogressState.progress = null
  })

  const setup = async () => {
    render(<NProgress />)

    let nprogressBar = screen.queryByTestId("nprogress")

    expect(nprogressBar).not.toBeInTheDocument()

    await act(async () => nprogress.start())

    nprogressBar = await screen.findByTestId("nprogress")

    return {
      nprogressBar,
    }
  }

  test("should start it's progress and then force its end", async () => {
    const { nprogressBar } = await setup()

    expect(nprogressBar).toBeInTheDocument()

    await act(async () => nprogress.end())

    await waitFor(() => expect(nprogressBar).not.toBeInTheDocument())
  })

  test("should start it's progress and wait it to finish it automatically", async () => {
    const useDebounceSpy = jest
      .spyOn(reactUse, "useDebounce")
      .mockImplementation(((fn, ms, deps) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(fn, deps)
      }) as any)

    const { nprogressBar } = await setup()

    expect(nprogressBar).toBeInTheDocument()

    useDebounceSpy.mockRestore()
  })

  test("try to end progress before it starts", async () => {
    render(<NProgress />)

    let nprogressBar = screen.queryByTestId("nprogress")

    expect(nprogressBar).not.toBeInTheDocument()

    await act(async () => nprogress.end())

    await waitFor(() => expect(nprogressBar).not.toBeInTheDocument())
  })

  test("simulate NextJS router events", async () => {
    render(<NProgress />)

    await act(async () => {
      Router.events.emit("routeChangeStart")
    })

    let nprogressBar = await screen.findByTestId("nprogress")
    expect(nprogressBar).toBeInTheDocument()

    await act(async () => {
      Router.events.emit("routeChangeComplete")
      Router.events.emit("routeChangeError")
    })

    await waitFor(() => expect(nprogressBar).not.toBeInTheDocument())
  })
})
