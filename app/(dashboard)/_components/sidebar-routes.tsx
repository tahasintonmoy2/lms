"use client"
import { Layers3, Compass, ListVideo, PieChart, LayoutDashboard } from 'lucide-react'
import {CgPlayList} from 'react-icons/cg'
import {FaLayerGroup} from 'react-icons/fa'
import {usePathname} from 'next/navigation'
import SidebarItem from './sidebarItem'

const guestRoutes = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        href: '/'
    }, 
       {
        icon: Compass,
        label: 'Explore Courses',
        href: '/search'
    }
]

const teacherRoutes = [
    {
        icon: CgPlayList,
        label: 'Courses',
        href: '/teacher/courses'
    }, 
       {
        icon: PieChart,
        label: 'Analytics',
        href: '/teacher/analytics'
    }
]

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes('/teacher');

    const route = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className='flex flex-col w-full'>
        {route.map((route)=>(
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
        ))}
    </div>
  )
}

export default SidebarRoutes