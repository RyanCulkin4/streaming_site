"use client";

import { use } from "react";
import {
  Newspaper,
  CalendarDays,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { MaintenanceType, SiteNewsType } from "@shared-types/*";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SiteNewsContentProps {
  showsPromise: Promise<SiteNewsType[] | null>;
  maintenancePromise: Promise<MaintenanceType[] | null>;
}

export default function SiteNewsContent({
  showsPromise,
  maintenancePromise,
}: SiteNewsContentProps) {
  // Suspends until the promise resolves, thanks to <Suspense> higher up
  const site_news = use(showsPromise);
  const maintenance = use(maintenancePromise);

  if (!site_news || !maintenance) {
    return <p className="p-4 text-red-400">Error loading site data.</p>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto mt-24">
        <div className="flex items-center justify-center mb-10">
          <Newspaper className="h-8 w-8 text-pink-500 mr-3" />
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Site News & Updates
          </h2>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {site_news.map((item) => (
              <Card
                key={item.id}
                className="bg-indigo-950/50 border-purple-800 text-white hover:border-pink-500 transition-colors"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <Badge
                      className={`
                    ${item.type === "announcement" ? "bg-blue-600" : ""}
                    ${item.type === "maintenance" ? "bg-amber-600" : ""}
                    ${item.type === "feature" ? "bg-green-600" : ""}
                    ${item.type === "event" ? "bg-purple-600" : ""}
                  `}
                    >
                      {item.type}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" /> {item.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <a
                    href={item.link}
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Read more →
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 mb-12">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-xl font-bold text-white">
                Upcoming Maintenance
              </h3>
            </div>

            <div className="bg-indigo-950/50 border border-purple-800 rounded-lg p-4">
              <div className="space-y-4">
                {maintenance.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-3 border-b border-purple-800 last:border-0"
                  >
                    <div className="flex items-center mb-2 md:mb-0">
                      <Clock className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-white font-medium">
                        {item.date}
                      </span>
                    </div>
                    <div className="text-gray-300">{item.time}</div>
                    <div className="text-gray-300 mt-2 md:mt-0">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
