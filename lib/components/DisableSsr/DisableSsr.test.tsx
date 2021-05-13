// eslint-disable-next-line no-restricted-imports
import * as reactUse from "react-use"
import { render, screen } from "@testing-library/react"
import { DisableSsr } from "./DisableSsr"

describe("DisableSsr", () => {
  test("should print nothing before layoutEffect", () => {
    jest
      .spyOn(reactUse, "useIsomorphicLayoutEffect")
      .mockImplementationOnce(() => {})

    render(
      <DisableSsr>
        <span>Visible after first mount</span>
      </DisableSsr>
    )

    expect(
      screen.queryByText("Visible after first mount")
    ).not.toBeInTheDocument()
  })

  test("should print text after layoutEffect", () => {
    render(
      <DisableSsr>
        <span>Visible after first mount</span>
      </DisableSsr>
    )

    expect(screen.queryByText("Visible after first mount")).toBeInTheDocument()
  })
})
