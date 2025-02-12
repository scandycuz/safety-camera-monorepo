import { FunctionComponent } from "react";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "../base/ui/combobox";
import { ChevronDown } from "lucide-react";

interface MultiSelectOption {
  readonly label: string;
  readonly value: string;
}

interface MultiSelectProps {
  readonly options: ReadonlyArray<MultiSelectOption>;
  readonly value: Array<string>;
  readonly onSetValue: (value: Array<string>) => void;
}

export const MultiSelect: FunctionComponent<MultiSelectProps> = ({
  options = [],
  value,
  onSetValue,
}) => {
  return (
    <Combobox
      value={value}
      onValueChange={onSetValue}
      className="w-[410px]"
      multiple
      autoHighlight
    >
      <ComboboxLabel>Alarm types</ComboboxLabel>

      <ComboboxAnchor className="h-full min-h-10 flex-wrap pl-2 pr-3 py-2 mt-1">
        <ComboboxBadgeList>
          {value.map((item) => {
            const option = options.find((option) => option.value === item);

            if (!option) return null;

            return (
              <ComboboxBadgeItem key={item} value={item}>
                {option.label}
              </ComboboxBadgeItem>
            );
          })}
        </ComboboxBadgeList>

        <ComboboxTrigger className="absolute top-3 right-2">
          <ChevronDown className="h-4 w-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent>
        {options.map((option) => (
          <ComboboxItem key={option.value} value={option.value}>
            {option.label}
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  );
};
