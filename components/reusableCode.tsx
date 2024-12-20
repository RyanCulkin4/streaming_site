import { Anime, User, Manga, Movies, Videos, Store, Books, Announcements, SubscriptionTiers, Polls, UpcomingReleases, CommunityHighlights, Episodes, Reviews, SiteData, Rating, UserActivity } from '@/app/api/types/types';
import { useEffect } from 'react';
import React from 'react';
import axios from "axios";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { useRouter } from 'next/navigation'

export const websiteInitialLoad = (children: Function[], GivenVariable: any) => {
    useEffect(() => {
        children.forEach(child => child()); // Execute each function on initial load
    }, [GivenVariable]);
};

/* ---- Code For Implementing InitialLoad

  websiteInitialLoad([
    () => loadData([
      () => loadAnime(animeid).then(data => {
        if (data) {
          setAnimeData(data[0])
        }
      }),
      
      // Repeat As Nessesary

    ])
  ], [animeid, episode_number]); // Elements To Update On

*/

// ---------------------- Load Data Functions ----------------------
/*
        ** Implementation **

        loadData([ // Call Load Data To Prevent Waterfalling
            () => loadBookmarked(animeid, userid, animetype).then((bookmarked: Boolean) => setIsBookmarked(bookmarked))
            // Place other loadFunctions here
        ])

*/
export const loadData = async (children: Function[]) => {
    try {
        const results = await Promise.all(children.map(child => child()));
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};

export const loadAnime = async (animeid: number): Promise<Anime | undefined> => {
    if (!animeid) return; // Ensure id is defined
    try {
        const response = await fetch(`http://localhost:3001/anime/${animeid}`);
        const data: Anime = await response.json(); // Expect an array
        return data; // Return the first item in the array
    } catch (error) {
        console.error('Failed to fetch anime data:', error);
        return;
    }
};

export const loadAnimeFromEpisodeid = async (episodeid: number): Promise<Anime | undefined> => {
    if (!episodeid) return; // No anime ID to fetch episodes for
    try {
        const response = await fetch(`http://localhost:3001/episode2/${episodeid}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON once
        return data as Anime; // Return the data with type assertion
    } catch (error) {
        console.error('Failed to fetch Anime data:', error);
        return;
    }
};


export const loadEpisodes = async (animeId: number): Promise<Episodes[] | undefined> => {
    if (!animeId) return; // No anime ID to fetch episodes for
    try {
        const response = await fetch(`http://localhost:3001/anime/${animeId}/episodes`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch episode data:', error);
        return;
    }
};

export const loadEpisode = async (episodeid: number): Promise<Episodes | undefined> => {
    if (!episodeid) return; // No anime ID to fetch episodes for
    try {
        const response = await fetch(`http://localhost:3001/anime/e/${episodeid}`);
        if (!response.ok) throw console.error('Network response was not ok');

        const data = await response.json(); // Parse the response as JSON
        return data[0]; // Return the parsed array of episode objects
    } catch (error) {
        console.error('Failed to fetch episode data:', error);
        return;
    }
};

export const loadReviews = async (animeId: number): Promise<Reviews[] | undefined> => {
    if (!animeId) return []; // No anime ID to fetch reviews for
    const data = undefined
    try {

        const response = await fetch(`http://localhost:3001/anime/${animeId}/reviews`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json(); // Parse the response as JSON

        return data; // Return the parsed array of episode objects
    } catch (error) {
        console.error('Failed to fetch episode data:', error);
        return [];
    }
};

export const loadActivity = async (
    userid: number,
    mediatype: string,
    contentid: number
): Promise<Episodes | undefined> => {
    try {
        const response = await fetch(`http://localhost:3001/user/activity/${userid}/${contentid}/${mediatype}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data: UserActivity = await response.json();
        const animeReturn = await loadEpisode(data.child_content);
        return animeReturn;
    } catch (error) {
        console.error('Error in loadActivity:', error);
        return undefined; // Explicitly returning undefined on error
    }
};

export const loadBookmarked = async (animeid: Number, userid: Number | undefined, mediatype: String): Promise<Boolean> => {
    if (!animeid || !userid || !mediatype) return false;
    try {
        const response = await fetch(`http://localhost:3001/bookmarks/${userid}/${animeid}/${mediatype}`);
        if (!response.ok) return false;
        const data = await response.json();
        const result = !!data; // Convert data to a boolean (true/false)
        return result;

    } catch (error) {
        console.log('Failed to fetch rating data:', error);
        return false;
    }
};

export const loadRating = async (animeId: number, userid: number | undefined) => {
    if (!animeId || !userid) return; // Change to !userid to ensure it's defined
    try {
        const response = await fetch(`http://localhost:3001/anime/${animeId}/rating/${userid}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json(); // Get the JSON data
        return data[0].rating; // Assuming the response structure includes { rating: value }
    } catch (error) {
        console.log('Failed to fetch rating data:', error);
        return; // Optionally return null or a specific value to indicate failure
    }
};

export const postUserActivity = async (
    userid: number | undefined,
    episodeid: number,
    animeId: number,
    currentpoint: number
) => {

    // Check if any required value is missing
    console.log('Numbers:', animeId, episodeid, userid, currentpoint)
    if (!animeId || !userid || !episodeid || !currentpoint) return; // Only return if values are missing

    console.log('ran :P');

    try {
        const response = await fetch(`http://localhost:3001/anime/useractivity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid,
                child_content: episodeid,
                parent_content: animeId,
                mediatype: 'anime',
                stopping_point: currentpoint,
            }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Failed to post user activity data:', error);
        return null;
    }
};



// ---------------------- Other Functions ----------------------


export const togglePlay = (videoRef: React.RefObject<HTMLVideoElement>, setIsPlaying: (isPlaying: boolean) => void, isPlaying: boolean) => {
    if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying); // Set the updated state directly
    }
};


export const toggleShow = async (
    next: number,
    oldepisodeid: number,
    router: ReturnType<typeof useRouter>
) => {
    try {
        // Fetch the next or previous episode based on `next` and `episodeid`
        const response = await fetch(`http://localhost:3001/episodes/${oldepisodeid}/${next}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Check if an episode is returned
        const episode = data.episode;
        if (episode) {
            const { seasonid, episode_number, episodeid} = episode;

            // Redirect to the new episode's URL
            router.push(`/anime/player/${episodeid}`);
        } else {
            console.log('No next or previous episode available');
        }
    } catch (error) {
        console.error('Failed to toggle episode:', error);
    }
};


export const commentLikeEvent = () => {
    // Implement review creation logic here
    console.log("Create review clicked")
}

export const toggleBookmark = async (animeid: Number, userid: Number | undefined, mediatype: String) => {
    if (!userid || !animeid) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/bookmarks/${userid}/${animeid}/${mediatype}`, {
            method: 'POST', // Specify the POST method
            headers: {
                'Content-Type': 'application/json', // Set the appropriate headers
            }
        });

        if (!response.ok) {
            // Handle errors if the request fails
            const errorData = await response.json();
            console.log('Error toggling bookmark:', errorData.error);
        } else {
            const responseData = await response.json();
        }
    } catch (error) {
        console.log('Failed to toggle bookmark:', error);
    }
};

export const handleVolumeChange = (event: Event, value: number | number[]) => {
    return (value as number);
};

export const toggleVariable = (variable: boolean) => {
    return (!variable);
};

export const isVarValid = (givenVar: any): React.ReactNode | null => {
    if (!givenVar) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-center text-white">
                    <p className="text-xl">Loading . . .</p>
                </div>
            </div>
        );
    }
}

