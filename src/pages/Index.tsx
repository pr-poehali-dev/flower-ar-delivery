import { useState } from "react";
import { occasions, flowers, priceRanges } from "@/data/flowers";
import { Flower, Occasion, CartItem } from "@/types/flower";
import OccasionCard from "@/components/OccasionCard";
import FlowerCard from "@/components/FlowerCard";
import PriceFilter from "@/components/PriceFilter";
import Header from "@/components/Header";
import FloatingARButton from "@/components/FloatingARButton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(
    null,
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  const [selectedFlowerType, setSelectedFlowerType] = useState<string | null>(
    null,
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showFlowerDetails, setShowFlowerDetails] = useState<Flower | null>(
    null,
  );
  const [showCart, setShowCart] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);

  const filteredFlowers = flowers.filter((flower) => {
    const matchesOccasion =
      !selectedOccasion || flower.occasions.includes(selectedOccasion.id);
    const matchesPrice =
      !selectedPriceRange || flower.priceRange === selectedPriceRange;
    const matchesType =
      !selectedFlowerType || flower.type === selectedFlowerType;
    return matchesOccasion && matchesPrice && matchesType;
  });

  const addToCart = (flower: Flower) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.flower.id === flower.id);
      if (existing) {
        return prev.map((item) =>
          item.flower.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          flower,
          quantity: 1,
          selectedColor: flower.colors[0],
        },
      ];
    });
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum, item) => sum + item.flower.price * item.quantity,
      0,
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const flowerTypes = [
    { id: "roses", name: "Розы", emoji: "🌹" },
    { id: "tulips", name: "Тюльпаны", emoji: "🌷" },
    { id: "peonies", name: "Пионы", emoji: "🌸" },
    { id: "orchids", name: "Орхидеи", emoji: "🌺" },
    { id: "lilies", name: "Лилии", emoji: "🌻" },
    { id: "chrysanthemums", name: "Хризантемы", emoji: "💐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        title={selectedOccasion ? selectedOccasion.name : undefined}
      />

      <main className="px-4 py-6 space-y-8">
        {/* Выбор повода */}
        {!selectedOccasion && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Выберите повод
              </h2>
              <p className="text-gray-600">
                Подберем идеальный букет для вашего события
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {occasions.map((occasion) => (
                <OccasionCard
                  key={occasion.id}
                  occasion={occasion}
                  onClick={setSelectedOccasion}
                />
              ))}
            </div>
          </section>
        )}

        {/* Каталог цветов */}
        {selectedOccasion && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Каталог букетов
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOccasion(null)}
              >
                <Icon name="ArrowLeft" size={16} />
                Назад
              </Button>
            </div>

            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filters">Фильтры</TabsTrigger>
                <TabsTrigger value="catalog">Каталог</TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-4">
                <PriceFilter
                  priceRanges={priceRanges}
                  selectedRange={selectedPriceRange}
                  onRangeSelect={setSelectedPriceRange}
                />

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Тип цветов</h3>
                  <div className="flex flex-wrap gap-2">
                    {flowerTypes.map((type) => (
                      <Badge
                        key={type.id}
                        variant={
                          selectedFlowerType === type.id ? "default" : "outline"
                        }
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedFlowerType === type.id
                            ? "bg-purple-600 text-white"
                            : "hover:bg-purple-100"
                        }`}
                        onClick={() =>
                          setSelectedFlowerType(
                            selectedFlowerType === type.id ? null : type.id,
                          )
                        }
                      >
                        {type.emoji} {type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="catalog">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFlowers.map((flower) => (
                    <FlowerCard
                      key={flower.id}
                      flower={flower}
                      onViewDetails={setShowFlowerDetails}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>

                {filteredFlowers.length === 0 && (
                  <div className="text-center py-8 text-gray-600">
                    <Icon
                      name="Flower"
                      size={48}
                      className="mx-auto mb-4 text-gray-400"
                    />
                    <p>Нет букетов по выбранным фильтрам</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </section>
        )}
      </main>

      <FloatingARButton onClick={() => setShowARPreview(true)} />

      {/* Детали цветка */}
      <Dialog
        open={!!showFlowerDetails}
        onOpenChange={() => setShowFlowerDetails(null)}
      >
        <DialogContent className="max-w-lg">
          {showFlowerDetails && (
            <>
              <DialogHeader>
                <DialogTitle>{showFlowerDetails.name}</DialogTitle>
                <DialogDescription>
                  {showFlowerDetails.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <img
                  src={showFlowerDetails.image}
                  alt={showFlowerDetails.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPrice(showFlowerDetails.price)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="Star"
                      size={16}
                      className="text-yellow-500 fill-current"
                    />
                    <span>
                      {showFlowerDetails.rating} (
                      {showFlowerDetails.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">AR-эффекты:</p>
                  <div className="flex flex-wrap gap-1">
                    {showFlowerDetails.arEffects.map((effect, index) => (
                      <Badge key={index} variant="secondary">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    addToCart(showFlowerDetails);
                    setShowFlowerDetails(null);
                  }}
                >
                  <Icon name="ShoppingCart" size={16} />
                  Добавить в корзину
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Корзина */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Корзина</DialogTitle>
            <DialogDescription>
              {cart.length === 0
                ? "Ваша корзина пуста"
                : `${cart.length} товаров в корзине`}
            </DialogDescription>
          </DialogHeader>

          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <img
                    src={item.flower.image}
                    alt={item.flower.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.flower.name}</h4>
                    <p className="text-sm text-gray-600">
                      Количество: {item.quantity}
                    </p>
                    <p className="font-bold text-purple-600">
                      {formatPrice(item.flower.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-xl font-bold text-purple-600">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Оформить заказ
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon
                name="ShoppingCart"
                size={48}
                className="mx-auto mb-4 text-gray-400"
              />
              <p className="text-gray-600">Добавьте букеты в корзину</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AR Превью */}
      <Dialog open={showARPreview} onOpenChange={setShowARPreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>AR Превью</DialogTitle>
            <DialogDescription>
              Наведите камеру на QR-код для активации AR-эффектов
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Icon
                  name="Camera"
                  size={48}
                  className="mx-auto text-purple-600"
                />
                <p className="text-gray-600">Камера AR активируется здесь</p>
                <p className="text-sm text-gray-500">
                  QR-сканер для AR-эффектов
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Icon name="QrCode" size={16} />
              Сканировать QR-код
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
