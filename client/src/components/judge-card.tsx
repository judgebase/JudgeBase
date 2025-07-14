import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LinkedinIcon, TwitterIcon, Globe } from "lucide-react";
import type { Judge } from "@shared/schema";

interface JudgeCardProps {
  judge: Judge;
}

export function JudgeCard({ judge }: JudgeCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
      <div className="p-6">
        <div className="flex items-start mb-4">
          <Avatar className="h-16 w-16 mr-4 ring-2 ring-purple-100">
            <AvatarImage src={judge.avatar_url || undefined} alt={judge.name} />
            <AvatarFallback className="gradient-bg text-white text-lg font-bold">
              {judge.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate">{judge.name}</h3>
            <p className="text-gray-600 font-medium truncate">{judge.title}</p>
            <p className="text-sm text-gray-500 truncate">{judge.company}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{judge.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {judge.expertise.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors border border-purple-200">
              {skill}
            </Badge>
          ))}
          {judge.expertise.length > 3 && (
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 border border-gray-200">
              +{judge.expertise.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            <span className="truncate">{judge.location}</span>
          </div>
          <Link href={`/judges/${judge.slug}`}>
            <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:border-purple-700 transition-all duration-200">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}