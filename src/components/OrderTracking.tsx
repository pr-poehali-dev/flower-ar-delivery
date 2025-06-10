import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface OrderStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp?: string;
  icon: string;
}

interface Order {
  id: string;
  status: "preparing" | "delivering" | "delivered";
  flowers: string[];
  totalPrice: number;
  deliveryTime: string;
  steps: OrderStep[];
}

interface OrderTrackingProps {
  orderId: string;
}

const OrderTracking = ({ orderId }: OrderTrackingProps) => {
  const [order] = useState<Order>({
    id: orderId,
    status: "delivering",
    flowers: ["Красные розы 'Страсть'", "Розовые пионы 'Нежность'"],
    totalPrice: 11300,
    deliveryTime: "15:30 - 16:00",
    steps: [
      {
        id: "ordered",
        title: "Заказ принят",
        description: "Ваш заказ поступил в обработку",
        completed: true,
        timestamp: "14:15",
        icon: "CheckCircle",
      },
      {
        id: "preparing",
        title: "Букет готовится",
        description: "Флорист создает ваш букет",
        completed: true,
        timestamp: "14:45",
        icon: "Package",
      },
      {
        id: "delivering",
        title: "В пути",
        description: "Курьер направляется к получателю",
        completed: true,
        timestamp: "15:20",
        icon: "Truck",
      },
      {
        id: "delivered",
        title: "Доставлено",
        description: "Букет передан получателю",
        completed: false,
        icon: "Heart",
      },
    ],
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500";
      case "delivering":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Заказ #{order.id}</CardTitle>
            <Badge className={getStatusColor(order.status)}>
              {order.status === "preparing" && "Готовится"}
              {order.status === "delivering" && "В доставке"}
              {order.status === "delivered" && "Доставлен"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Время доставки:</span>
            <span className="font-semibold">{order.deliveryTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Сумма заказа:</span>
            <span className="font-bold text-purple-600">
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статус доставки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.completed
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon name={step.icon as any} size={16} />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-semibold ${
                        step.completed ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h4>
                    {step.timestamp && (
                      <span className="text-sm text-gray-600">
                        {step.timestamp}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      step.completed ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                  {index < order.steps.length - 1 && step.completed && (
                    <div className="w-px h-4 bg-purple-200 ml-4 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <Icon name="Phone" size={16} />
          Связаться с курьером
        </Button>
        <Button variant="outline" className="flex-1">
          <Icon name="MessageCircle" size={16} />
          Поддержка
        </Button>
      </div>
    </div>
  );
};

export default OrderTracking;
