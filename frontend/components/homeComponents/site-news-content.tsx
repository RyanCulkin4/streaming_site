"use client"

import { use } from "react"
import { Newspaper, CalendarDays, Clock, AlertTriangle, Sparkles, Wrench, Zap } from "lucide-react"
import type { MaintenanceType, SiteNewsType } from "../../../shared/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SiteNewsContentProps {
  showsPromise: Promise<SiteNewsType[] | null>
  maintenancePromise: Promise<MaintenanceType[] | null>
}

export default function SiteNewsContent({ showsPromise, maintenancePromise }: SiteNewsContentProps) {
  const site_news = use(showsPromise)
  const maintenance = use(maintenancePromise)

  if (!site_news || !maintenance) {
    return <p className="p-4 text-red-400">Error loading site data.</p>
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "announcement":
        return {
          icon: Sparkles,
          gradient: "from-cyan-500 to-blue-500",
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/30",
        }
      case "maintenance":
        return {
          icon: Wrench,
          gradient: "from-amber-500 to-orange-500",
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
        }
      case "feature":
        return {
          icon: Zap,
          gradient: "from-emerald-500 to-green-500",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
        }
      case "event":
        return {
          icon: Sparkles,
          gradient: "from-purple-500 to-pink-500",
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
        }
      default:
        return {
          icon: Newspaper,
          gradient: "from-gray-500 to-slate-500",
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
        }
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-30" />
          <div className="relative flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-purple-400" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Site News & Updates
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {site_news.map((item) => {
            const config = getTypeConfig(item.type)
            const Icon = config.icon

            return (
              <Card
                key={item.id}
                className="group relative bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-pink-950/40 border border-purple-500/20 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                <CardHeader className="relative">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${config.bg} border ${config.border}`}>
                        <Icon
                          className={`h-5 w-5 bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}
                          style={{ WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors leading-tight">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 flex items-center gap-1.5 mt-2">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span className="text-sm">{item.date}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={`${config.bg} ${config.border} border text-xs font-semibold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent capitalize`}
                      style={{ WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                      {item.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </CardContent>

                <CardFooter className="relative">
                  <a
                    href={item.link}
                    className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-all duration-200 flex items-center gap-1 group/link"
                  >
                    Read more
                    <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl blur-xl" />

          <div className="relative bg-gradient-to-br from-purple-950/60 via-purple-900/30 to-amber-950/40 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Upcoming Maintenance
              </h3>
            </div>

            <div className="space-y-3">
              {maintenance.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-purple-950/40 border border-purple-500/10 hover:border-amber-500/30 hover:bg-purple-950/60 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <Clock className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-gray-100 font-semibold">{item.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 md:min-w-[120px]">
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>

                  <div className="text-gray-400 md:flex-1 md:text-right">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
