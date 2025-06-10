import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Notification {
  id: string;
  type: "delivery" | "promotion" | "ar" | "review";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  imageUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "delivery",
      title: "Заказ в пути!",
      message:
        "Ваш букет 'Красные розы Страсть' будет доставлен в течение 30 минут",
      timestamp: "2024-06-10T15:20:00Z",
      read: false,
      imageUrl:
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=100",
    },
    {
      id: "2",
      type: "ar",
      title: "Новый AR-эффект!",
      message: "Попробуйте новые романтические анимации для ваших букетов",
      timestamp: "2024-06-10T10:00:00Z",
      read: false,
    },
    {
      id: "3",
      type: "promotion",
      title: "Скидка 20% на пионы",
      message: "Сезонная акция на все виды пионов до конца месяца",
      timestamp: "2024-06-09T18:00:00Z",
      read: true,
    },
    {
      id: "4",
      type: "review",
      title: "Оставьте отзыв",
      message: "Расскажите о своем опыте с букетом 'Весенний микс тюльпанов'",
      timestamp: "2024-06-09T14:30:00Z",
      read: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "delivery":
        return "Truck";
      case "promotion":
        return "Tag";
      case "ar":
        return "Camera";
      case "review":
        return "Star";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "delivery":
        return "bg-blue-500";
      case "promotion":
        return "bg-green-500";
      case "ar":
        return "bg-purple-500";
      case "review":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} мин назад`;
    } else if (hours < 24) {
      return `${hours} ч назад`;
    } else {
      return `${days} дн назад`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              Уведомления
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
              )}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-purple-600"
              >
                Прочитать все
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icon
                name="Bell"
                size={48}
                className="mx-auto mb-4 text-gray-300"
              />
              <p>Нет новых уведомлений</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors hover:bg-purple-50 ${
                  !notification.read ? "border-purple-200 bg-purple-25" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${getNotificationColor(
                        notification.type,
                      )} text-white flex-shrink-0`}
                    >
                      <Icon
                        name={getNotificationIcon(notification.type) as any}
                        size={16}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4
                          className={`font-semibold text-sm ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {notification.imageUrl && (
                          <img
                            src={notification.imageUrl}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <Button variant="outline" onClick={onClose} className="w-full">
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
