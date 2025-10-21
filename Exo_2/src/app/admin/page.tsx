"use client";

import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { delay } from '@/lib/utils';


async function uploadDocument(prevState: any, formData: FormData) {
    const file = formData.get('document') as File;
    if (!file || file.size === 0) {
        return { success: false, message: 'Please select a file to upload.' };
    }

    // Simulate upload and processing delay
    await delay(1500);

    console.log('Uploading file:', file.name);
    // In a real application, you would upload the file to Cloud Storage
    // and then trigger a Cloud Function to process it.

    // Simulate success
    return { success: true, message: `Successfully ingested '${file.name}'. Re-indexing is in progress.` };
}

export default function AdminPage() {
    const { toast } = useToast();
    const [state, formAction] = useFormState(uploadDocument, { success: false, message: '' });

    useEffect(() => {
        if(state.message){
            toast({
                title: state.success ? 'Success' : 'Error',
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
            });
        }
    }, [state, toast]);

    return (
        <div className="max-w-2xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Admin Panel</h1>
                <p className="text-lg text-muted-foreground mt-2">Manage Knowledge Base</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ingest Documents</CardTitle>
                    <CardDescription>
                        Upload CSV, JSON, or PDF files to update the chatbot's knowledge base.
                        The system will automatically process the file and re-index the content.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="document">Document File</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">CSV, JSON, or PDF</p>
                                    </div>
                                    <Input id="dropzone-file" name="document" type="file" className="hidden" accept=".csv,.json,.pdf" />
                                </label>
                            </div> 
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                            Upload and Re-index
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
