import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  userProfileData,
  destinations,
} from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import DestinationCard from "@/components/destination-card";
import { Globe, Award, Star, Mountain, Plane } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const badgeIcons: { [key: string]: React.ElementType } = {
  'Globe Trotter': Globe,
  'Adventure Seeker': Mountain,
  'Culture Vulture': Award,
  'First Trip': Plane,
};

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find(
    (p) => p.id === userProfileData.avatarId
  );
  const savedTrips = destinations.filter((d) =>
    userProfileData.savedTrips.includes(d.id)
  );
  const travelHistory = userProfileData.travelHistory.map(h => {
    const dest = destinations.find(d => d.id === h.destinationId);
    return {...h, ...dest};
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-12">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/20">
          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userProfileData.name} data-ai-hint={userAvatar.imageHint}/>}
          <AvatarFallback>{userProfileData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{userProfileData.name}</h1>
          <p className="text-lg text-muted-foreground">{userProfileData.email}</p>
          <div className="mt-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-lg">{userProfileData.loyaltyPoints}</span>
            <span className="text-muted-foreground">Loyalty Points</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="saved-trips">Saved Trips</TabsTrigger>
          <TabsTrigger value="travel-history">Travel History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>My Badges</CardTitle>
                    <CardDescription>Your collection of travel achievements. Keep exploring to earn more!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
                        {userProfileData.badges.map(badge => {
                            const Icon = badgeIcons[badge.name] || Star;
                            return (
                                <div key={badge.name} className="flex flex-col items-center gap-2">
                                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center border-2 border-dashed border-accent">
                                        <Icon className="h-10 w-10 text-accent" />
                                    </div>
                                    <p className="font-semibold text-sm">{badge.name}</p>
                                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="saved-trips" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedTrips.map(dest => (
                    <DestinationCard key={dest.id} destination={dest}/>
                ))}
            </div>
             {savedTrips.length === 0 && (
                <div className="text-center py-16 rounded-lg border-2 border-dashed">
                    <h3 className="text-2xl font-semibold">No Saved Trips</h3>
                    <p className="text-muted-foreground mt-2">Start exploring and save your dream destinations!</p>
                </div>
            )}
        </TabsContent>
        <TabsContent value="travel-history" className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>My Travel Journal</CardTitle>
                    <CardDescription>A look back at the amazing places you've been.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {travelHistory.map((trip, index) => {
                            const tripImage = PlaceHolderImages.find(p => p.id === trip.imageId);
                            return (
                                <li key={index}>
                                    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50">
                                        {tripImage && <Image src={tripImage.imageUrl} alt={trip.name || ""} width={80} height={80} className="rounded-md object-cover" data-ai-hint={tripImage.imageHint}/>}
                                        <div className="flex-grow">
                                            <p className="font-bold text-lg">{trip.name}</p>
                                            <p className="text-muted-foreground">{trip.country}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                                    </div>
                                    {index < travelHistory.length -1 && <Separator />}
                                </li>
                            )
                        })}
                    </ul>
                     {travelHistory.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold">Your Adventure Awaits</h3>
                            <p className="text-muted-foreground mt-2">Your travel history is empty. Time to book a trip!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
