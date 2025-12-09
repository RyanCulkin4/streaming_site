"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContentRowType } from "@shared-types/*"

interface ContentRowProps {
	content: ContentRowType
}

export default function ContentRow({ content }: ContentRowProps) {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [hoveredId, setHoveredId] = useState<string | null>(null)

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = 400
			scrollRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			})
		}
	}

	return (
		<div className="mb-12 px-6 md:px-12 lg:px-16">
			<h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{content.displayTitle}</h2>

			<div className="relative group">
				<Button
					variant="ghost"
					size="icon"
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 hover:bg-background backdrop-blur-sm border border-border h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
					onClick={() => scroll("left")}
				>
					<ChevronLeft className="h-6 w-6" />
				</Button>

				<div
					ref={scrollRef}
					className="flex gap-4 scrollbar-hide scroll-smooth py-16 px-8"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					{content.items.map((item, index) => {
						const isHovered = hoveredId === item.id
						const hoveredIndex = content.items.findIndex((i) => i.id === hoveredId)
						const currentIndex = index

						let translateX = 0
						if (hoveredId && !isHovered) {
							const distance = Math.abs(currentIndex - hoveredIndex)
							if (distance === 1) {
								// Immediate neighbors move more
								translateX = currentIndex < hoveredIndex ? -30 : 30
							} else if (distance === 2) {
								// Second neighbors move less
								translateX = currentIndex < hoveredIndex ? -20 : 20
							} else if (distance === 3) {
								// Third neighbors move slightly
								translateX = currentIndex < hoveredIndex ? -15 : 15
							} else if (distance === 4) {
								// Third neighbors move slightly
								translateX = currentIndex < hoveredIndex ? -10 : 10
							}
						}

						return (
							<Card
								key={item.id}
								className="flex-shrink-0 w-64 bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer relative"
								style={{
									transform: isHovered ? "scale(1.18) translateY(-6px)" : `translateX(${translateX}px)`,
									transition: "all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
									// zIndex: isHovered ? 50 : 1,
									transformOrigin: "center center",
								}}
								onMouseEnter={() => setHoveredId(item.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<CardContent className="p-0">
									<div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
										<img
											src={item.image || "/placeholder.svg"}
											alt={item.title}
											className="w-full h-full object-cover"
											style={{
												transform: isHovered ? "scale(1)" : "scale(1)",
												transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
											}}
										/>

										{/* Gradient overlay */}
										<div
											className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
											style={{
												opacity: isHovered ? 1 : 0,
												transition: "opacity 400ms ease-out",
											}}
										/>

										{/* Play button on hover */}
										<div
											className="absolute inset-0 flex items-center justify-center"
											style={{
												opacity: isHovered ? 1 : 0,
												transform: isHovered ? "scale(1)" : "scale(0.8)",
												transition: "all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
											}}
										>
											<div className="bg-primary hover:bg-primary/90 rounded-full p-4 shadow-2xl shadow-primary/50">
												<Play className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
											</div>
										</div>

										{/* Rating badge */}
										{item.rating && (
											<div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-border">
												<Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
												<span className="text-sm font-semibold text-foreground">{item.rating.toFixed(1)}</span>
											</div>
										)}

										{/* Status badge */}
										{item.status === "ongoing" && (
											<div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
												<span className="text-xs font-bold text-primary-foreground uppercase tracking-wide">
													Ongoing
												</span>
											</div>
										)}

										{/* Next episode info */}
										{item.nextEpisode && (
											<div
												className="absolute bottom-3 left-3 right-3 bg-secondary/90 backdrop-blur-sm px-3 py-2 rounded-lg"
												style={{
													opacity: isHovered ? 1 : 0,
													transform: isHovered ? "translateY(0)" : "translateY(10px)",
													transition: "all 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms",
												}}
											>
												<div className="flex items-center gap-2 text-secondary-foreground">
													<span className="text-sm">📺</span>
													<span className="text-xs font-semibold">{item.nextEpisode}</span>
												</div>
											</div>
										)}
									</div>

									{/* Card info section */}
									<div
										className="p-4 space-y-3"
										style={{
											opacity: isHovered ? 1 : 0.9,
											transition: "opacity 300ms ease-out",
										}}
									>
										<h4 className="text-base font-bold text-foreground line-clamp-2 leading-tight">{item.title}</h4>

										{/* Studio and year */}
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											{item.studio && (
												<>
													<span className="font-medium text-foreground/90">{item.studio}</span>
													{item.year && <span>•</span>}
												</>
											)}
											{item.year && <span>{item.year}</span>}
										</div>

										{item.releaseDate && (
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<span>🎬</span>
												<span>{item.releaseDate}</span>
											</div>
										)}

										{/* Episodes count */}
										{item.episodes && <div className="text-sm text-muted-foreground">{item.episodes} Episodes</div>}

										{/* Genres */}
										{item.genres && item.genres.length > 0 && (
											<div className="flex flex-wrap gap-1.5">
												{item.genres.slice(0, 3).map((genre, idx) => (
													<span
														key={idx}
														className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium"
													>
														{genre}
													</span>
												))}
											</div>
										)}
									</div>
								</CardContent>

								<div
									className="absolute inset-0 rounded-lg pointer-events-none"
									style={{
										boxShadow: isHovered
											? "0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(236, 72, 153, 0.15)"
											: "none",
										transition: "box-shadow 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
									}}
								/>
							</Card>
						)
					})}
				</div>

				<Button
					variant="ghost"
					size="icon"
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 hover:bg-background backdrop-blur-sm border border-border h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
					onClick={() => scroll("right")}
				>
					<ChevronRight className="h-6 w-6" />
				</Button>
			</div>
		</div>
	)
}
