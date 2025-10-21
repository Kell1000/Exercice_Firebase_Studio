import { notFound } from 'next/navigation';
import Image from 'next/image';
import { programs, campuses } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, BookOpen, Calendar, CheckCircle, GraduationCap, Info, MapPin, Target, Ticket, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return programs.map((program) => ({
    id: program.id,
  }));
}

function DetailItem({ icon: Icon, label, children }: { icon: React.ElementType, label: string, children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1 text-primary"><Icon className="w-5 h-5" /></div>
            <div>
                <h3 className="font-semibold text-card-foreground">{label}</h3>
                <div className="text-muted-foreground text-sm">{children}</div>
            </div>
        </div>
    );
}

export default async function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = programs.find(p => p.id === params.id);
  
  if (!program) {
    notFound();
  }

  const programCampuses = campuses.filter(c => program.campuses.includes(c.id));
  const image = PlaceHolderImages.find(img => img.id === program.imageId);

  return (
    <div className="max-w-5xl mx-auto">
        <Button asChild variant="outline" className="mb-6 gap-2">
            <Link href="/programs">
                <ArrowLeft className="w-4 h-4" />
                Back to Programs
            </Link>
        </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <div className="relative h-64 w-full rounded-t-lg overflow-hidden">
                    {image && (
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            data-ai-hint={image.imageHint}
                            fill
                            className="object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                        <Badge variant="secondary" className="mb-2 text-sm">{program.domain}</Badge>
                        <h1 className="text-3xl md:text-4xl font-headline font-bold text-white">{program.title}</h1>
                    </div>
                </div>
                <CardContent className="p-6 space-y-6">
                    <DetailItem icon={Info} label="Description">
                        <p>{program.description}</p>
                    </DetailItem>
                    <DetailItem icon={BookOpen} label="Modules">
                        <ul className="list-disc list-inside space-y-1">
                            {program.modules.map(mod => <li key={mod}>{mod}</li>)}
                        </ul>
                    </DetailItem>
                    <DetailItem icon={Target} label="Learning Outcomes">
                       <ul className="list-disc list-inside space-y-1">
                            {program.outcomes.map(out => <li key={out}>{out}</li>)}
                        </ul>
                    </DetailItem>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
             <Card>
                <CardHeader><CardTitle className="font-headline text-lg">Program Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <DetailItem icon={GraduationCap} label="Level">{program.level}</DetailItem>
                    <DetailItem icon={Calendar} label="Duration">{program.durationMonths} months</DetailItem>
                    <DetailItem icon={CheckCircle} label="Prerequisites">
                        <ul className="list-disc list-inside">
                          {program.prerequisites.map(pr => <li key={pr}>{pr}</li>)}
                        </ul>
                    </DetailItem>
                    <DetailItem icon={Briefcase} label="Certifications">
                        <ul className="list-disc list-inside">
                          {program.certifications.map(cert => <li key={cert}>{cert}</li>)}
                        </ul>
                    </DetailItem>
                    <DetailItem icon={Ticket} label="Admissions">{program.admission}</DetailItem>
                </CardContent>
             </Card>
             <Card>
                <CardHeader><CardTitle className="font-headline text-lg">Available Campuses</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {programCampuses.map(campus => (
                        <div key={campus.id} className="text-sm">
                            <p className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{campus.name}</p>
                            <p className="text-muted-foreground pl-6">{campus.city}</p>
                        </div>
                    ))}
                </CardContent>
             </Card>
             <Button asChild className="w-full" size="lg">
                <a href={program.officialUrl} target="_blank" rel="noopener noreferrer">
                    Visit Official Page
                </a>
             </Button>
        </div>
      </div>
    </div>
  );
}
