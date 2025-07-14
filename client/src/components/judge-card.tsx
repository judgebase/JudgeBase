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
  const badgeColors = {
    "judge of the month": "bg-purple-100 text-purple-800",
    "participant favorite": "bg-blue-100 text-blue-800",
    "rising judge": "bg-green-100 text-green-800",
    "founder's pick": "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg card-hover animate-float">
      <CardContent className="p-8">
        <div className="text-center">
          <Avatar className="w-20 h-20 mx-auto mb-6 animate-bounce-soft">
            <AvatarImage
              src={judge.avatar || undefined}
              alt={`${judge.name} profile picture`}
            />
            <AvatarFallback className="text-2xl font-semibold gradient-bg-cool text-white">
              {judge.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {judge.name}
          </h3>
          
          {judge.badges && judge.badges.length > 0 && (
            <div className="mb-2">
              {judge.badges.map((badge) => (
                <Badge
                  key={badge}
                  className={badgeColors[badge as keyof typeof badgeColors] || "bg-gray-100 text-gray-800"}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-gray-600 mb-4">{judge.title}</p>
          
          {judge.bio && (
            <p className="text-gray-600 mb-4 line-clamp-2">{judge.bio}</p>
          )}
          
          {judge.judgingPhilosophy && (
            <p className="text-sm text-gray-500 mb-6 line-clamp-3">
              Judging Philosophy: {judge.judgingPhilosophy}
            </p>
          )}
          
          <div className="flex justify-center space-x-4">
            {judge.linkedin && (
              <a
                href={judge.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-gray-600" />
              </a>
            )}
            {judge.twitter && (
              <a
                href={judge.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <TwitterIcon className="w-4 h-4 text-gray-600" />
              </a>
            )}
            {judge.website && (
              <a
                href={judge.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
