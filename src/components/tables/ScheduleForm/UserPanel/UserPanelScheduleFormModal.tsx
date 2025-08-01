'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ScheduleForm from '../ScheduleForm';
import { useUIStore } from '@/stores/uiStore';

export default function UserPanelScheduleModal() {
  const isScheduleModalOpen = useUIStore(state => state.components["scheduleModal"].isVisible ?? false)
  const setCompState = useUIStore(state => state.setCompState)
  const toggleModal = (value?: boolean) => setCompState("scheduleModal", "isVisible", value ?? !isScheduleModalOpen)

  return (
    <AnimatePresence>
      {isScheduleModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center z-20"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-3">New Event</h3>
            <ScheduleForm onClose={() => toggleModal(false)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
