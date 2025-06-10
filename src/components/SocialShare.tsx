import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface SocialShareProps {
  isOpen: boolean;
  onClose: () => void;
  arImageUrl?: string;
  flowerName: string;
}

const SocialShare = ({
  isOpen,
  onClose,
  arImageUrl,
  flowerName,
}: SocialShareProps) => {
  const shareText = `Посмотрите на этот удивительный AR-букет "${flowerName}" от Color Code! 🌸✨ #ColorCodeAR #ЦветыAR`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(window.location.href);

    let shareUrl = "";

    switch (platform) {
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "vk":
        shareUrl = `https://vk.com/share.php?url=${encodedUrl}&title=${encodedText}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      case "instagram":
        // Instagram не поддерживает прямой шеринг через URL
        navigator.clipboard.writeText(shareText);
        alert("Текст скопирован! Откройте Instagram и вставьте в Stories");
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }

    onClose();
  };

  const socialPlatforms = [
    {
      id: "telegram",
      name: "Telegram",
      icon: "Send",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "MessageCircle",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "vk",
      name: "ВКонтакте",
      icon: "Users",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "Camera",
      color: "bg-pink-500 hover:bg-pink-600",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Поделиться AR-букетом</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {arImageUrl && (
            <div className="relative">
              <img
                src={arImageUrl}
                alt={flowerName}
                className="w-full h-40 object-cover rounded-lg"
              />
              <Badge className="absolute top-2 right-2 bg-purple-600">
                AR-эффект
              </Badge>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center">
              Поделитесь уникальным AR-опытом с друзьями!
            </p>

            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.id}
                  onClick={() => handleShare(platform.id)}
                  className={`${platform.color} text-white flex items-center gap-2`}
                >
                  <Icon name={platform.icon as any} size={16} />
                  <span className="text-sm">{platform.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                alert("Ссылка скопирована!");
              }}
              className="w-full"
            >
              <Icon name="Copy" size={16} />
              Скопировать ссылку
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShare;
