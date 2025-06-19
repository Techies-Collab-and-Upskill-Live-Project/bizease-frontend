'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import emailjs from 'emailjs-com';

const contactFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  message: z.string().min(5, 'Message is required'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await emailjs.send(
        'service_goa35yn',
        'template_jexs67e',
        {
          email: data.email,
          message: data.message,
        },
        '5D6oo0cwN8cmpmcqm',
      );

      toast.success(' Message sent successfully!');
      reset();
    } catch (error) {
      toast.error(` Failed to send message. Try again later, ${error}`);
    }
  };

  return (
    <section className="w-full min-h-screen">
      {/* Top bar with back button */}
      <div className="flex justify-start bg-darkblue py-4 px-6">
        <Link
          href="/"
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
        >
          <ChevronLeft className="h-5 w-5 text-surface-100" />
        </Link>
      </div>

      {/* Contact Form Section */}
      <div className="flex items-center justify-center px-4 py-8 bg-surface-100 min-h-[calc(100vh-64px)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 p-6 rounded-xl shadow-xl bg-white"
        >
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
            Contact Us
          </h1>

          {/* Email Field */}
          <div className="space-y-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="username@gmail.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Type your message here"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn(
              'w-full bg-blue-900 text-white hover:bg-blue-800 transition',
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  );
}
