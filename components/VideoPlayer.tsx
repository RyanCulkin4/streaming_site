import { Maximize, Minimize, Pause, Play, Settings, SkipBack, SkipForward, Volume2, VolumeX, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Anime, Episodes } from "@/app/api/types/types";
import { formatTime, isLoggedIn, loadAnime, loadData, loadEpisode, postUserActivity, toggleShow, useKeyPress } from "./reusableCode";
import { useRouter } from 'next/navigation';


interface VideoPlayerProps {
    animeData: Anime;
    episodeData: Episodes;
    isControlsVisible: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ animeData, episodeData, isControlsVisible }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [episodesData, setEpisodesData] = useState<Episodes[]>();
    const [specificEpisode, setSpecificEpisode] = useState<Episodes>();
    const [quality, setQuality] = useState('1080p');
    const [audioLanguage, setAudioLanguage] = useState('Japanese');
    const [subtitles, setSubtitles] = useState('English');
    const [percentage, setPercentage] = useState(0);
    const [userid, setUserid] = useState<number | undefined>()
    const [lastActionTime, setLastActionTime] = useState(0);

    const [isClient, setIsClient] = useState(false); // Track if we're on the client
    const router = useRouter();

    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await isLoggedIn();
            setUserid(userId);
        };

        fetchUserId(); // Call the async function
    }, []);

    useEffect(() => {
        setIsClient(true); // Set to true once the component is mounted
    }, []);

    useEffect(() => {
        // Check if the current time is a new 5-second interval
        if (currentTime >= lastActionTime + 10) {
            console.log('10s')
            postUserActivity(userid, episodeData.episodeid, animeData.animeid, Math.round(currentTime));
            setLastActionTime(currentTime); // Update the last action time
        }
    }, [currentTime, lastActionTime]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => {
        };

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
        };
    }, [specificEpisode]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
            videoRef.current.volume = volume / 100;
        }
    }, [isMuted, volume]);

    useEffect(() => {
        loadData([
            () => loadEpisode(episodeData.episodeid).then(data => {
                if (data) {
                    setSpecificEpisode(data)
                }
            }),
        ])
    }, [userid]);


    const togglePlay = () => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.pause() : videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useKeyPress(' ', togglePlay); // Space key to toggle play
    useKeyPress('m', toggleMute); // 'm' key to toggle mute


    const handleVolumeChange = (newVolume: number[]) => {
        const volumeValue = newVolume[0];
        setVolume(volumeValue);
        if (videoRef.current) {
            videoRef.current.volume = volumeValue / 100;
            setIsMuted(volumeValue === 0);
        }
    };

    const toggleFullscreen = () => {
        if (!playerRef.current) return;

        if (!isFullscreen) {
            playerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    if (!specificEpisode) {
        return <div>Loading specificEpisode...</div>;
    }

    const handleSeek = (newTime: number[]) => {
        const timeValue = newTime[0]; // Destructure the first element
        if (videoRef.current) {
            videoRef.current.currentTime = timeValue; // Update video current time
            setCurrentTime(timeValue); // Update the slider position
            console.log('Seeking to:', currentTime);
            setPercentage((currentTime / specificEpisode.duration) * 100)
        }
    };

    const updatetime = (updateAmount: number) => {
        const video = videoRef.current;
        const newTime = Math.max(0, currentTime + updateAmount); // Calculate new time without calling setCurrentTime

        if (video) {
            video.currentTime = newTime; // Set video currentTime directly
            setCurrentTime(newTime); // Update state with new time
            setPercentage((newTime / video.duration) * 100); // Update seek bar percentage
        }
    };

    const next_button = async (next: number) => {
        try {
            const response = await fetch(`http://localhost:3001/episodes/${animeData.animeid}/${episodeData.seasonid}/${episodeData.episodeid}/${next}`);
            console.log(animeData.animeid, episodeData.seasonid, episodeData.episodeid, next, animeData.type);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);

            // Extract new season and episode from the response
            const newSeasonId = data.episode?.seasonid;
            const episodeId = data.episode?.episodeid;
            const newEpisodeNumber = data.episode?.episode_number;

            if (newSeasonId && newEpisodeNumber) {
                // Navigate to the new episode using router.push
                await router.push(`/${animeData?.type}/player/${episodeId}`);
            } else {
                console.log('No next episode available');
            }
        } catch (error) {
            console.error('Failed to toggle episode:', error);
        }
    };


    return (

        <div className="relative w-full h-screen" ref={playerRef}>
            <video
                autoPlay
                ref={videoRef}
                className="w-full h-full object-cover"
                src={`/anime/anime_shows/${animeData.animeid}/${episodeData.seasonid}/${episodeData.episodeid}.mkv`} // Change Latter On
                onClick={togglePlay}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">{formatTime(currentTime)} / {formatTime(specificEpisode.duration)}</div>
                        <div className="flex items-center space-x-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={toggleMute}
                                className="text-white hover:bg-white/20"
                            >
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                            <Slider
                                value={[volume]}
                                onValueChange={handleVolumeChange}
                                max={100}
                                step={1}
                                className="w-24"
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Quality</h4>
                                            <Select value={quality} onValueChange={setQuality}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select quality" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1080p">1080p</SelectItem>
                                                    <SelectItem value="720p">720p</SelectItem>
                                                    <SelectItem value="480p">480p</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Audio</h4>
                                            <Select value={audioLanguage} onValueChange={setAudioLanguage}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select audio language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Japanese">Japanese</SelectItem>
                                                    <SelectItem value="English">English</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Subtitles</h4>
                                            <Select value={subtitles} onValueChange={setSubtitles}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select subtitles" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                                    <SelectItem value="Off">Off</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={toggleFullscreen}
                                className="text-white hover:bg-white/20"
                            >
                                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <Slider
                        value={[currentTime]}
                        max={specificEpisode.duration}
                        step={1}
                        onValueChange={handleSeek}
                        className="relative w-full"
                    >
                        <div
                            className={"absolute h-full bg-primary rounded-full"}
                            style={{ width: `${percentage}%` }}
                        />
                    </Slider>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            // Previous Episode
                            onClick={() =>toggleShow(-1, episodeData.episodeid, router)}
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                        >
                            <SkipBack className="h-6 w-6" />
                        </Button>
                        <Button
                            // Back 5s
                            onClick={() => updatetime(-5)}
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                        >
                            <RotateCcw className="h-6 w-6" />
                        </Button>
                        <Button
                            // Play Button
                            size="icon"
                            variant="ghost"
                            onClick={togglePlay}
                            className="text-white hover:bg-white/20 mx-2"
                        >
                            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                        </Button>
                        <Button
                            // Forward 5s
                            onClick={() => updatetime(5)}
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                        >
                            <RotateCw className="h-6 w-6" />
                        </Button>
                        <Button
                            // Next Episode
                            onClick={() =>toggleShow(1, episodeData.episodeid, router)}
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                        >
                            <SkipForward className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}