import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# About Synapcity

`;

export async function generateMetadata() {
  return {
    title: "About Synapcity",
    description: "Learn more about Synapcity",
    openGraph: {
      title: "About Synapcity",
      description: "Learn more about Synapcity",
      images: [
        signOgImageUrl({
          title: "Synapcity",
          label: "About Synapcity",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
