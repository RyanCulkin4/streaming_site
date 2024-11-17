import { Icon } from "next/dist/lib/metadata/types/metadata-types"

type Anime = {
        'animeid': number,
        'authorid': number,
        'romaji_title': string,
        'native_title':string,
        'eng_title': string,
        'description': string,
        'trailerid': number,
        'manga_id_reference': number,
        'release_date': string,
        'genre': string[],
        'likes': number,
        'dislikes': number,
        'activity': number,
        'rating': number,
        'total_seasons': number,
        'total_episodes': number,
        'status': string,
        'nextEpisode': string,
        'progress'?: number,
        'author_names': string[],
        'studio': string,
        'type': string,
        'release_year': string,
        'release_season': string,
        'average_rating': number,
        'anime_ratings': number,
};

type User ={
                "userid":           number,
                "username":         string,
                "email":            string,
                "password_hash":    string,
                "date_joined":      string, 
                "num_of_friends":     number,
                "num_of_followers":   number,
                "profile_picture":  string,
                'user_bio':         string,
                'bookmarks':    string[],
                'twoFactor': boolean,
                'email_notifications': boolean,
                'push_notifications': boolean,
                'subscription': string,
                'roles': string[]
};              

type Manga={

        'mangaID':      number,
        'manga_title':  string,
        'authorID':     number,
        'age_ratting':  string,
        'date_released':string,
        'manga_description':  string,
        'num_of_chapters':number,
        'cover_iamge':  string,
        'num_of_likes':   number,
        'num_of_dislikes':number,
        'type':         string, // Should always be 'Manga' in this case
        
        'reviews':{

                'id':           number,
                'content':      string,
                'likes':        number,
                'dislkies':     number,
                'author':       string,
                'date':         string
        }


};

type Movies={

        'movieID':             number,
        'movie_title':          string,
        'movie_description':    string,
        'video_id':             number,
        'media_ID_reference':   number,
        'show_likes':           number,
        'show_dislikes':        number,
        'show_ratting':         string,
        'author':               string,
        'showBanner':           string, //Show Image
        'type':                 string, // Should always be 'Movie' in this case
        
        'reviews':{

                'id':           number,
                'content':      string,
                'likes':        number,
                'dislkies':     number,
                'author':       string,
                'date':         string
        }

};

type Videos={

        'videoID':            number,
        'title':              string,
        'author':             string,
        'video_length':       string,
        'release_date':       string,
        'media_ID_reference': number,
        'show_ratting':       string,
        'video_description':  string,
        'video_banner':       string,
        'likes':              number,
        'dislikes':           number,
        'type':               string, // Anime, Movie, User (User Generated)

        'comments':{
                'id':           number,
                'content':      string,
                'likes':        number,
                'dislkies':     number,
                'author':       string,
                'date':         string
        }



};

type Store={

        'storeID':              number,
        'sellerID':             number,
        'title':                string,
        'num_in_stock':           number,
        'posted_date':          string,
        'original_price':       number,
        'discount_price':       number,
        'discount_percent':     number,
        'shipping_price':       number,
        'description':          string,
        'num_of_carts':           number,
        'images':               string[]


};

type Books={

};

type Announcements ={
                'announcementid':number,
                'title':        string,
                'description':  string,
                'author':       string,
                'likes':        number,
                'dislikes':     number,
                'views':        number,
                'date':         string,
                'comments': {
                        'id':           number,
                        'content':      string,
                        'likes':        number,
                        'dislkies':     number,
                        'author':       string,
                        'date':         string
                }
};

type SubscriptionTiers = {
                        'name':      string,
                        'price':     string,
                        'votepower': number,
                        'votepower_txt': string,
                        'cloudlimit': number,
                        'cloudlimit_txt': string,
                        'icon':      ReactElement,
                        'tier_number': number,
                        'store_discount': number,
                        'store_discount_txt': string,
                        'game_discount': number,
                        'game_discount_txt': string,
                        'other': string[],
                        'name': string
};


type Polls ={
        'pollid':       number,
        'author':       number,
        'title':        string,
        'description':  string,
        'likes':        number,
        'dislikes':     number,
        'date':         string,
        'category':     string,
        'status':       string,
        'progress':     string,
        'views':        number,
};


type UpcomingReleases ={
                'title': string,
                'date': string,
                'description': string
};

type CommunityHighlights ={
                'title': string,
                'date': string,
                'author': string,
                'likes': number, 
                'dislikes': number,
                'views': number, 
                'comments': {
                'STUFF NEEDS TO GO HERE'
                }

};

type Episodes ={

     'episodeid': number, 
     'seasonid': number,
     'episode_number_display': number,
     'episode_number': number, 
     'title': string,
     'description': string,
     'release_date': string,
     'duration': number,
     'likes': number, 
     'dislikes': number, 
     'thumbnail': string,
     'season_number_display': string,
};

type Reviews ={
        'reviewid': number,
        'animeid':number,
        'userid': number,
        'rating': number,
        'review_text': string,
        'review_date': string,
        'likes': number,
        'dislikes': number
};

type SiteData={
        'nav_items': string[],
        'footer_items': string[],
        'footer_separator': string,
        'important_info': string,
        'website_version': string,
};

type Rating={
        'ratingid': number,
        'userid': number,
        'animeid': number,
        'rating': number,
};

type UserActivity={
        'userid': number, 
        'child_content': number,
        'parent_content': number,
        'mediatype': string, // Anime, Manga, Movies ect. 
        'stopping_point': number, // Seconds or Page Number
        'date_watched': string,
}