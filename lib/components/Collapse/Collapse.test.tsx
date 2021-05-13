import { render, screen } from "@testing-library/react"
import { Box } from "../Box/Box"
import { Collapse } from "./Collapse"

describe("Collapse", () => {
  test(`should not show content when not "in"`, () => {
    render(
      <Collapse in={false}>
        <Box>Content</Box>
      </Collapse>
    )

    expect(screen.queryByText("Content")).not.toBeInTheDocument()
  })

  test(`should show content when "in"`, () => {
    render(
      <Collapse in>
        <Box>Content</Box>
      </Collapse>
    )

    expect(screen.queryByText("Content")).toBeInTheDocument()
  })
})
