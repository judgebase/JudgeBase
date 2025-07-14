import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Linkedin, Twitter, Globe } from "lucide-react";
import type { Judge } from "@shared/schema";

interface JudgeCardProps {
  judge: Judge;
}

export function JudgeCard({ judge }: JudgeCardProps) {
  const badgeColors = {
    "top judge": "bg-purple-100 text-purple-800",
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
              {judge.name ? judge.name.split(" ").map(n => n[0]).join("") : "JB"}
            </AvatarFallback>
          </Avatar>
          
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{judge.name || 'Anonymous Judge'}</h3>
            <p className="text-lg text-gray-600 font-medium">{judge.title || 'Judge'}</p>
            <p className="text-gray-500">{judge.company || 'Independent'}</p>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{judge.bio || 'No bio available.'}</p>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {(() => {
              // Handle different expertise formats safely
              let expertiseArray: string[] = [];
              
              if (judge.expertise) {
                if (Array.isArray(judge.expertise)) {
                  expertiseArray = judge.expertise.filter(skill => skill && typeof skill === 'string');
                } else if (typeof judge.expertise === 'string') {
                  expertiseArray = judge.expertise.split(',').map(s => s.trim()).filter(s => s.length > 0);
                }
              }
              
              if (expertiseArray.length > 0) {
                return (
                  <>
                    {expertiseArray.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {expertiseArray.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-50 text-gray-600">
                        +{expertiseArray.length - 3} more
                      </Badge>
                    )}
                  </>
                );
              } else {
                return (
                  <Badge variant="secondary" className="bg-gray-50 text-gray-600">
                    General
                  </Badge>
                );
              }
            })()}
          </div>

          {judge.badges && Array.isArray(judge.badges) && judge.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {judge.badges.map((badge, index) => (
                <Badge
                  key={index}
                  className={badgeColors[badge as keyof typeof badgeColors] || "bg-blue-100 text-blue-800"}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{judge.location || 'Remote'}</span>
          </div>

          <Link href={`/judges/${judge.slug}`}>
            <Button className="gradient-bg-cool text-white hover:shadow-lg transition-all duration-200">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}