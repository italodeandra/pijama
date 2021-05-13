import { render, screen } from "@testing-library/react"
import { Compose } from "./Compose"

describe("Compose", () => {
  test("should render one component inside the other like providers", () => {
    const ComponentA = ({ children }) => <>A{children}</>
    const ComponentB = ({ children }) => <>B{children}</>
    render(<Compose components={[ComponentA, ComponentB]}>C</Compose>)

    expect(screen.getByText("ABC")).toBeInTheDocument()
  })
})
