import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Code Circle",
  description: "View and manage your profile and code snippets",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
