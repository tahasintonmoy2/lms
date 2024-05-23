"use client";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogInIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProfileButton } from "@/components/user-profile-button";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { userId } = useAuth();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isVideoPlayerPage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_ID;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className="fixed z-50 px-4 w-[75rem] flex items-center justify-between backdrop-blur">
        <div className="flex items-center gap-x-4">
          <SearchInput />
        </div>
        <div className="ml-auto flex items-center gap-x-2">
          <div className="md:block hidden">
            {/* {!isPro && (
            <SubscriptionButton isPro={isPro} />
          )} */}
          </div>
          {isTeacherPage || isVideoPlayerPage ? (
            <Link href="/">
              <Button size="sm" variant="outline">
                Exit
                <LogOut className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          ) : isAdmin ? (
            <Link href="/teacher/courses">
              <Button size="sm" variant="outline">
                Switch to Teacher Mode
                <LogInIcon className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          ) : null}
          <UserProfileButton />
        </div>
      </nav>
    </>
  );
};
