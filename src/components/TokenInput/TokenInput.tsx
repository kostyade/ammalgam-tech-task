import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Token } from "@/hooks/useGetTokensList";
import { CommandList } from "cmdk";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface TokenInputProps {
  tokenList: Token[];
  setSelectedToken: (token?: Token) => void;
}

export function TokenInput({ tokenList, setSelectedToken }: TokenInputProps) {
  const tokenListInputModel = tokenList
    ? tokenList.map((token) => ({
        value: token.coinGeckoId,
        label: `${token.name} (${token.symbol})`,
      }))
    : [];
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectToken = (tokenId?: string) => {
    const selectedToken = tokenList.find(
      (token) => token.coinGeckoId === tokenId
    );
    if (selectedToken) {
      setSelectedToken(selectedToken);
    }
  };

  const onSelect = (currentValue: string) => {
    if (currentValue === value) {
      setValue("");
      setSelectedToken(undefined);
    } else {
      setValue(currentValue);
      selectToken(currentValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tokenListInputModel.find((tokenData) => tokenData.value === value)
                ?.label
            : "Select token..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea className="flex flex-col" type="always">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandGroup>
              <CommandList className="overflow-y-auto max-h-56">
                {tokenListInputModel.map((tokenData) => (
                  <CommandItem
                    key={tokenData.value}
                    value={tokenData.value}
                    onSelect={onSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === tokenData.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tokenData.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
