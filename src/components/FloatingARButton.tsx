import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface FloatingARButtonProps {
  onClick: () => void;
}

const FloatingARButton = ({ onClick }: FloatingARButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg animate-pulse z-50"
      size="icon"
    >
      <Icon name="Camera" size={24} className="text-white" />
    </Button>
  );
};

export default FloatingARButton;
