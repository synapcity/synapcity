// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { EventModal } from "./EventModal";
// import { useScheduleStore } from "@/stores/scheduleStore";

// jest.mock("@/stores/scheduleStore/useScheduleStore", () => ({
//   useScheduleStore: jest.fn()
// }));

// describe("EventModal", () => {
//   it("deletes event and closes modal when Delete is clicked in edit mode", async () => {
//     const deleteEvent = jest.fn();
//     (useScheduleStore as unknown as jest.Mock).mockReturnValue({
//       addEvent: jest.fn(),
//       updateEvent: jest.fn(),
//       deleteEvent
//     });

//     const event = {
//       id: "test-id",
//       title: "Test Event",
//       date: "2024-01-01",
//       start: "2024-01-01T10:00:00.000Z"
//     };

//     const Wrapper = () => {
//       const [open, setOpen] = React.useState(true);
//       return (
//         <EventModal
//           open={open}
//           onClose={() => setOpen(false)}
//           event={event}
//           slot={null}
//         />
//       );
//     };

//     render(<Wrapper />);

//     const deleteButton = screen.getByRole("button", { name: /delete/i });
//     fireEvent.click(deleteButton);

//     expect(deleteEvent).toHaveBeenCalledWith("test-id");

//     await waitFor(() => {
//       expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
//     });
//   });
// });