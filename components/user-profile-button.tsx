"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const UserProfileButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [position, setPosition] = useState("system");
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm pl-12 pr-4 md:pr-2 md:pl-2">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-7 w-7 cursor-pointer">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-90 dark:bg-[#0f111a]"
        align="end"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-2 p-2">
          <p className="text-base font-medium leading-none text-muted-foreground">
            {user?.fullName}
          </p>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator className="border border-b" />
        <DropdownMenuItem
          className="w-full flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none"
          onClick={() => {}}
        >
          <User2 className="h-5 w-5 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <CreditCard className="h-5 w-5 mr-2" />
          Subscription & Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full py-0 px-0 flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <SignOutButton>
            <Button
              onClick={() => signOut(() => router.push("/auth/sign-in"))}
              variant="ghost"
              size="sm"
              className="cursor-default w-full flex items-center justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
