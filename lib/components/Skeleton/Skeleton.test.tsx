import { render, screen } from "@testing-library/react"
import { createTheme } from "../../styles"
import { Skeleton } from "./Skeleton"
import { ThemeProvider } from "../ThemeProvider/ThemeProvider"

describe("Skeleton", () => {
  test("should render a normal skeleton", () => {
    render(<Skeleton data-testid="skeleton" />)

    const skeleton = screen.getByTestId("skeleton")

    expect(skeleton).toBeInTheDocument()
  })

  test("should render a text skeleton", () => {
    render(<Skeleton data-testid="skeleton" text />)

    const skeleton = screen.getByTestId("skeleton")

    expect(skeleton).toBeInTheDocument()
  })

  test("should render a lighter skeleton when on dark mode", () => {
    render(
      <ThemeProvider
        theme={createTheme({
          color: {
            darkMode: true,
          },
        })}
      >
        <Skeleton data-testid="skeleton" />
      </ThemeProvider>
    )

    const skeleton = screen.getByTestId("skeleton")

    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveStyle("background-color: rgba(255, 255, 255, 0.13)")
  })
})
