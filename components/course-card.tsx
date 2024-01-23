"use client";
import { CourseProgress } from "@/components/course-progress";
import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition flex flex-col mt-4 overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image src={imageUrl} alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-xl md:text-base font-medium group-hover:text-blue-600 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
              <p className="text-lg md:text-sm font-medium">
                {formatPrice(price)}
              </p>
          )}
        </div>
      </div>
    </Link>
  );
};
