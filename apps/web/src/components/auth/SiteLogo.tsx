import { Logo } from "../atoms/Logo";

export const SiteLogo = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return (
      <div className="inline-flex items-start justify-center">
        <span className="font-heading text-2xl p-2 hover:cursor-pointer hover:underline dark:text-white">
          Synapcity
        </span>
      </div>
    );
  }

  return <Logo size={32} variant="mark" title="Synapcity" />;
};
