import { Command } from "cmdk";
import type { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { CommandOption } from "../../types/CommandOptions";

export interface CommandItemProps {
  onClick?: (input: CommandOption) => void;
  command: CommandOption;
}

export const CommandItem: FunctionComponent<CommandItemProps> = ({
  onClick,
  command,
}) => {
  const { t } = useTranslation("common");
  return (
    <motion.div
      onClick={() => onClick && onClick(command)}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <Command.Item className=" cursor-pointer p-1 px-3 hover:opacity-70">
        <div className="flex h-full w-full flex-row items-center justify-between rounded-lg p-1 px-3 hover:bg-gray-100 ">
          <p>{t(command.title)}</p>
          {command?.shortCut && <p>⌘{command.shortCut}</p>}
        </div>
      </Command.Item>
    </motion.div>
  );
};
