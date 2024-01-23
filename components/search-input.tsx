"use client";

import qs from "query-string";
import { Search, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      {value.length === 0 ? (
        <Search className="h-4 w-4 absolute hidden top-3 left-3 text-slate-600" />
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setValue("")}
          className="absolute top-1 md:ml-64 ml-[18.6rem] flex items-center text-slate-600"
        >
          <XIcon className="h-5 w-5 gap-y-3" />
        </Button>
      )}
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};
