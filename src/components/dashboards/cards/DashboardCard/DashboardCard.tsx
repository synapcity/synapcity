'use client';

import { useRouter } from 'next/navigation';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { CardWithLoading } from '../../../molecules/cards/CardWithLoading';
import { format, formatDistanceToNow, isValid } from 'date-fns';
import { StackedMeta } from '../../../molecules/cards/meta/StackedMeta';
import { CreateDashboardModal, useDashboardModal } from '@/components/dashboards/modals';
import type { Dashboard as DashboardResource } from '@/stores/resources/dashboardStore/dashboard-schema';
import { getShortRelativeTime } from '@/utils/date-utils';

interface DashboardCardProps {
  dashboard?: DashboardResource | null;
  id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  onClick?: () => void;
  search?: boolean;
}

export const DashboardCard: FC<DashboardCardProps> = memo(({
  dashboard,
  id: propId,
  name: propName,
  description: propDescription,
  createdAt: propCreatedAt,
  updatedAt: propUpdatedAt,
  search = false,
  onClick,
}) => {
  const resolved: DashboardResource = useMemo(() => {
    return dashboard
      ? dashboard
      : {
        id: propId ?? 'unknown',
        name: propName ?? 'New Dashboard',
        description: propDescription ?? '',
        widgetIds: [],
        icon: 'boxes',
        createdAt: propCreatedAt ?? new Date().toISOString(),
        updatedAt: propUpdatedAt ?? propCreatedAt ?? new Date().toISOString(),
        deletedAt: null,
      };
  }, [dashboard, propCreatedAt, propDescription, propId, propName, propUpdatedAt]);

  const { id, name = 'New Dashboard', description, createdAt, updatedAt } = resolved;

  const lastUpdatedAt = updatedAt || createdAt;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { open, initialData, setOpen } = useDashboardModal();

  // Parse and validate dates once
  const parsedUpdated = lastUpdatedAt ? new Date(lastUpdatedAt) : null;
  const validUpdated = parsedUpdated && isValid(parsedUpdated) ? parsedUpdated : null;

  const parsedCreated = createdAt ? new Date(createdAt) : null;
  const validCreated = parsedCreated && isValid(parsedCreated) ? parsedCreated : null;

  let relative = 'Unknown';
  let exactUpdated = 'Unknown date';

  if (validUpdated) {
    if (search) {
      // for search contexts maybe show full relative?
      relative = formatDistanceToNow(validUpdated, { addSuffix: true });
    } else {
      relative = getShortRelativeTime(validUpdated); // your concise version
    }
    exactUpdated = format(validUpdated, 'MMM d, h:mm a');
  } else if (validCreated) {
    // fallback
    relative = getShortRelativeTime(validCreated);
    exactUpdated = format(validCreated, 'MMM d, h:mm a');
  }

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsLoading(true);
      onClick?.();
      router.push(`/home/dashboards/${id}`);
    },
    [id, onClick, router]
  );

  return (
    <>
      <CardWithLoading isLoading={isLoading} onClick={handleClick} ariaLabel={`Open dashboard ${name}`}>
        <div className="flex justify-between w-full gap-4">
          <h3 className="text-lg font-semibold mb-1 flex-1">{name || 'New Dashboard'}</h3>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2 justify-end group">
              <div className="flex flex-col items-end">
                <span className="text-xs">Updated</span>
                <div
                  className="font-medium truncate whitespace-nowrap text-right group-hover:hidden"
                  title={validUpdated ? formatDistanceToNow(validUpdated, { addSuffix: true }) : undefined}
                >
                  {relative}
                </div>
                <span className="hidden group-hover:block text-xs">{exactUpdated}</span>
              </div>
              <RefreshCcw className="shrink-0" />
            </div>
          </div>
        </div>
        {description && <p className="text-sm mb-2">{description}</p>}
        <StackedMeta createdAt={createdAt} />
      </CardWithLoading>

      {open && initialData?.id === id && (
        <CreateDashboardModal open={open} setOpen={setOpen} initialData={initialData} />
      )}
    </>
  );
})

DashboardCard.displayName = "DashboardCard"