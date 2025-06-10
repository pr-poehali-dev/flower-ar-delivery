export interface Flower {
  id: string;
  name: string;
  type:
    | "roses"
    | "tulips"
    | "peonies"
    | "chrysanthemums"
    | "lilies"
    | "orchids";
  colors: string[];
  price: number;
  priceRange: "budget" | "mid" | "premium" | "luxury";
  image: string;
  description: string;
  seasonal: boolean;
  occasions: string[];
  arEffects: string[];
  rating: number;
  reviewCount: number;
}

export interface Occasion {
  id: string;
  name: string;
  icon: string;
  description: string;
  suggestedFlowers: string[];
}

export interface CartItem {
  flower: Flower;
  quantity: number;
  selectedColor: string;
  arEffect?: string;
}

export type PriceRange = {
  id: string;
  label: string;
  min: number;
  max: number;
  popular?: boolean;
};
