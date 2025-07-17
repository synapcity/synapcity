"use client"

import { useModalStore } from "@/stores";
import { WeatherSettingsModal } from "@/components/panels/UserPanel/UserWeather/WeatherSettingsModal";

export const ModalRenderer = () => {
  const modalType = useModalStore(s => s.modalType)
  console.log("modalType", modalType)
  return (
    <>
      {modalType === "weatherSettings" && <WeatherSettingsModal />}
    </>
  );
};