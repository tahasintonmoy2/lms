"use client"
import React from 'react'
import {Menu} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

const MobileSidebar = () => {
  return (
    <div>
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-70 transition'>
        <Menu/>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 bg-white'>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileSidebar