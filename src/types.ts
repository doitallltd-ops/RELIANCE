export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  weightOrVolume: string;
  mrp: number;
  price: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isSmartOffer?: boolean;
  tag?: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HourlyBusyness {
  hour: number; // 6 to 22 (6am to 10pm)
  label: string; // "6a", "9a", "12p", "3p", "6p", "9p"
  busynessPercent: number; // 0 to 100
  crowdLevel: 'Usually not busy' | 'Not too busy' | 'A little busy' | 'As busy as it gets';
  isCurrentLiveHour?: boolean;
}

export interface DayPopularity {
  dayName: 'Mondays' | 'Tuesdays' | 'Wednesdays' | 'Thursdays' | 'Fridays' | 'Saturdays' | 'Sundays';
  peakHourDescription: string;
  typicalWaitDescription: string;
  hours: HourlyBusyness[];
}

export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  relativeTime: string;
  content: string;
  likes: number;
  userAvatarBg: string;
  verifiedCustomer?: boolean;
  localGuideLevel?: number;
}

export interface StoreDetails {
  name: string;
  brandNameHindi: string;
  tagline: string;
  overallRating: number;
  totalReviews: number;
  category: string;
  wheelchairAccessible: boolean;
  deliveryAvailable: boolean;
  address: {
    full: string;
    line1: string;
    line2: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    plusCode: string;
  };
  phone: string;
  website: string;
  hours: {
    openTime: string;
    closeTime: string;
    isOpenNow: boolean;
    closingString: string;
    weeklySchedule: { day: string; hours: string; isToday?: boolean }[];
  };
  popularTimes: DayPopularity[];
  features: string[];
}
