"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Category, Course } from "@prisma/client";
import { CourseWithProgressWithCategory } from "@/type";

interface CoursesList {
    items?: CourseWithProgressWithCategory[],
    data: Course,
}

export const WishlistButton:React.FC<CoursesList> = ({
  items,
  data
}) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
        <Button>
              <Heart className="h-5 w-5 mr-2"/>
              Wishlist
            </Button>           
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col items-center">
            <Image 
                src={data?.imgUrl!}
                alt=""
                height={40}
                width={40}
            /> 
          </div>  
        </PopoverContent>
      </Popover>
    </>
  );
};
