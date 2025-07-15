import { useQuery } from "@tanstack/react-query";
import { JudgeCard } from "./judge-card";
import { Judge } from "@shared/schema";

export function FeaturedJudges() {
  const { data: featuredJudges, isLoading, error } = useQuery({
    queryKey: ['/api/judges/featured'],
    queryFn: async () => {
      const response = await fetch('/api/judges/featured');
      if (!response.ok) {
        throw new Error('Failed to fetch featured judges');
      }
      return response.json() as Promise<Judge[]>;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Featured Judges
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Featured Judges
          </h2>
          <div className="text-center text-gray-600">
            Failed to load featured judges. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Featured Judges
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredJudges?.map((judge) => (
            <JudgeCard key={judge.id} judge={judge} />
          ))}
        </div>
      </div>
    </section>
  );
}