import { ConfirmModal } from "@/components/modals/ConfirmModal/ConfirmModal";
import { WeatherSettingsModal } from "@/components/panels/UserPanel/UserWeather/WeatherSettingsModal";
import ScheduleFormModal from "@/components/tables/ScheduleForm/Modal/ScheduleFormModal";
import type { ModalComponentProps, ModalScope } from "@/types/modal"
import { ComponentType } from "react";

export type ModalDefinition<T> = {
	component: ComponentType<ModalComponentProps<T>>;
	scope: ModalScope;
};

export const modalDefinitions = {
	confirm: {
		component: ConfirmModal,
		scope: "global",
	},
	weatherSettings: {
		component: WeatherSettingsModal,
		scope: "userPanelMain",
	},
	scheduleForm: {
		component: ScheduleFormModal,
		scope: "userPanelSidebar",
	},
};