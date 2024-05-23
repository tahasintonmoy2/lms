"use client";

import { Search, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { title: debouncedValue },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" relative w-full lg:w-[400px] flex items-center"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none rounded-l-full py-2 pl-4 border outline-none dark:bg-[#0f111a] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-slate-700 border-r-0 lg:w-[600px]"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="text-muted-foreground absolute top-2.5 right-14 cursor-pointer hover:opacity-75 transition"
        >
          <XIcon className="h-5 w-5 gap-y-3" />
        </button>
      )}
      <button
        type="submit"
        className="rounded-l-none rounded-r-full px-3 pb-3 pt-[0.6rem] text-white bg-blue-600"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};
