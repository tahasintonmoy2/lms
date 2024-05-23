import { Category, Course } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { CourseCard } from "@/components/course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesList {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ 
  items
}: CoursesList) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imgUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          <Image
            src="/results-not-found.svg"
            height={640}
            width={640}
            alt=""
          />
          <h1 className="text-2xl font-bold text-center">No courses found</h1>
          <p className="text-center">Try searching for something else</p>
        </div>
      )}
    </div>
  );
};
