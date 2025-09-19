import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">COVID-19 FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-2">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-2">Terms & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-2">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">List your property</Link></li>
              <li><Link href="#" className="hover:text-primary">Affiliate Program</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} StayFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
