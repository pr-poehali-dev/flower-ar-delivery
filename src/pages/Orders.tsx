import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderTracking from "@/components/OrderTracking";
import Icon from "@/components/ui/icon";

interface Order {
  id: string;
  date: string;
  status: "preparing" | "delivering" | "delivered" | "cancelled";
  flowers: Array<{
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  deliveryAddress: string;
  recipient: string;
}

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "2024-06-10T14:15:00Z",
      status: "delivering",
      flowers: [
        {
          name: "Красные розы 'Страсть'",
          image:
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=100",
          quantity: 1,
          price: 4500,
        },
        {
          name: "Розовые пионы 'Нежность'",
          image:
            "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=100",
          quantity: 1,
          price: 6800,
        },
      ],
      totalPrice: 11300,
      deliveryAddress: "ул. Тверская, 15, кв. 42",
      recipient: "Анна Смирнова",
    },
    {
      id: "ORD-002",
      date: "2024-06-08T16:30:00Z",
      status: "delivered",
      flowers: [
        {
          name: "Весенний микс тюльпанов",
          image:
            "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=100",
          quantity: 2,
          price: 3200,
        },
      ],
      totalPrice: 6400,
      deliveryAddress: "пр. Мира, 89, офис 205",
      recipient: "Елена Петрова",
    },
    {
      id: "ORD-003",
      date: "2024-06-05T11:20:00Z",
      status: "delivered",
      flowers: [
        {
          name: "Белые орхидеи 'Элегия'",
          image:
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100",
          quantity: 1,
          price: 8900,
        },
      ],
      totalPrice: 8900,
      deliveryAddress: "ул. Арбат, 27, кв. 15",
      recipient: "Мария Иванова",
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "preparing":
        return { label: "Готовится", color: "bg-yellow-500" };
      case "delivering":
        return { label: "В доставке", color: "bg-blue-500" };
      case "delivered":
        return { label: "Доставлен", color: "bg-green-500" };
      case "cancelled":
        return { label: "Отменен", color: "bg-red-500" };
      default:
        return { label: "Неизвестно", color: "bg-gray-500" };
    }
  };

  const activeOrders = orders.filter(
    (order) => order.status === "preparing" || order.status === "delivering",
  );

  const completedOrders = orders.filter(
    (order) => order.status === "delivered" || order.status === "cancelled",
  );

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedOrder(null)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-purple-600">
                Отслеживание заказа
              </h1>
              <p className="text-sm text-gray-600">#{selectedOrder}</p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          <OrderTracking orderId={selectedOrder} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-purple-600">Мои заказы</h1>
          <p className="text-sm text-gray-600">История покупок и доставки</p>
        </div>
      </header>

      <main className="px-4 py-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center gap-2">
              Активные
              {activeOrders.length > 0 && (
                <Badge className="bg-blue-500 text-white">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              История ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Icon
                    name="Package"
                    size={48}
                    className="mx-auto mb-4 text-gray-400"
                  />
                  <p className="text-gray-600">Нет активных заказов</p>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <Card
                    key={order.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">#{order.id}</CardTitle>
                        <Badge className={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.date)}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {order.flowers.map((flower, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <img
                              src={flower.image}
                              alt={flower.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {flower.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                Количество: {flower.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-purple-600">
                              {formatPrice(flower.price * flower.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Получатель:</p>
                          <p className="font-medium">{order.recipient}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Итого:</p>
                          <p className="text-lg font-bold text-purple-600">
                            {formatPrice(order.totalPrice)}
                          </p>
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Icon name="MapPin" size={16} />
                        Отследить заказ
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">#{order.id}</CardTitle>
                      <Badge className={statusInfo.color}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.date)}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {order.flowers.map((flower, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={flower.image}
                            alt={flower.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{flower.name}</p>
                            <p className="text-xs text-gray-600">
                              Количество: {flower.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-purple-600">
                            {formatPrice(flower.price * flower.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Итого:</p>
                        <p className="text-lg font-bold text-purple-600">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="RotateCcw" size={14} />
                          Повторить
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageSquare" size={14} />
                          Отзыв
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Orders;
