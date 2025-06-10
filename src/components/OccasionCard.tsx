import { Card } from "@/components/ui/card";
import { Occasion } from "@/types/flower";

interface OccasionCardProps {
  occasion: Occasion;
  onClick: (occasion: Occasion) => void;
  isSelected?: boolean;
}

const OccasionCard = ({
  occasion,
  onClick,
  isSelected = false,
}: OccasionCardProps) => {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isSelected
          ? "ring-2 ring-purple-500 bg-purple-50"
          : "hover:bg-purple-50"
      }`}
      onClick={() => onClick(occasion)}
    >
      <div className="text-center space-y-3">
        <div className="text-4xl mb-2">{occasion.icon}</div>
        <h3 className="font-semibold text-lg text-gray-800">{occasion.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {occasion.description}
        </p>
      </div>
    </Card>
  );
};

export default OccasionCard;
