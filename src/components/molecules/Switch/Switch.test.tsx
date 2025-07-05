import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Switch } from "./Switch"

describe("Switch", () => {
  it("renders with a label", () => {
    render(<Switch label="Notifications" />)
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument()
  })

  it("renders description text", () => {
    render(<Switch label="Mode" description="Toggle the theme" />)
    expect(screen.getByText("Toggle the theme")).toBeInTheDocument()
  })

  it("renders error message and sets aria-invalid", () => {
    render(<Switch label="Terms" error="Required" />)
    const error = screen.getByRole("alert")
    const input = screen.getByLabelText("Terms")
    expect(error).toHaveTextContent("Required")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("calls onCheckedChange when toggled (uncontrolled)", () => {
    const handleChange = jest.fn()
    render(
      <Switch
        label="Auto Save"
        defaultChecked={false}
        onCheckedChange={handleChange}
      />
    )

    const toggle = screen.getByRole("switch")
    fireEvent.click(toggle)
    expect(handleChange).toHaveBeenCalledWith(true)

    fireEvent.click(toggle)
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it("respects controlled `checked` prop", () => {
    const handleChange = jest.fn()
    const { rerender } = render(
      <Switch label="Online" checked={false} onCheckedChange={handleChange} />
    )
    const toggle = screen.getByRole("switch")
    expect(toggle).not.toBeChecked()

    rerender(<Switch label="Online" checked={true} onCheckedChange={handleChange} />)
    expect(toggle).toBeChecked()
  })

  it("does not toggle when disabled", () => {
    const handleChange = jest.fn()
    render(
      <Switch label="Disabled" disabled onCheckedChange={handleChange} />
    )
    const toggle = screen.getByRole("switch")
    expect(toggle).toBeDisabled()
    fireEvent.click(toggle)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it("applies custom className and ID", () => {
    render(
      <Switch
        label="Custom"
        className="custom-class"
        id="custom-id"
        defaultChecked
      />
    )
    const toggle = screen.getByRole("switch")
    expect(toggle).toHaveAttribute("id", "custom-id")
    expect(toggle.className).toMatch(/custom-class/)
  })

  it("forwards ref to UISwitch", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Switch ref={ref} label="Ref test" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("sets correct aria-describedby for description", () => {
    render(<Switch label="Described" description="Details" />)
    const toggle = screen.getByRole("switch")
    const desc = screen.getByText("Details")
    expect(toggle).toHaveAttribute("aria-describedby", desc.id)
  })

  it("sets correct aria-describedby for error", () => {
    render(<Switch label="With error" error="Problem" />)
    const toggle = screen.getByRole("switch")
    const error = screen.getByRole("alert")
    expect(toggle).toHaveAttribute("aria-describedby", error.id)
  })
})
