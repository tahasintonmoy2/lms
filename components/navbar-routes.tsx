"use client";

import MobileSidebar from "@/app/(dashboard)/_components/mobile-sidebar";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { UserProfileButton } from "@/components/user-profile-button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { LogInIcon, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { userId } = useAuth();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isVideoPlayerPage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_ID;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className="fixed z-50 navbar-width flex justify-between backdrop-blur">
        <div
          className={cn(
            "items-center gap-x-4",
            isDesktop ? "lg:flex" : "hidden"
          )}
        >
          <SearchInput />
        </div>
        <div
          className={cn(
            "flex justify-between gap-x-2",
            isDesktop ? "ml-72" : "ml-4"
          )}
        >
          <div className={cn("", isDesktop ? "hidden" : "block")}>
            {/* {!isPro && (
            <SubscriptionButton isPro={isPro} />
          )} */}
            <MobileSidebar />
          </div>
          <div className="lg:ml-0 ml-48 flex items-center">
            {isTeacherPage || isVideoPlayerPage ? (
              <a href="/">
                <Button size="sm" variant="outline">
                  Exit
                  <LogOut className="h-4 w-4 ml-2" />
                </Button>
              </a>
            ) : isAdmin ? (
              <a href="/teacher/courses">
                <Button size="sm" variant="outline">
                  Teacher Mode
                  <LogInIcon className="h-4 w-4 ml-2" />
                </Button>
              </a>
            ) : null}
            <UserProfileButton />
          </div>
        </div>
      </nav>
    </>
  );
};
