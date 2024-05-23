import { Combobox } from "@/components/ui/combobox";

export const CourseCombobox = ({
  options,
  onChange,
}: {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
}) => {
  return <Combobox options={options} onChange={onChange} />;
};
