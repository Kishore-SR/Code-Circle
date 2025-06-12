import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Snippets | Code Circle",
  description: "Browse and share code snippets with the community",
};

export default function SnippetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
