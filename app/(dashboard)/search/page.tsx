import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/auth/sign-in");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Search;
