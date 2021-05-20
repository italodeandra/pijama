import { render, screen } from "@testing-library/react"
import { Text } from "./Text"

describe("Text", () => {
  test("should render a paragraph", () => {
    render(<Text paragraph>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a subheader", () => {
    render(<Text subheader>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a header", () => {
    render(<Text header>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a code", () => {
    render(<Text code>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a italic text", () => {
    render(<Text italic>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a bold text", () => {
    render(<Text bold>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a text that can't be selected", () => {
    render(<Text select={false}>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a text that only selects everything", () => {
    render(<Text select="all">Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a centered text", () => {
    render(<Text center>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a text with ellipsis", () => {
    render(<Text ellipsis>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a justified text", () => {
    render(<Text justify>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a block", () => {
    render(<Text block>Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  test("should render a button", () => {
    render(<Text as="button">Test</Text>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
})
