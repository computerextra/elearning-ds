"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

type MultiSelectProps = {
  values: {
    name: string;
    id: string;
    value: string;
  }[];
  selected: string[] | undefined;
  setSelected: (value: React.SetStateAction<string[] | undefined>) => void;
};

export function MultiSelect(props: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleRemove = (name: string) => {
    props.setSelected((prev) => {
      if (prev == null) return undefined;
      const temp: string[] = [];
      prev.map((x) => {
        if (x != name) temp.push(x);
      });
      return temp;
    });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        <div className="relative flex w-full flex-col items-center">
          <div className="w-full">
            <div className="border-base-300 bg-base-100 flex h-12 rounded-md">
              <div className="flex flex-auto flex-wrap">
                {props.selected?.map((x, idx) => (
                  <Selected
                    key={idx}
                    handleRemove={() => handleRemove(x)}
                    name={x}
                  />
                ))}
              </div>

              <div className="flex w-8 items-center">
                <button
                  role="button"
                  className="ps-4"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {open ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {open && (
            <div className="bg-base-100 w-full overflow-y-auto rounded shadow">
              <div className="flex w-full flex-col">
                {props.values?.map((x, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-base-300 w-full cursor-pointer rounded-t"
                  >
                    {props.selected?.includes(x.name) ? (
                      <div
                        onClick={() => handleRemove(x.name)}
                        className="border-primary relative flex w-full items-center border-l-4 p-2 pl-2"
                      >
                        <div className="flex w-full items-center">
                          <div className="mx-2 leading-6">{x.name}</div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          props.setSelected((prev) => [x.name, ...(prev ?? [])])
                        }
                        className="hover:border-primary-content relative flex w-full items-center border-l-4 border-transparent p-2 pl-2"
                      >
                        <div className="flex w-full items-center">
                          <div className="mx-2 leading-6">{x.name}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Selected({
  name,
  handleRemove,
}: {
  name: string;
  handleRemove: () => void;
}) {
  return (
    <div className="border-primary bg-primary/40 text-primary-content m-1 flex items-center justify-center rounded-full border px-2 py-1 font-medium">
      <div className="max-w-full flex-initial text-xs leading-none font-normal">
        {name}
      </div>
      <div className="flex flex-auto flex-row-reverse">
        <div>
          <X className="h-4 w-4 cursor-pointer" onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
}
