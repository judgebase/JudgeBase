import { useQuery } from "@tanstack/react-query";
import { JudgeCard } from "./judge-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Judge } from "@shared/schema";

export function FeaturedJudges() {
  const { data: judges, isLoading, error } = useQuery<Judge[]>({
    queryKey: ["/api/judges/featured"],
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
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex justify-center space-x-4">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
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
            Unable to load featured judges. Please try again later.
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
        
        {judges && judges.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {judges.map((judge) => (
              <JudgeCard key={judge.id} judge={judge} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No featured judges available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
