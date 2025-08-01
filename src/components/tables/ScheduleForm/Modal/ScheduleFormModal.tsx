'use client';

import { motion } from 'framer-motion';
import ScheduleForm from '../ScheduleForm';
import { useRouter } from 'next/navigation';

export default function ScheduleFormModal() {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-lg w-full"
      >
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
        <ScheduleForm onClose={handleClose} />
      </motion.div>
    </div>
  );
}
