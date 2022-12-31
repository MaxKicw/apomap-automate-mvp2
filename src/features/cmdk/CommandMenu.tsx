import { clsx, Loader } from "@mantine/core";
import { Command } from "cmdk";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { CommandItem } from "./CommandItem";
import { useCommands } from "../../hooks/useCommands";
import { useStore } from "../../hooks/useStore";

export const CommandMenu: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const [value, setValue] = useState<string>();
  //Store and Click
  const store = useStore();
  const { handleClick } = useCommands(store);

  // TODO:
  const commands: any = [];

  return (
    <Command className="w-[90%] border-white  focus:border-white lg:w-[40%]">
      <Command.Input
        value={value}
        onValueChange={setValue}
        placeholder={t("command.placeholder") ?? "Loading..."}
        className={clsx(
          commands?.length === 0
            ? "rounded-lg"
            : "rounded-t-lg border-b-[1px] border-b-blue-gray-500 border-opacity-25",
          "w-full border-0 p-6 text-blue-gray-500 focus:border-0 focus:border-primary-500"
        )}
      />

      <Command.List className="rounded-b-lg bg-white py-4  text-blue-gray-500">
        {/* TODO: */}
        {false && (
          <Command.Item className="p-1 px-3">
            <div className="flex h-full w-full flex-row items-center justify-between rounded-lg p-1 px-3 hover:bg-gray-100 ">
              <Loader />
            </div>
          </Command.Item>
        )}
        {commands?.map(
          (command: any) =>
            command && (
              <CommandItem
                key={command.id}
                onClick={handleClick}
                command={command}
              />
            )
        )}
      </Command.List>
    </Command>
  );
};
