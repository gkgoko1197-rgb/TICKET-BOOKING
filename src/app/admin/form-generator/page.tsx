"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot, Code, Copy, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateForm } from "@/lib/actions";

const formSchema = z.object({
  designRequirements: z.string().min(20, {
    message: "Please provide a more detailed description of the form.",
  }),
});

export default function FormGeneratorPage() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designRequirements: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedCode(null);
    const result = await generateForm(values);
    if (result.success && result.data) {
      setGeneratedCode(result.data);
      toast({
        title: "Code Generated!",
        description: "Your booking form code is ready.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to generate form code.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      toast({ title: "Copied to clipboard!" });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Bot /> AI Booking Form Generator
          </CardTitle>
          <CardDescription>
            Describe your ideal booking form, and our AI will generate the Next.js component code for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="designRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Design Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'A simple booking form with fields for full name, email, number of guests (a stepper), and a date range picker. Style it with a blue primary button and rounded input fields.'"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Code
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-headline">
            <div className="flex items-center gap-2">
                <Code /> Generated Code
            </div>
            {generatedCode && (
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Copy and paste this code into your Next.js project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Generating your form...</p>
            </div>
          )}
          {generatedCode && (
            <div className="bg-muted rounded-md p-4 max-h-[500px] overflow-auto">
              <pre>
                <code className="text-sm font-code">{generatedCode}</code>
              </pre>
            </div>
          )}
          {!isLoading && !generatedCode && (
             <div className="flex items-center justify-center h-full min-h-[300px] text-muted-foreground">
                <p>Your generated code will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
