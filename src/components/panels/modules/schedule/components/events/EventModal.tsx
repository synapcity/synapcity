/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { Button, Input, Label } from "@/components";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useScheduleStore } from "@/stores/scheduleStore";
import { ScheduleEvent } from "@/types/schedule";

export function EventModal({
  open,
  onClose,
  event,
  slot
}: {
  open: boolean;
  onClose: () => void;
  event: Partial<ScheduleEvent> | null;
  slot: any;
}) {
  const { addEvent, updateEvent } = useScheduleStore();
  const isEdit = !!event;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      date: "",
      allDay: false,
      start: "",
      end: "",
      status: "Scheduled",
      notes: ""
    }
  });

  useEffect(() => {
    if (isEdit && event) {
      reset({
        ...event,
        start: event.start ? new Date(event.start).toISOString().slice(0, 16) : "",
        end: event.end ? new Date(event.end).toISOString().slice(0, 16) : "",
        // date: event. ? new Date(eve nt.date).toISOString().slice(0, 10) : ""
      });
    } else if (slot && slot.start) {
      reset({
        title: "",
        date: slot.start.toISOString().slice(0, 10),
        allDay: slot.action === "select",
        start: "",
        end: "",
        status: "Scheduled",
        notes: ""
      });
    } else {
      reset();
    }
  }, [event, slot, isEdit, reset]);

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      date: data.date || new Date().toISOString().slice(0, 10),
      start: data.start ? new Date(data.start).toISOString() : undefined,
      end: data.end ? new Date(data.end).toISOString() : undefined,
      allDay: !!data.allDay,
      status: data.status ?? "Scheduled"
    };
    if (isEdit && event) {
      updateEvent(event.id ?? crypto.randomUUID(), payload);
    } else {
      addEvent(payload);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
          <Label>Title *</Label>
          <Input {...register("title")} required />
          <Label>Date *</Label>
          <Input type="date" {...register("date")} required />
          <Label>All day?</Label>
          <Input type="checkbox" {...register("allDay")} />
          <Label>Start (if timed)</Label>
          <Input type="datetime-local" {...register("start")} />
          <Label>End (if timed)</Label>
          <Input type="datetime-local" {...register("end")} />
          <Label>Status</Label>
          <Input {...register("status")} />
          <Label>Notes</Label>
          <Input {...register("notes")} />
          <div className="flex gap-2 mt-6">
            {isEdit && event && (
              // <Button variant="destructive" type="button" onClick={() => { deleteEvent(event.id!); onClose(); }}>
              <Button variant="destructive" type="button" onClick={() => { console.log("deleting:", event.id) }}>
                Delete
              </Button>
            )}
            <Button type="submit" className="ml-auto">
              {isEdit ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}













// 'use client';

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { z } from 'zod';
// import { useScheduleStore } from '@/stores/scheduleStore';
// import { Input, Button, Label, Select } from '@/components';
// import { Checkbox } from '@/components/atoms/ui/checkbox';

// const schema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   date: z.date(),
//   allDay: z.boolean().optional(),
//   start: z.date().optional(),
//   end: z.date().optional(),
//   status: z.enum(['Scheduled', 'In Progress', 'Done', 'Cancelled']),
//   linkedResources: z.array(z.object({
//     type: z.enum(['note', 'dashboard', 'widget']),
//     resourceId: z.string(),
//   })).optional(),
//   trackingEnabled: z.boolean().optional(),
//   trackingCategory: z.string().optional(),
// });

// export default function ScheduleForm({ onClose }: { onClose: () => void }) {
//   const { addEvent } = useScheduleStore();
//   type ScheduleFormValues = z.infer<typeof schema>;
//   const { register, handleSubmit, control, watch } = useForm<ScheduleFormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: { allDay: true, status: 'Scheduled' },
//   });

//   const allDay = watch('allDay');

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onSubmit = (data: any) => {
//     addEvent({
//       ...data,
//       date: data.date.toISOString(),
//       start: data.start?.toISOString(),
//       end: data.end?.toISOString(),
//       tracking: data.trackingEnabled ? { enabled: true, category: data.trackingCategory } : undefined,
//     });
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Label>Title *</Label>
//       <Input {...register('title')} required />

//       <Label>Date *</Label>
//       <Controller
//         control={control}
//         name="date"
//         render={({ field }) => (
//           <DatePicker selected={field.value} onChange={field.onChange} className="input" />
//         )}
//       />

//       <Label>All-Day</Label>
//       <Checkbox {...register('allDay')} />

//       {!allDay && (
//         <>
//           <Label>Start Time</Label>
//           <Controller
//             control={control}
//             name="start"
//             render={({ field }) => (
//               <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Start" dateFormat="h:mm aa" className="input" />
//             )}
//           />

//           <Label>End Time</Label>
//           <Controller
//             control={control}
//             name="end"
//             render={({ field }) => (
//               <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="End" dateFormat="h:mm aa" className="input" />
//             )}
//           />
//         </>
//       )}

//       <Label>Status</Label>
//       <Select {...register('status')}>
//         <option>Scheduled</option>
//         <option>In Progress</option>
//         <option>Done</option>
//         <option>Cancelled</option>
//       </Select>
//       <Label>Enable Time Tracking</Label>
//       <Checkbox {...register('trackingEnabled')} />
//       <Label>Tracking Category</Label>
//       <Input {...register('trackingCategory')} placeholder="Reading, Exercise..." />

//       <Button type="submit">Save Event</Button>
//     </form>
//   );
// }



// 'use client';
// import { useScheduleStore, ScheduleEvent, LinkedResource } from '@/stores/scheduleStore';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog';
// import { Button, Input, Label, Select } from '@/components';
// import { Checkbox } from '@/components/atoms/ui/checkbox';
// import { SlotInfo } from 'react-big-calendar';

// const schema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   date: z.date(),
//   allDay: z.boolean().optional(),
//   start: z.date().optional(),
//   end: z.date().optional(),
//   status: z.enum(['Scheduled', 'In Progress', 'Done', 'Cancelled']).optional(),
//   priority: z.enum(['Low', 'Medium', 'High']).optional(),
//   notes: z.string().optional(),
//   linkedResources: z.array(z.object({
//     type: z.enum(['note', 'dashboard', 'widget']),
//     resourceId: z.string(),
//   })).optional(),
//   trackingEnabled: z.boolean().optional(),
//   trackingCategory: z.string().optional(),
// });

// type FormType = z.infer<typeof schema>;

// export function ModernEventModal({
//   open,
//   onClose,
//   event,
//   slotInfo,
// }: {
//   open: boolean;
//   onClose: () => void;
//   event: ScheduleEvent | null;
//   slotInfo: SlotInfo | null;
// }) {
//   const { addEvent, updateEvent, deleteEvent } = useScheduleStore();

//   const isEditing = !!event;

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//   } = useForm<FormType>({
//     resolver: zodResolver(schema),
//     defaultValues: isEditing
//       ? {
//         ...event,
//         date: event?.date ? new Date(event.date) : new Date(),
//         start: event?.start ? new Date(event.start) : undefined,
//         end: event?.end ? new Date(event.end) : undefined,
//       }
//       : {
//         title: '',
//         date: slotInfo?.start || new Date(),
//         allDay: slotInfo?.action === 'select',
//         status: 'Scheduled',
//         priority: 'Medium',
//       },
//   });

//   // On submit
//   const onSubmit = (data: FormType) => {
//     const payload: Omit<ScheduleEvent, 'id'> = {
//       ...data,
//       status: data.status ?? "Scheduled",
//       date: data.date.toISOString(),
//       start: data.start ? data.start.toISOString() : undefined,
//       end: data.end ? data.end.toISOString() : undefined,
//       allDay: !!data.allDay,
//       linkedResources: data.linkedResources || [],
//       tracking: data.trackingEnabled
//         ? { enabled: true, category: data.trackingCategory }
//         : undefined,
//     };
//     if (isEditing && event) {
//       updateEvent(event.id, payload);
//     } else {
//       addEvent(payload);
//     }
//     onClose();
//   };

//   const onDelete = () => {
//     if (isEditing && event) {
//       deleteEvent(event.id);
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-lg">
//         <DialogHeader>
//           <DialogTitle>{isEditing ? 'Edit Event' : 'Add Event'}</DialogTitle>
//         </DialogHeader>
//         <form
//           className="flex flex-col gap-4 mt-2"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <Label>Title *</Label>
//           <Input {...register('title')} required />

//           <Label>Date *</Label>
//           <Controller
//             control={control}
//             name="date"
//             render={({ field }) => (
//               <DatePicker
//                 selected={field.value}
//                 onChange={field.onChange}
//                 className="input"
//                 dateFormat="yyyy-MM-dd"
//               />
//             )}
//           />
//           <Label>All Day</Label>
//           <Checkbox {...register('allDay')} />
//           {!watch('allDay') && (
//             <>
//               <Label>Start</Label>
//               <Controller
//                 control={control}
//                 name="start"
//                 render={({ field }) => (
//                   <DatePicker
//                     selected={field.value}
//                     onChange={field.onChange}
//                     showTimeSelect
//                     showTimeSelectOnly
//                     timeIntervals={15}
//                     timeCaption="Start"
//                     dateFormat="h:mm aa"
//                   />
//                 )}
//               />
//               <Label>End</Label>
//               <Controller
//                 control={control}
//                 name="end"
//                 render={({ field }) => (
//                   <DatePicker
//                     selected={field.value}
//                     onChange={field.onChange}
//                     showTimeSelect
//                     showTimeSelectOnly
//                     timeIntervals={15}
//                     timeCaption="End"
//                     dateFormat="h:mm aa"
//                   />
//                 )}
//               />
//             </>
//           )}

//           <Label>Status</Label>
//           <Select {...register('status')}>
//             <option>Scheduled</option>
//             <option>In Progress</option>
//             <option>Done</option>
//             <option>Cancelled</option>
//           </Select>

//           <Label>Priority</Label>
//           <Select {...register('priority')}>
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//           </Select>
//           <Label>Enable Time Tracking</Label>
//           <Checkbox {...register('trackingEnabled')} />
//           <Input {...register('trackingCategory')} placeholder="Tracking Category (optional)" />

//           {/* TODO: Linked Resources UI */}
//           {/* Add a resource selector UI here for notes/dashboards/widgets */}

//           <div className="flex gap-2 mt-6">
//             {isEditing && (
//               <Button variant="destructive" type="button" onClick={onDelete}>
//                 Delete
//               </Button>
//             )}
//             <Button type="submit" className="ml-auto z-[99999] pointer-events-auto">
//               {isEditing ? 'Save' : 'Add'}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
