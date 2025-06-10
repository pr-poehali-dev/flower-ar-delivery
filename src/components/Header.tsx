import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onBackClick?: () => void;
  title?: string;
}

const Header = ({
  cartItemCount,
  onCartClick,
  onBackClick,
  title,
}: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackClick && (
            <Button variant="ghost" size="sm" onClick={onBackClick}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-bold text-purple-600">Цветочный Код</h1>
            {title && <p className="text-sm text-gray-600">{title}</p>}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onCartClick}
          className="relative"
        >
          <Icon name="ShoppingCart" size={20} />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
