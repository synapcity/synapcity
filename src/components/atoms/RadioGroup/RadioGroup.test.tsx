import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RadioGroup, type RadioOption } from "./RadioGroup"

describe("RadioGroup", () => {
  it("renders all options with labels and descriptions", () => {
    const options: RadioOption[] = [
      { label: "Light", value: "light", description: "Bright and clean UI" },
      { label: "Dark", value: "dark", description: "Dimmed for low light" },
      { label: "System", value: "system", description: "Match your OS setting" },
    ]
    render(<RadioGroup options={options} value="light" />)
    const radios = screen.getAllByRole("radio");
    const lightRadio = radios.find((el) => el.getAttribute("value") === "light");
    const darkRadio = radios.find((el) => el.getAttribute("value") === "dark");
    const systemRadio = radios.find((el) => el.getAttribute("value") === "system");

    expect(lightRadio).toBeInTheDocument();
    expect(darkRadio).toBeInTheDocument();
    expect(systemRadio).toBeInTheDocument();
  })

  it("calls onChange when a different option is selected", async () => {
    const handleChange = jest.fn()
    const options: RadioOption[] = [
      { label: "Light", value: "light", description: "Bright and clean UI" },
      { label: "Dark", value: "dark", description: "Dimmed for low light" },
      { label: "System", value: "system", description: "Match your OS setting", disabled: true },
    ]

    render(<RadioGroup options={options} value="light" onChange={handleChange} />)

    const radios = screen.getAllByRole("radio");
    const lightRadio = radios.find((el) => el.getAttribute("value") === "light");
    const darkRadio = radios.find((el) => el.getAttribute("value") === "dark");
    const systemRadio = radios.find((el) => el.getAttribute("value") === "system");

    expect(lightRadio).toBeInTheDocument();
    expect(darkRadio).toBeInTheDocument();
    expect(systemRadio).toBeInTheDocument();
    expect(systemRadio).toBeDisabled();


  })

  it("respects the disabled state of an option", async () => {
    const user = userEvent.setup()
    const options: RadioOption[] = [
      { label: "Light", value: "light", description: "Bright and clean UI" },
      { label: "Dark", value: "dark", description: "Dimmed for low light" },
      { label: "System", value: "system", description: "Disabled option", disabled: true },
    ]
    const handleChange = jest.fn()

    render(<RadioGroup options={options} value="light" onChange={handleChange} />)
    const radios = screen.getAllByRole("radio");
    const lightRadio = radios.find((el) => el.getAttribute("value") === "light");
    const darkRadio = radios.find((el) => el.getAttribute("value") === "dark");
    const systemRadio = radios.find((el) => el.getAttribute("value") === "system");

    expect(lightRadio).toBeInTheDocument();
    expect(darkRadio).toBeInTheDocument();
    expect(systemRadio).toBeInTheDocument();

    await user.click(darkRadio as Element)
    expect(handleChange).toHaveBeenCalledWith("dark")

    expect(screen.getByRole("radio", { name: /System/i })).toBeDisabled()


  })

  it("applies horizontal layout when specified", () => {
    const options: RadioOption[] = [
      { label: "Light", value: "light", description: "Bright and clean UI" },
      { label: "Dark", value: "dark", description: "Dimmed for low light" },
      { label: "System", value: "system", description: "Match your OS setting" },
    ]
    const { container } = render(
      <RadioGroup options={options} direction="horizontal" />
    )

    expect(container.firstChild).toHaveClass("flex")
    expect(container.firstChild).toHaveClass("gap-4")
  })
})
