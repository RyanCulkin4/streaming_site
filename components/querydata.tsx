import { Anime, User, Manga, Movies, Videos, Store, Books, Announcements, SubscriptionTiers, Polls, UpcomingReleases, CommunityHighlights, Episodes, Reviews, SiteData } from '@/app/api/types/types';

type QueryTypes =
    Anime |
    User |
    Manga |
    Movies |
    Videos |
    Store |
    Books |
    Announcements |
    SubscriptionTiers |
    Polls |
    UpcomingReleases |
    CommunityHighlights |
    Episodes |
    Reviews |
    SiteData;

export default async function queryData<T extends QueryTypes>(
    token: string,
    toQuery: string,
    condition: string, // Should be 'in' or 'ex'
    condition2: string[], // Should be things you want or dont want depending on condition
    returns: number = 1 // Default value is 1
): Promise<T> {

    if (condition === 'ex') {

        // Construct the query URL
        const excludeQuery = condition2.join(','); // Convert the exclude array to a comma-separated string
        const queryUrl = `http://localhost:3001/query/${toQuery}/e/${excludeQuery}/${returns}`;

        // Fetch the data from the server
        const query_response = await fetch(queryUrl, {
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            }
        });

        // Check if the response is ok
        if (!query_response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await query_response.json();
        return data; // return data as T;

    } if (condition === 'in') {

        // Construct the query URL
        const includeQuery = condition2.join(','); // Convert the exclude array to a comma-separated string
        const queryUrl = `http://localhost:3001/query/${toQuery}/i/${includeQuery}/${returns}`;

        // Fetch the data from the server
        const query_response = await fetch(queryUrl, {
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            }
        });

        // Check if the response is ok
        if (!query_response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await query_response.json();
        return data; // return data as T;
    }
}




/* 

// Example Call

useEffect(() => {
        const fetchSiteData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const result = await queryData<SiteData>(token, 'website_variables', 'in', ['nav_items', 'important_info'], 1);
                // Check if the result is of type SiteData before setting the state
                setSiteData(result); // Now you can safely set the SiteData

            } catch (error) {
                console.error('Failed to fetch site data:', error);
            }
        };

        fetchSiteData();
    }, []);

// Example Var Set
    const [siteData, setSiteData] = useState<SiteData>();
    setSiteData(result)

// Example Code Array Call

    {Array.isArray(siteData) && Array.isArray(siteData[0].nav_items) && siteData[0].nav_items.map((item: string) => (
        <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
        >
            {item}
        </Link>
    ))}


*/