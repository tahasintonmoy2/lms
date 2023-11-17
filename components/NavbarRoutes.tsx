"use client"
import { UserButton } from "@clerk/nextjs";
import {usePathname} from 'next/navigation'
import { Button } from "@/components/ui/button";
import React, { useState, useEffect} from "react";
import Link from 'next/link'
import { LogInIcon, LogOut } from "lucide-react";
import { SearchInput } from "@/components/search-input";

const NavbarRoutes = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false);

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isVideoPlayerPage = pathname?.includes('/courses')
  const isSearchPage = pathname === '/search'

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  }

  return (
    <>
     {isSearchPage && (
       <div className="hidden md:block">
        <SearchInput />
       </div>
     )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isVideoPlayerPage ? (
          <Link href='/'>
          <Button size='sm' variant='outline'>
            Exit
            <LogOut className="h-4 w-4 ml-2"/>
          </Button>
          </Link>
        ):(
          <Link href='/teacher/courses'>
            <Button size='sm' variant='outline'>
              Switch to Teacher Mode
              <LogInIcon className="h-4 w-4 ml-2"/>
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/auth/sign-in"/>
      </div>
    </>
  );
};

export default NavbarRoutes;
