// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
// import { Button, Input, Label } from "@/components";

// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { useScheduleStore } from "@/stores/scheduleStore";
// import { ScheduleEvent } from "@/types/schedule";

// export function EventModal({
//   open,
//   onClose,
//   event,
//   slot
// }: {
//   open: boolean;
//   onClose: () => void;
//   event: Partial<ScheduleEvent> | null;
//   slot: any;
// }) {
//   const { addEvent, updateEvent, deleteEvent } = useScheduleStore();
//   const isEdit = !!event;

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       title: "",
//       date: "",
//       allDay: false,
//       start: "",
//       end: "",
//       status: "Scheduled",
//       notes: ""
//     }
//   });

//   useEffect(() => {
//     if (isEdit && event) {
//       reset({
//         ...event,
//         start: event.start ? new Date(event.start).toISOString().slice(0, 16) : "",
//         end: event.end ? new Date(event.end).toISOString().slice(0, 16) : "",
//         // date: event. ? new Date(eve nt.date).toISOString().slice(0, 10) : ""
//       });
//     } else if (slot && slot.start) {
//       reset({
//         title: "",
//         date: slot.start.toISOString().slice(0, 10),
//         allDay: slot.action === "select",
//         start: "",
//         end: "",
//         status: "Scheduled",
//         notes: ""
//       });
//     } else {
//       reset();
//     }
//   }, [event, slot, isEdit, reset]);

//   const onSubmit = (data: any) => {
//     const payload = {
//       ...data,
//       date: data.date || new Date().toISOString().slice(0, 10),
//       start: data.start ? new Date(data.start).toISOString() : undefined,
//       end: data.end ? new Date(data.end).toISOString() : undefined,
//       allDay: !!data.allDay,
//       status: data.status ?? "Scheduled"
//     };
//     if (isEdit && event) {
//       updateEvent(event.id ?? crypto.randomUUID(), payload);
//     } else {
//       addEvent(payload);
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{isEdit ? "Edit Event" : "Add Event"}</DialogTitle>
//         </DialogHeader>
//         <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
//           <Label>Title *</Label>
//           <Input {...register("title")} required />
//           <Label>Date *</Label>
//           <Input type="date" {...register("date")} required />
//           <Label>All day?</Label>
//           <Input type="checkbox" {...register("allDay")} />
//           <Label>Start (if timed)</Label>
//           <Input type="datetime-local" {...register("start")} />
//           <Label>End (if timed)</Label>
//           <Input type="datetime-local" {...register("end")} />
//           <Label>Status</Label>
//           <Input {...register("status")} />
//           <Label>Notes</Label>
//           <Input {...register("notes")} />
//           <div className="flex gap-2 mt-6">
//             {isEdit && event?.id && (
//               <Button
//                 variant="destructive"
//                 type="button"
//                 onClick={() => {
//                   deleteEvent(event.id!);
//                   onClose();
//                 }}
//               >
//                 Delete
//               </Button>
//             )}
//             <Button type="submit" className="ml-auto">
//               {isEdit ? "Save" : "Add"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }