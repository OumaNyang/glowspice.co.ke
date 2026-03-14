import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div>
            <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-6">Get in Touch</h1>
            <p className="text-[var(--gray-500)] mb-8 max-w-md">
              Have a question about our spices, your order, or just want to say hello? 
              Fill out the form or reach us through our contact details below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[var(--border)]">
                <div className="w-12 h-12 bg-[var(--spice)]/10 text-[var(--spice)] rounded-xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--bark)] text-sm">Email Us</h3>
                  <p className="text-sm text-[var(--gray-500)]">hello@glowspice.co.ke</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[var(--border)]">
                <div className="w-12 h-12 bg-[var(--spice)]/10 text-[var(--spice)] rounded-xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--bark)] text-sm">Call Us</h3>
                  <p className="text-sm text-[var(--gray-500)]">+254 700 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[var(--border)]">
                <div className="w-12 h-12 bg-[var(--spice)]/10 text-[var(--spice)] rounded-xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--bark)] text-sm">Visit Us</h3>
                  <p className="text-sm text-[var(--gray-500)]">Westlands, Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--border)]">
            <h3 className="font-display font-bold text-xl text-[var(--bark)] mb-6">Send a Message</h3>
            <div className="space-y-4">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="your@email.com" />
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[var(--bark)]">Message</label>
                <textarea 
                  className="w-full bg-white border border-[var(--border)] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[var(--spice)] min-h-[120px] resize-y" 
                  placeholder="How can we help?"
                />
              </div>
              <Button fullWidth className="mt-2">Send Message</Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
