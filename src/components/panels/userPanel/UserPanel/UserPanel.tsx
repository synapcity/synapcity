export const UserPanel = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Inbox</h2>
      </div>
      <div className="flex flex-col gap-4 min-h-1/3 h-1/3">
        Inbox Items
      </div>
    </div>
  );
};