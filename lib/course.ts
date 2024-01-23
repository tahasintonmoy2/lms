import { db } from "./db";

interface CourseProps {
  courseId: string,
  userId: string
}

export const getCourse = async({
  courseId,
  userId
}: CourseProps) => {
    await db.course.findUnique({
        where: {
          id: courseId,
          userId: userId
        },
      });
}