export const isVarEqual = (givenVar1: any, givenVar2: any) => {

    if (givenVar1 === givenVar2) {
        return (true)
    } else {
        return (false)
    }
}

export const handleCreateReview = () => {
    // Implement review creation logic here
    console.log("Create review clicked")
}

export const handleRating = async (animeid: number, userid: number | undefined, rating: number) => {
    // Handle DB Save to User Here

    if (!userid) {
        return
    }

    const response = await fetch(`http://localhost:3001/anime/${animeid}/rating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userid: userid, // Include the userid
            rating: rating, // The rating value
        }),
    });

    if (!response.ok) {
        // Handle errors if the request fails
        const errorData = await response.json();
        console.error('Error submitting rating:', errorData.error);
    } else {
        const responseData = await response.json();
        console.log('Rating submitted successfully:', responseData.message);
    }
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: '2-digit', //numeric
        month: '2-digit',
        day: '2-digit',
    });
};

export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

export const useKeyPress = (keyButton: string, callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === keyButton.toLowerCase()) {
                event.preventDefault();
                callback(); // Execute the passed function
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [keyButton, callback]);
};

export const isLoggedIn = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return undefined; // Return undefined if no token
    }

    try {
        const response = await axios.get('http://localhost:3001/checkToken', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const { success, userId } = response.data;

        return success ? userId : undefined; // Return userId only if success is true
    } catch (error) {
        console.error('Error checking token:', error);
        return undefined; // Return undefined on error
    }
};

export const getToken = (): string | undefined => {
    const token = localStorage.getItem('token');
    return token || undefined;
}

export const removeToken = () => {
    localStorage.removeItem('token'); // Removes Token For testing
}

export const setwatchedtill = (userid: number, parentID: number, childID: number, time: number, date: string) => {

}