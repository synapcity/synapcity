import NotFoundWrapper from "@/components/NotFoundWrapper";

export default function NotFoundDashboard() {
  return (
    <NotFoundWrapper
      heading="Dashboard not found."
      description="We couldn’t find the dashboard you were looking for. It might have been renamed, deleted, or the link is incorrect."
      returnItems="dashboards"
      returnRoute="/home/dashboard"
    />
  );
}
