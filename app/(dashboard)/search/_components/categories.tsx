"use client"

import { Category } from '@prisma/client'
import React from 'react'
import { 
    FcEngineering,
    FcMultipleCameras
} from 'react-icons/fc'
import { BiSolidVideos } from "react-icons/bi";
import { MdComputer } from "react-icons/md";
import {
    BiLogoReact,
    BiLogoNodejs,
} from 'react-icons/bi'
import { TbBrandNextjs } from "react-icons/tb";
import { SiPrisma, SiTypescript, SiMongodb ,SiJavascript } from "react-icons/si";
import { FaRust } from "react-icons/fa";
import { 
    IconType
} from 'react-icons'
import { CategoryItem } from './category-item';

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Next JS": TbBrandNextjs,
    "NodeJS": BiLogoNodejs,
    "React JS": BiLogoReact,
    "Software Engineering": FcEngineering,
    "Computer Science": MdComputer,
    "Prisma DB": SiPrisma,
    "Rust": FaRust,
    "TypeScript": SiTypescript,
    "MongoDB": SiMongodb,
    "Videography": BiSolidVideos,
    "JavaScript": SiJavascript,
    "Photography": FcMultipleCameras
}

export const Categories = ({
    items
}: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
       {items.map((item)=> (
         <CategoryItem 
            key={item.id}
            value={item.id}
            label={item.name}
            icon={iconMap[item.name]}
         />
       ))}
    </div>
  )
}
