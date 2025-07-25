'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { z } from 'zod';
import { useScheduleStore } from '@/stores/scheduleStore';
import { Input, Button, Label, Select } from '@/components';
import { Checkbox } from '@/components/atoms/ui/checkbox';

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.date(),
  allDay: z.boolean().optional(),
  start: z.date().optional(),
  end: z.date().optional(),
  status: z.enum(['Scheduled', 'In Progress', 'Done', 'Cancelled']),
  linkedResources: z.array(z.object({
    type: z.enum(['note', 'dashboard', 'widget']),
    resourceId: z.string(),
  })).optional(),
  trackingEnabled: z.boolean().optional(),
  trackingCategory: z.string().optional(),
});

export default function ScheduleForm({ onClose }: { onClose: () => void }) {
  const { addEvent } = useScheduleStore();
  type ScheduleFormValues = z.infer<typeof schema>;
  const { register, handleSubmit, control, watch } = useForm<ScheduleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { allDay: true, status: 'Scheduled' },
  });

  const allDay = watch('allDay');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    addEvent({
      ...data,
      date: data.date.toISOString(),
      start: data.start?.toISOString(),
      end: data.end?.toISOString(),
      tracking: data.trackingEnabled ? { enabled: true, category: data.trackingCategory } : undefined,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Label>Title *</Label>
      <Input {...register('title')} required />

      <Label>Date *</Label>
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePicker selected={field.value} onChange={field.onChange} className="input" />
        )}
      />

      <Label>All-Day</Label>
      <Checkbox {...register('allDay')} />

      {!allDay && (
        <>
          <Label>Start Time</Label>
          <Controller
            control={control}
            name="start"
            render={({ field }) => (
              <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Start" dateFormat="h:mm aa" className="input" />
            )}
          />

          <Label>End Time</Label>
          <Controller
            control={control}
            name="end"
            render={({ field }) => (
              <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="End" dateFormat="h:mm aa" className="input" />
            )}
          />
        </>
      )}

      <Label>Status</Label>
      <Select {...register('status')}>
        <option>Scheduled</option>
        <option>In Progress</option>
        <option>Done</option>
        <option>Cancelled</option>
      </Select>
      <Label>Enable Time Tracking</Label>
      <Checkbox {...register('trackingEnabled')} />
      <Label>Tracking Category</Label>
      <Input {...register('trackingCategory')} placeholder="Reading, Exercise..." />

      <Button type="submit">Save Event</Button>
    </form>
  );
}














// // 'use client';

// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { Input, Select, Button, Label } from '@/components';
// // import { Textarea } from "@/components/atoms/ui/textarea"
// // import { useScheduleStore, ScheduleEvent, ScheduleStatus } from '@/stores/scheduleStore';

// // const schema = z.object({
// //   title: z.string().min(1, 'Title required'),
// //   description: z.string().optional(),
// //   date: z.string().min(1, 'Date required'),
// //   time: z.string().optional(),
// //   status: z.enum(['Scheduled', 'In Progress', 'Done', 'Cancelled']).optional().default("Scheduled"),
// //   priority: z.enum(['Low', 'Medium', 'High']).optional().default("Low"),
// //   notes: z.string().optional(),
// // });

// // type ScheduleFormValues = z.infer<typeof schema>;

// // export default function ScheduleForm({ onClose }: { onClose: () => void }) {
// //   const { addEvent } = useScheduleStore();

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //   } = useForm<ScheduleFormValues>({
// //     resolver: zodResolver(schema),
// //     defaultValues: { status: 'Scheduled' },
// //   });

// //   const onSubmit = (data: ScheduleFormValues) => {
// //     addEvent(data);
// //     onClose();

// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //       <Label>Title *</Label>
// //       <Input {...register('title')} />
// //       {errors.title && <span className="text-red-500">{errors.title.message}</span>}

// //       <Label>Description</Label>
// //       <Input {...register('description')} />

// //       <Label>Date *</Label>
// //       <Input type="date" {...register('date')} />
// //       {errors.date && <span className="text-red-500">{errors.date.message}</span>}

// //       <Label>Time</Label>
// //       <Input type="time" {...register('time')} />

