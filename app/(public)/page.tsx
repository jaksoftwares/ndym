// Home page
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Users, Calendar, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full -mr-16 blur-3xl opacity-50" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Raising a <span className="text-primary italic">Godly</span> Generation for Today and Tomorrow
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              NDYM is the vibrant youth ministry of the Anglican Church of Kenya, Nairobi Diocese. 
              We empower young people to grow in faith, lead with integrity, and serve with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8 h-14 text-base font-bold shadow-lg shadow-primary/20 gap-2">
                  Get Started Now <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="px-8 h-14 text-base font-bold border-2">
                  Learn Our Vision
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Our Core Pillars</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-muted-foreground">Find a place to belong through our diverse youth groups and fellowships across the diocese.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Faith & Mentorship</h3>
              <p className="text-muted-foreground">Grow deeper in your relationship with Christ through guided Bible studies and godly mentorship.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent-foreground mb-6">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Vibrant Events</h3>
              <p className="text-muted-foreground">Join thousands of other youth in camps, conferences, and sports activities year-round.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to join the movement?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Become a part of the Nairobi Diocese Youth Ministry today and start your journey of faith and impact.
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg" className="px-10 h-14 text-base font-bold bg-white text-primary hover:bg-slate-100 border-none">
              Register Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
