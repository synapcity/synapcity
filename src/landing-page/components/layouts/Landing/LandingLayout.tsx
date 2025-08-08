import { Background } from "../Background/Background";
import "./landing-page.css";
import { TooltipProvider } from "../../ui";

export const LandingLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <>
      <TooltipProvider>
        <Background>
          {children}
        </Background>
      </TooltipProvider>
    </>
  )
}