import { render, screen } from "@testing-library/react"
import { Field } from "./Field"
import { Red } from "../../styles"
import user from "@testing-library/user-event"

describe("Field", () => {
  test("should render a input field that is sync with a state", () => {
    let value = ""
    const setValue = (newValue: string) => (value = newValue)
    render(<Field label="Name" onChangeValue={setValue} value={value} />)

    const field = screen.getByText("Name")
    user.click(field)
    user.type(field, "Ítalo")

    expect(value).toBe("Ítalo")
  })

  test("should show an input with error", () => {
    render(<Field error helperText="Name is required" label="Name" />)

    expect(screen.getByText("Name is required")).toBeInTheDocument()
    expect(screen.getByText("Name").closest("div")).toHaveStyle(
      `color: ${Red.N500}`
    )
  })

  test("when using invalid color it should just be ignored", () => {
    render(<Field color="invalid-color" label="Name" />)

    expect(screen.getByText("Name")).toBeInTheDocument()
  })

  test("when changing the value on the state should update the input", () => {
    let value = "Ítalo"
    const setValue = (newValue: string) => (value = newValue)
    const { rerender } = render(
      <Field label="Name" onChangeValue={setValue} value={value} />
    )

    const input = screen.getByDisplayValue("Ítalo")

    setValue("Andrade")

    rerender(<Field label="Name" onChangeValue={setValue} value={value} />)

    expect(input).toHaveValue("Andrade")
  })

  test("when clicking the label it should focus the input and then blur it", () => {
    const focusSpy = jest.fn()
    const blurSpy = jest.fn()
    render(<Field label="Name" onBlur={blurSpy} onFocus={focusSpy} />)

    const field = screen.getByText("Name")

    user.click(field)
    expect(focusSpy).toHaveBeenCalledTimes(1)

    user.tab()
    expect(blurSpy).toHaveBeenCalledTimes(1)
  })

  describe("with automatic id that should be", () => {
    test("the name when passing only name", () => {
      render(<Field name="name" value={"Ítalo"} />)
      const input = screen.getByDisplayValue("Ítalo")
      expect(input.id).toBe("name")
    })
    test("the label when passing only a string label", () => {
      render(<Field label="label" value={"Ítalo"} />)
      const input = screen.getByDisplayValue("Ítalo")
      expect(input.id).toBe("label")
    })
    test("nothing when no name or string label", () => {
      render(<Field value={"Ítalo"} />)
      const input = screen.getByDisplayValue("Ítalo")
      expect(input.id).toBe("")
    })
  })

  test("should render a select with options", () => {
    let value = ""
    const setValue = (newValue: string) => (value = newValue)
    render(
      <Field
        label="Select one"
        onChangeValue={setValue}
        type="select"
        value={value}
      >
        <option value="">None</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
      </Field>
    )

    const select = screen.getByDisplayValue("None")
    user.click(select)

    user.selectOptions(select, "B")

    expect(value).toBe("B")
  })

  test("should show an asterisk on the label when required", () => {
    render(<Field label="Required" required />)
    expect(screen.getByText("Required *")).toBeInTheDocument()
  })

  test(`should trigger "onChange" event when changing value`, () => {
    const changeSpy = jest.fn()
    const name = "Ítalo"

    render(<Field label="Name" onChange={changeSpy} />)

    const field = screen.getByText("Name")

    user.click(field)
    user.type(field, name)

    expect(changeSpy).toHaveBeenCalledTimes(name.length)
  })
})
