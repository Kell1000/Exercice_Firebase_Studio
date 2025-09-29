export type TravelType = "Adventure" | "Relaxation" | "Cultural" | "Party";
export type Budget = "$500-1000" | "$1000-2000" | "$2000-3000" | "$3000+";
export type Duration = "Weekend" | "1 Week" | "2 Weeks" | "3+ Weeks";

export interface Destination {
  id: string;
  name: string;
  country: string;
  imageId: string;
  travelType: TravelType;
  budget: Budget;
  duration: Duration;
  description: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  destination: string;
  price: number;
  originalPrice: number;
  imageId: string;
  description: string;
}

export interface UserReview {
  id: string;
  userName: string;
  userAvatarId: string;
  rating: number;
  destination: string;
  reviewText: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarId: string;
  loyaltyPoints: number;
  badges: {
    name: string;
    icon: any; // Lucide icon component
    description: string;
  }[];
  savedTrips: string[]; // array of destination ids
  travelHistory: {
    destinationId: string;
    date: string;
  }[];
}

export const destinations: Destination[] = [
  { id: '1', name: 'Kyoto', country: 'Japan', imageId: 'dest-kyoto', travelType: 'Cultural', budget: '$2000-3000', duration: '1 Week', description: 'Immerse yourself in ancient temples, serene gardens, and traditional tea houses.' },
  { id: '2', name: 'Santorini', country: 'Greece', imageId: 'dest-santorini', travelType: 'Relaxation', budget: '$2000-3000', duration: '1 Week', description: 'Iconic blue-domed churches, stunning sunsets, and volcanic beaches await.' },
  { id: '3', name: 'Patagonia', country: 'Chile/Argentina', imageId: 'dest-patagonia', travelType: 'Adventure', budget: '$3000+', duration: '2 Weeks', description: 'Hike through dramatic landscapes of glaciers, mountains, and pristine lakes.' },
  { id: '4', name: 'Bali', country: 'Indonesia', imageId: 'dest-bali', travelType: 'Relaxation', budget: '$1000-2000', duration: '2 Weeks', description: 'Find your zen with yoga retreats, beautiful beaches, and vibrant spiritual culture.' },
  { id: '5', name: 'Rome', country: 'Italy', imageId: 'dest-rome', travelType: 'Cultural', budget: '$1000-2000', duration: '1 Week', description: 'Walk through history itself, from the Colosseum to the Vatican, and enjoy world-class pasta.' },
  { id: '6', name: 'Iceland', country: 'Iceland', imageId: 'dest-iceland', travelType: 'Adventure', budget: '$2000-3000', duration: '1 Week', description: 'Chase waterfalls, witness the Northern Lights, and explore a land of fire and ice.' },
  { id: '7', name: 'Queenstown', country: 'New Zealand', imageId: 'dest-newzealand', travelType: 'Adventure', budget: '$3000+', duration: '2 Weeks', description: 'The adventure capital of the world, offering everything from bungee jumping to scenic hikes.' },
  { id: '8', name: 'Cusco & Machu Picchu', country: 'Peru', imageId: 'dest-peru', travelType: 'Cultural', budget: '$1000-2000', duration: '1 Week', description: 'Discover the heart of the Inca Empire and the mysterious beauty of Machu Picchu.' },
  { id: '9', name: 'Thai Islands', country: 'Thailand', imageId: 'dest-thailand', travelType: 'Party', budget: '$500-1000', duration: '2 Weeks', description: 'Experience world-famous full moon parties, scuba diving, and stunning beaches.' },
  { id: '10', name: 'Marrakech', country: 'Morocco', imageId: 'dest-morocco', travelType: 'Cultural', budget: '$500-1000', duration: '1 Week', description: 'Get lost in the vibrant souks, stay in a traditional riad, and explore the desert.' },
  { id: '11', name: 'Monteverde', country: 'Costa Rica', imageId: 'dest-costarica', travelType: 'Adventure', budget: '$1000-2000', duration: '1 Week', description: 'Walk among the clouds in lush cloud forests and zipline through the canopy.' },
  { id: '12', name: 'Cairo', country: 'Egypt', imageId: 'dest-egypt', travelType: 'Cultural', budget: '$1000-2000', duration: '1 Week', description: 'Uncover the secrets of the pharaohs, from the Great Pyramids to bustling Khan el-Khalili.' },
];

export const trendingDestinations: Destination[] = destinations.filter(d => ['1', '2', '3', '4', '5', '6'].includes(d.id));

export const specialOffers: SpecialOffer[] = [
  { id: '1', title: 'European Express', destination: 'Paris, Rome, Barcelona', price: 1499, originalPrice: 1999, imageId: 'offer-europe', description: 'A whirlwind 10-day tour of three of Europe\'s most iconic cities. Perfect for first-timers!' },
  { id: '2', title: 'Southeast Asia Backpacking', destination: 'Thailand, Vietnam, Cambodia', price: 999, originalPrice: 1399, imageId: 'offer-asia', description: 'Discover the magic of Southeast Asia on this 3-week backpacking adventure. All hostels included.' },
  { id: '3', title: 'Island Hopper Paradise', destination: 'Maldives', price: 2499, originalPrice: 3499, imageId: 'offer-islands', description: 'Escape to a luxurious overwater bungalow in the Maldives. The ultimate relaxation package.' },
  { id: '4', title: 'Adrenaline Junkie\'s Dream', destination: 'Queenstown, New Zealand', price: 1999, originalPrice: 2499, imageId: 'offer-adventure', description: 'Get your heart racing with bungee jumping, skydiving, and white water rafting in Queenstown.' },
];

export const userReviews: UserReview[] = [
  { id: '1', userName: 'Sarah J.', userAvatarId: 'avatar-1', rating: 5, destination: 'Kyoto, Japan', reviewText: 'Wanderlust Compass made my trip to Kyoto unforgettable! The recommendations were spot on. The Gion district was magical at night. ✨' },
  { id: '2', userName: 'Mike P.', userAvatarId: 'avatar-2', rating: 5, destination: 'Patagonia, Chile', reviewText: 'The trek to Torres del Paine was the hardest but most rewarding thing I\'ve ever done. The views were literally breathtaking. 10/10 would recommend.' },
  { id: '3', userName: 'Alex G.', userAvatarId: 'avatar-3', rating: 4, destination: 'Bali, Indonesia', reviewText: 'Such a spiritual and relaxing place. The yoga retreat was amazing, though the traffic in Canggu can be a bit crazy. Loved the smoothie bowls! 🥭' },
  { id: '4', userName: 'Jessica L.', userAvatarId: 'avatar-4', rating: 5, destination: 'Santorini, Greece', reviewText: 'Felt like I was in a movie! The sunsets in Oia are worth the hype. Book a catamaran tour, you won\'t regret it. ⛵' },
];

export const userProfileData: UserProfile = {
  name: 'Alex Rider',
  email: 'alex.rider@example.com',
  avatarId: 'user-avatar',
  loyaltyPoints: 1250,
  badges: [
    { name: 'Globe Trotter', description: 'Visit 3 continents' },
    { name: 'Adventure Seeker', description: 'Complete 5 adventure trips' },
    { name: 'Culture Vulture', description: 'Complete 5 cultural trips' },
    { name: 'First Trip', description: 'Book your first trip' },
  ],
  savedTrips: ['2', '6', '10'],
  travelHistory: [
    { destinationId: '1', date: 'May 2023' },
    { destinationId: '4', date: 'October 2022' },
  ],
};
