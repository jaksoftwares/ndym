import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-12 px-4 md:px-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo width={160} height={50} className="mb-4" />
            <p className="text-muted-foreground text-sm max-w-sm">
              Supporting the Anglican Church of Kenya, Nairobi Diocese Youth Ministry (NDYM)
              in raising a godly generation through faith, community, and service.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {currentYear} Nairobi Diocese Youth Ministry. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium">Anglican Church of Kenya</p>
        </div>
      </div>
    </footer>
  );
}
