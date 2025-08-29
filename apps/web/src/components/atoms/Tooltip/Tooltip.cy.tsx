import React from "react";
import { Tooltip } from "./Tooltip";
import { mount } from "cypress/react";
import "@testing-library/cypress";
import "cypress-real-events";

describe("<Tooltip />", () => {
  it("shows content on hover using `trigger`", () => {
    mount(
      <div
        style={{
          minHeight: "100vh",
          padding: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip content="Hello Tooltip" trigger={<button>Hover me</button>} />
      </div>
    );

    cy.get('[data-testid="tooltip-trigger"]').realHover();
    cy.get('[data-testid="tooltip-content"]').contains("Hello Tooltip").should("exist");
  });

  it("shows content on hover using `children` if no trigger is provided", () => {
    mount(<Tooltip content="Fallback content">Hover via children</Tooltip>);

    cy.get('[data-testid="tooltip-trigger"]').realHover();
    cy.contains("Fallback content").should("exist");
  });

  it("respects `delayDuration` prop", () => {
    cy.clock(); // control time
    mount(
      <Tooltip content="Delayed tooltip" delayDuration={500}>
        <button>Hover me</button>
      </Tooltip>
    );

    cy.get('[data-testid="tooltip-trigger"]').realHover();

    cy.tick(400);
    cy.contains("Delayed tooltip").should("not.exist");

    cy.tick(100);
    cy.contains("Delayed tooltip").should("be.visible");
  });

  it("renders tooltip with `asChild` (custom trigger wrapper)", () => {
    mount(
      <Tooltip
        asChild
        content="AsChild tooltip"
        trigger={<span data-testid="span-trigger">Trigger Span</span>}
      />
    );

    cy.get("[data-testid='span-trigger']").realHover();
    cy.contains("AsChild tooltip").should("be.visible");
  });

  it("renders with custom JSX content", () => {
    mount(
      <Tooltip
        content={
          <div data-testid="custom-content">
            <strong>Custom</strong> <em>tooltip</em>
          </div>
        }
      >
        Hover custom
      </Tooltip>
    );

    cy.contains("Hover custom").realHover();
    cy.get("[data-testid='custom-content']").should("be.visible");
  });

  it("handles `side`, `align`, and offset props", () => {
    mount(
      <Tooltip
        content="Tooltip on bottom start"
        side="bottom"
        align="start"
        sideOffset={8}
        alignOffset={4}
      >
        Positioned Trigger
      </Tooltip>
    );

    cy.contains("Positioned Trigger").realHover();

    cy.contains("Tooltip on bottom start")
      .should("be.visible")
      .should("have.attr", "data-side", "bottom")
      .should("have.attr", "data-align", "start");
  });

  it("can manually control open state with `defaultOpen`", () => {
    mount(
      <Tooltip content="Always open" defaultOpen>
        Always Open
      </Tooltip>
    );

    cy.contains("Always Open").should("be.visible");
    cy.contains("Always open").should("be.visible");
  });

  it("calls `onOpenChange` when opened", () => {
    const onOpenChange = cy.stub().as("onOpenChange");

    mount(
      <Tooltip
        content="Watch open"
        onOpenChange={onOpenChange as unknown as (open: boolean) => void}
      >
        Hover me
      </Tooltip>
    );

    cy.contains("Hover me").realHover();
    cy.get("@onOpenChange").should("have.been.calledWith", true);
  });
});
