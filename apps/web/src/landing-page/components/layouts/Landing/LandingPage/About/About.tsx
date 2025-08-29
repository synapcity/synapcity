"use client";

import { Container, SectionContainer, SectionHeading } from "@/landing-page/components/ui";
import { fadeIn } from "../../../../../lib/variants";

export const About = () => {
  return (
    <SectionContainer id="about" maxWidth="3xl" key="about">
      <Container left className="mx-auto">
        <SectionHeading size="lg" motion={fadeIn} left>
          Inspired by Second Brain & PARA
        </SectionHeading>
        <Container left className="text-left">
          <p>
            Synapcity was heavily influenced by Tiago Forte’s Second Brain methodology and the PARA
            framework.
          </p>

          <p>
            I wanted to create a personal dashboard that reflects these ideas — giving users a
            clean, flexible environment to capture, organize, and access the information that
            matters most.
          </p>

          <p>
            This project merges those productivity philosophies with modern web tools like Next.js,
            Supabase, Prisma, and TailwindCSS.
          </p>
        </Container>
      </Container>
    </SectionContainer>
  );
};
