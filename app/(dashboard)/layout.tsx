import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "@/actions/get-courses";
import { redirect } from "next/navigation";
import CommandBar from "@/components/command-bar";

const layout = async ({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams: {
    title: string;
    categoryId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/auth/sign-in");
  }

  const courses = await getCourses({ userId });

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-10">
        <Sidebar />
      </div>
      <CommandBar items={courses} />
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default layout;
