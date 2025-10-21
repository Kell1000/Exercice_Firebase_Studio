"use client";

import React, { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destinations } from "@/lib/placeholder-data";
import type { Budget, TravelType, Duration } from "@/lib/placeholder-data";
import DestinationCard from "@/components/destination-card";
import { Button } from "@/components/ui/button";

const budgetOptions: Budget[] = ["$500-1000", "$1000-2000", "$2000-3000", "$3000+"];
const travelTypeOptions: TravelType[] = ["Adventure", "Relaxation", "Cultural", "Party"];
const durationOptions: Duration[] = ["Weekend", "1 Week", "2 Weeks", "3+ Weeks"];

export default function DestinationsPage() {
  const [budgetFilter, setBudgetFilter] = useState<Budget | "all">("all");
  const [travelTypeFilter, setTravelTypeFilter] = useState<TravelType | "all">("all");
  const [durationFilter, setDurationFilter] = useState<Duration | "all">("all");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (budgetFilter !== "all" && dest.budget !== budgetFilter) return false;
      if (travelTypeFilter !== "all" && dest.travelType !== travelTypeFilter) return false;
      if (durationFilter !== "all" && dest.duration !== durationFilter) return false;
      return true;
    });
  }, [budgetFilter, travelTypeFilter, durationFilter]);

  const resetFilters = () => {
    setBudgetFilter("all");
    setTravelTypeFilter("all");
    setDurationFilter("all");
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Explore Our Destinations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          From relaxing beach getaways to thrilling mountain adventures, your
          next story is waiting to be written.
        </p>
      </div>

      <div className="sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 py-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Select
            value={budgetFilter}
            onValueChange={(v) => setBudgetFilter(v as Budget | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              {budgetOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={travelTypeFilter}
            onValueChange={(v) => setTravelTypeFilter(v as TravelType | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Travel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Travel Types</SelectItem>
              {travelTypeOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={durationFilter}
            onValueChange={(v) => setDurationFilter(v as Duration | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              {durationOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
        </div>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold">No Destinations Found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters to find more adventures!
          </p>
        </div>
      )}
    </div>
  );
}