// //       <Label>Status</Label>
// //       <Select {...register('status')}>
// //         {(['Scheduled', 'In Progress', 'Done', 'Cancelled'] as ScheduleStatus[]).map((status) => (
// //           <option key={status} value={status}>{status}</option>
// //         ))}
// //       </Select>

// //       <Label>Priority</Label>
// //       <Select {...register('priority')}>
// //         <option value="Low">Low</option>
// //         <option value="Medium">Medium</option>
// //         <option value="High">High</option>
// //       </Select>

// //       <Label>Notes</Label>
// //       <Textarea {...register('notes')} />

// //       <div className="flex gap-2 justify-end">
// //         <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
// //         <Button variant="primary" type="submit" disabled={isSubmitting}>
// //           {isSubmitting ? 'Saving...' : 'Save Event'}
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // }
// 'use client';

// import React, { useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Input, Select, Button, Label } from '@/components';
// import { Textarea } from '@/components/atoms/ui/textarea';
// import { useScheduleStore, ScheduleStatus } from '@/stores/scheduleStore';

// const schema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   date: z.date(),
//   time: z.date().optional(),
//   status: z.enum(['Scheduled', 'In Progress', 'Done', 'Cancelled']),
//   priority: z.enum(['Low', 'Medium', 'High']).optional(),
//   notes: z.string().optional(),
// });

// type ScheduleFormValues = z.infer<typeof schema>;

// export default function ScheduleForm({ onClose, eventId }: { onClose: () => void; eventId?: string }) {
//   const { addEvent, events, updateEvent } = useScheduleStore();
//   const eventToEdit = events.find(e => e.id === eventId);

//   const { register, handleSubmit, control, formState: { isSubmitting }, reset } = useForm<ScheduleFormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: eventToEdit ? {
//       ...eventToEdit,
//       date: new Date(eventToEdit.date),
//       time: eventToEdit.time ? new Date(`1970-01-01T${eventToEdit.time}`) : undefined,
//     } : { status: 'Scheduled' },
//   });

//   useEffect(() => {
//     reset();
//   }, [eventToEdit, reset]);

//   const notifyEvent = (title: string, date: Date) => {
//     if (Notification.permission === 'granted') {
//       const delay = date.getTime() - Date.now();
//       if (delay > 0) {
//         setTimeout(() => new Notification(`Event Reminder: ${title}`), delay);
//       }
//     } else {
//       Notification.requestPermission();
//     }
//   };

//   const onSubmit = (data: ScheduleFormValues) => {
//     const eventPayload = {
//       ...data,
//       date: data.date.toISOString(),
//       time: data.time?.toISOString().substring(11, 16),
//     };

//     if (eventId) {
//       updateEvent(eventId, eventPayload);
//     } else {
//       addEvent(eventPayload);
//     }

//     notifyEvent(data.title, data.time ? new Date(`${data.date.toDateString()} ${data.time.toTimeString()}`) : data.date);

//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Label>Title *</Label>
//       <Input {...register('title')} />

//       <Label>Description</Label>
//       <Input {...register('description')} />

//       <Label>Date *</Label>
//       <Controller
//         control={control}
//         name="date"
//         render={({ field }) => (
//           <DatePicker className="input" selected={field.value} onChange={field.onChange} />
//         )}
//       />

//       <Label>Time</Label>
//       <Controller
//         control={control}
//         name="time"
//         render={({ field }) => (
//           <DatePicker className="input" selected={field.value} onChange={field.onChange} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" />
//         )}
//       />

//       <Label>Status</Label>
//       <Select {...register('status')}>
//         {(['Scheduled', 'In Progress', 'Done', 'Cancelled'] as ScheduleStatus[]).map(status => (
//           <option key={status}>{status}</option>
//         ))}
//       </Select>

//       <Label>Priority</Label>
//       <Select {...register('priority')}>
//         <option>Low</option>
//         <option>Medium</option>
//         <option>High</option>
//       </Select>

//       <Label>Notes</Label>
//       <Textarea {...register('notes')} />

//       <div className="flex gap-2 justify-end">
//         <Button variant="outline" onClick={onClose}>Cancel</Button>
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Saving...' : 'Save Event'}
//         </Button>
//       </div>
//     </form>
//   );
// }
