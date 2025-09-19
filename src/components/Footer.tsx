import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold font-headline">Save time, save money!</h2>
            <p className="mt-2">Sign up and we'll send the best deals to you</p>
            <div className="mt-4 flex justify-center max-w-md mx-auto">
                <input type="email" placeholder="Your email address" className="px-4 py-2 w-full rounded-l-md text-gray-800" />
                <Button className="rounded-l-none bg-accent hover:bg-accent/90">Subscribe</Button>
            </div>
        </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Countries</Link></li>
              <li><Link href="#" className="hover:underline">Regions</Link></li>
              <li><Link href="#" className="hover:underline">Cities</Link></li>
              <li><Link href="#" className="hover:underline">Districts</Link></li>
              <li><Link href="#" className="hover:underline">Airports</Link></li>
              <li><Link href="#" className="hover:underline">Hotels</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Homes</Link></li>
              <li><Link href="#" className="hover:underline">Apartments</Link></li>
              <li><Link href="#" className="hover:underline">Resorts</Link></li>
              <li><Link href="#" className="hover:underline">Villas</Link></li>
              <li><Link href="#" className="hover:underline">Hostels</Link></li>
              <li><Link href="#" className="hover:underline">Guest houses</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Unique places to stay</Link></li>
              <li><Link href="#" className="hover:underline">Reviews</Link></li>
              <li><Link href="#" className="hover:underline">Unpacked: Travel articles</Link></li>
              <li><Link href="#" className="hover:underline">Travel communities</Link></li>
              <li><Link href="#" className="hover:underline">Seasonal and holiday deals</Link></li>
            </ul>
          </div>
           <div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Car rental</Link></li>
              <li><Link href="#" className="hover:underline">Flight finder</Link></li>
              <li><Link href="#" className="hover:underline">Restaurant reservations</Link></li>
              <li><Link href="#" className="hover:underline">Travel Agents</Link></li>
            </ul>
          </div>
           <div>
            <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Coronavirus (COVID-19) FAQs</Link></li>
                <li><Link href="#" className="hover:underline">About StayFinder.com</Link></li>
                <li><Link href="#" className="hover:underline">Customer Service Help</Link></li>
                <li><Link href="#" className="hover:underline">Partner help</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
                <li><Link href="#" className="hover:underline">Sustainability</Link></li>
                <li><Link href="#" className="hover:underline">Press center</Link></li>
                <li><Link href="#" className="hover:underline">Safety Resource Center</Link></li>
                <li><Link href="#" className="hover:underline">Investor relations</Link></li>
                <li><Link href="#" className="hover:underline">Terms & conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm">
          <p>&copy; {currentYear} StayFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
