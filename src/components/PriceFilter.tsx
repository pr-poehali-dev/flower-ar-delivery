import { Badge } from "@/components/ui/badge";
import { PriceRange } from "@/types/flower";

interface PriceFilterProps {
  priceRanges: PriceRange[];
  selectedRange: string | null;
  onRangeSelect: (rangeId: string) => void;
}

const PriceFilter = ({
  priceRanges,
  selectedRange,
  onRangeSelect,
}: PriceFilterProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800">Ценовая категория</h3>
      <div className="flex flex-wrap gap-2">
        {priceRanges.map((range) => (
          <Badge
            key={range.id}
            variant={selectedRange === range.id ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 ${
              selectedRange === range.id
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-100"
            } ${range.popular ? "ring-1 ring-purple-300" : ""}`}
            onClick={() => onRangeSelect(range.id)}
          >
            {range.label}
            {range.popular && <span className="ml-1">🔥</span>}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PriceFilter;
