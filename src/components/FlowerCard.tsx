import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Flower } from "@/types/flower";

interface FlowerCardProps {
  flower: Flower;
  onViewDetails: (flower: Flower) => void;
  onAddToCart: (flower: Flower) => void;
}

const FlowerCard = ({
  flower,
  onViewDetails,
  onAddToCart,
}: FlowerCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={flower.image}
          alt={flower.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Icon name="Camera" size={16} className="text-purple-600" />
        </div>
        {flower.seasonal && (
          <Badge className="absolute top-2 left-2 bg-green-500">Сезонные</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {flower.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Icon
                name="Star"
                size={14}
                className="text-yellow-500 fill-current"
              />
              <span>{flower.rating}</span>
              <span>({flower.reviewCount})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {flower.colors.map((color, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {color}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-purple-600">
              {formatPrice(flower.price)}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(flower)}
              >
                <Icon name="Eye" size={16} />
              </Button>
              <Button
                size="sm"
                onClick={() => onAddToCart(flower)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Icon name="ShoppingCart" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowerCard;
