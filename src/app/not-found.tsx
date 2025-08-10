import NotFoundWrapper from "@/components/NotFoundWrapper";

export default function NotFound() {
  return (
    <NotFoundWrapper
      heading="Page not found"
      description="We couldn’t find the page you were looking for."
      returnItems="home"
      returnRoute="/"
    />
  );
}