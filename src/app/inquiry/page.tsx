"use client";
import { FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const InquiryPage = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/5 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-4 relative z-10"
      >
        <Card className="glass-card border-border/50 rounded-3xl overflow-hidden shadow-2xl">
          <CardHeader className="bg-primary/5 border-b border-border/50 p-8">
            <CardTitle className="text-3xl font-black text-foreground tracking-tight">
              Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Inquiry</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base mt-2">
              Let us know what you&apos;re looking for, and we&apos;ll get back to you with a custom proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Full Name
                </label>
                <Input type="text" className="h-12 bg-background/50 border-border/50 focus:ring-primary rounded-xl" placeholder="John Doe" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </label>
                  <Input type="email" className="h-12 bg-background/50 border-border/50 focus:ring-primary rounded-xl" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </label>
                  <Input type="tel" className="h-12 bg-background/50 border-border/50 focus:ring-primary rounded-xl" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Project Details
                </label>
                <Textarea
                  className="bg-background/50 border-border/50 focus:ring-primary rounded-xl resize-none"
                  rows={4}
                  placeholder="Tell us about your advertising goals..."
                />
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" type="button" className="h-12 px-6 rounded-xl border-border/50 hover:bg-secondary/10">
                  Cancel
                </Button>
                <Button className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  <FiSend className="mr-2" />
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default InquiryPage;
