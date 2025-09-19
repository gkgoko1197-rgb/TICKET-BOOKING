import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-12 text-center max-w-2xl">
        <h2 className="text-3xl font-headline font-bold mb-2">Save time, save money!</h2>
        <p className="mb-6">Sign up and we'll send the best deals to you</p>
        <form className="flex max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="rounded-r-none h-12 bg-white text-foreground focus:ring-0"
          />
          <Button type="submit" className="rounded-l-none h-12 bg-accent hover:bg-accent/90 text-accent-foreground px-6">
            Subscribe
          </Button>
        </form>
      </div>
    </footer>
  );
}
