"use client";
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { programs, campuses } from '@/lib/data';
import type { Program } from '@/lib/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Clock, MapPin, School } from 'lucide-react';

const programDomains = [...new Set(programs.map(p => p.domain))];
const programLevels = [...new Set(programs.map(p => p.level))];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domain: 'all',
    level: 'all',
    campus: 'all',
  });

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const searchMatch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchTerm.toLowerCase());
      const domainMatch = filters.domain === 'all' || program.domain === filters.domain;
      const levelMatch = filters.level === 'all' || program.level === filters.level;
      const campusMatch = filters.campus === 'all' || program.campuses.includes(filters.campus);
      return searchMatch && domainMatch && levelMatch && campusMatch;
    });
  }, [searchTerm, filters]);
  
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Explore Programs</h1>
        <p className="text-lg text-muted-foreground mt-2">Find your path in the digital world.</p>
      </header>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:col-span-4"
            />
            <Select value={filters.domain} onValueChange={(value) => setFilters(f => ({ ...f, domain: value }))}>
              <SelectTrigger><SelectValue placeholder="Filter by domain" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {programDomains.map(domain => <SelectItem key={domain} value={domain}>{domain}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filters.level} onValueChange={(value) => setFilters(f => ({ ...f, level: value }))}>
              <SelectTrigger><SelectValue placeholder="Filter by level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {programLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filters.campus} onValueChange={(value) => setFilters(f => ({ ...f, campus: value }))}>
              <SelectTrigger><SelectValue placeholder="Filter by campus" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campuses</SelectItem>
                {campuses.map(campus => <SelectItem key={campus.id} value={campus.id}>{campus.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map(program => {
            const image = getImage(program.imageId);
            return (
          <Link href={`/programs/${program.id}`} key={program.id} className="group">
            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  {image && (
                     <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover rounded-t-lg"
                     />
                  )}
                </div>
                <div className="p-6 pb-2">
                    <Badge variant="secondary" className="mb-2">{program.domain}</Badge>
                    <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">{program.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription className="mb-4">{program.description.substring(0, 100)}...</CardDescription>
                <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2"><School className="w-4 h-4 text-primary" /><span>{program.level}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /><span>{program.durationMonths} months</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{program.campuses.length} Campuses</span></div>
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex justify-end">
                <div className="flex items-center text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          </Link>
        )})}
      </div>
      {filteredPrograms.length === 0 && (
        <div className="text-center py-16">
            <h3 className="text-2xl font-headline">No programs found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
