"use client";
import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  Combobox,
  Transition,
  TransitionChild,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import NoResults from "@/components/ui/no-results";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface CommandBarProps {
  items: Course[];
  valueKey?: string;
}

const CommandBar: React.FC<CommandBarProps> = ({ items }) => {
  const [query, setQuery] = useState("");

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const router = useRouter();

  const onRedirect = (courseId: string) => {
    window.location.href = `/courses/${courseId}`;
  }

  const filterProducts = query
    ? items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        event.stopPropagation();
        toggle();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <Transition show={isOpen} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        onClose={onClose}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] z-[99999999]"
      >
        <TransitionChild
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div onClick={onClose} className=" fixed inset-0 bg-gray-500/70 backdrop-blur-sm" />
        </TransitionChild>

        <TransitionChild
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className=" overflow-hidden relative rounded-xl shadow-2xl divide-y divide-gray-200 bg-white mx-auto max-w-xl"
            onChange={(item) => {
              {
                filterProducts.map((item) =>
                    onRedirect(item.id)
                );
              }
            }}
          >
            <div className="flex justify-center items-center">
              <Search size={20} className=" text-gray-400 ml-2" />
              <ComboboxInput
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className=" w-full py-3 px-2 bg-transparent border-0 focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
              <Button
                variant="ghost"
                onClick={onClose}
                size="cmd"
                className="absolute ml-64 lg:ml-[31rem] border flex items-center text-slate-600"
              >
                ESC
              </Button>
            </div>

            {filterProducts.length > 0 && (
              <ComboboxOptions
                static
                className="group max-h-96 overflow-x-hidden truncate overflow-y-auto py-4"
              >
                {filterProducts.map((item) => (
                  <ComboboxOption key={item.id} value={item}>
                    {({ focus }) => (
                      <div
                        className={`space-x-1 py-2 px-2 ${
                          focus ? "bg-blue-600" : "bg-white"
                        }`}
                      >
                        <span
                          className={`py-2 px-2 ${
                            focus ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
            {query && filterProducts.length === 0 && <NoResults />}
          </Combobox>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default CommandBar;
