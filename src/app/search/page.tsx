import { accommodations } from "@/lib/data";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  // In a real app, you would fetch data from your database.
  // For this static demo, we'll pass all accommodations to the client for filtering.
  const allAccommodations = accommodations;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchResults 
        accommodations={allAccommodations}
      />
    </div>
  );
}
