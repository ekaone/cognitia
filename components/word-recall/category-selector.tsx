"use client";

import { useTaskStore } from "@/lib/store/use-task-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "animals", label: "Animals" },
  { value: "fruits", label: "Fruits" },
  { value: "countries", label: "Countries" },
  { value: "sports", label: "Sports" },
  { value: "professions", label: "Professions" },
];

export function CategorySelector() {
  const { category, setCategory } = useTaskStore();

  return (
    <div className="space-y-2">
      <label htmlFor="category-select" className="text-sm font-medium">
        Select a category
      </label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger id="category-select" className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
