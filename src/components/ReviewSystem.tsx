import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  flowerName: string;
  arEffectUsed: string;
  images?: string[];
  helpful: number;
}

interface ReviewSystemProps {
  flowerId: string;
  flowerName: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSystem = ({
  flowerId,
  flowerName,
  reviews,
  averageRating,
  totalReviews,
}: ReviewSystemProps) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
    arEffect: "",
  });

  const StarRating = ({
    rating,
    size = 16,
    interactive = false,
    onRate,
  }: any) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={`${
              star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    // Здесь будет логика отправки отзыва
    console.log("Отзыв отправлен:", newReview);
    setShowWriteReview(false);
    setNewReview({ rating: 0, text: "", arEffect: "" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Общая статистика */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Отзывы</span>
            <Button
              size="sm"
              onClick={() => setShowWriteReview(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Icon name="MessageSquare" size={16} />
              Написать отзыв
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} size={20} />
              <div className="text-sm text-gray-600">
                {totalReviews} отзывов
              </div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter((r) => r.rating === stars).length;
                const percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-sm">
                    <span>{stars}</span>
                    <Icon name="Star" size={12} className="text-yellow-500" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список отзывов */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{review.userName}</div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-gray-600">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    AR: {review.arEffectUsed}
                  </Badge>
                </div>

                <p className="text-gray-700">{review.text}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Отзыв ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Button variant="ghost" size="sm">
                    <Icon name="ThumbsUp" size={14} />
                    Полезно ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Reply" size={14} />
                    Ответить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Диалог написания отзыва */}
      <Dialog open={showWriteReview} onOpenChange={setShowWriteReview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Написать отзыв</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Оценка</p>
              <StarRating
                rating={newReview.rating}
                size={24}
                interactive
                onRate={(rating: number) =>
                  setNewReview({ ...newReview, rating })
                }
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Ваш отзыв</p>
              <Textarea
                placeholder="Поделитесь впечатлениями о букете и AR-эффектах..."
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowWriteReview(false)}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                onClick={handleSubmitReview}
                disabled={!newReview.rating || !newReview.text}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Отправить отзыв
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewSystem;
