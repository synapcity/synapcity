"use client"

import { useModalStore } from "@/stores";
import { WeatherSettingsModal } from "@/components/panels/UserPanel/UserWeather/WeatherSettingsModal";

export const ModalRenderer = () => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <>
      {openModal === "weatherSettings" && <WeatherSettingsModal />}
    </>
  );
};