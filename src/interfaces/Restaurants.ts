interface LatitudLongitud {
  lat: number;
  lng: number;
}

export interface RestaurantInfo {
  businessStatus: string;
  geometry: {
    location: LatitudLongitud;
    viewport: {
      northeast: LatitudLongitud;
    };
    southwest: LatitudLongitud;
  };
  icon: string;
  name: string;
  openingHours: {
    openNow: boolean;
  };
  photos: string[];
  placeId: string;
  rating: number;
  reference: string;
  userRatingsTotal: number;
  vicinity: string;
  isOpenHours: boolean;
  isClosedTemporarily: boolean;
}

export interface Restaurant {
  html_attributions: string[];
  next_page_token: string;
  results: RestaurantInfo[];
}
