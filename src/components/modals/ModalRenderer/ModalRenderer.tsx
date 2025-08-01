"use client";

import { useModalStore } from "@/stores/modalStore";
import { modalDefinitions } from "@/stores/modalStore";
import { RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalRendererProps {
  scope: string;
  instanceId?: string;
  container?: RefObject<HTMLElement | null>
}

export const ModalRenderer = ({
  scope,
  instanceId,
  container,
}: ModalRendererProps) => {
  const modalType = useModalStore((s) => s.modalType);
  const modalProps = useModalStore((s) => s.modalProps);
  const storeScope = useModalStore((s) => s.scope);
  const storeInstanceId = useModalStore((s) => s.instanceId);
  const [open, setOpen] = useState(false);

  const isMatch = storeScope === scope && storeInstanceId === instanceId;

  useEffect(() => {
    if (isMatch && modalType !== null) {
      setOpen(true);
    }
  }, [isMatch, modalType]);

  if (!isMatch) return null;

  const def = modalType ? modalDefinitions[modalType] : null;
  if (!def || def.scope !== scope) return null;

  const Component = def.component;
  const finalComponent = (
    <Component
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) useModalStore.getState().closeModal();
      }}
      {...modalProps}
    />
  );

  if (scope === "global" && open) {
    return createPortal(finalComponent, document.body);
  } else if (container?.current && open) {
    return createPortal(finalComponent, container.current);
  }

  return null;
};