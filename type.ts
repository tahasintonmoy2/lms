import { Chapter, Course, Category } from "@prisma/client"

export type CourseWithChapter = Course & {
    chapter: (Chapter & {course: Course})[];
}

export type CourseWithProgressWithCategory = Course & {
    category: Category | null,
    chapters: { id: string }[],
    progress: number | null
}