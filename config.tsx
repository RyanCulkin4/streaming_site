import { Check, Zap, Crown } from 'lucide-react';
import {SubscriptionTiers, Announcements, User, Anime } from '@/app/api/types/types';

/*

THIS FILE IS MENT FOR DEVELOPMENT PURPOSES ONLY

THIS FILE CONTAINES VALUES SIMILAR TO WHAT IS RETURNED FROM THE DATABASE

USE THIS FILE FOR OFFLINE DEVELOPMENT OR TESTING

COMMIT ANY NEW DYNAMIC VARIABLES TO THE DATABASE AT END OF DEVELOPMENT

*/


export function variables() {

  const navItems = ['Anime', 'Manga', 'Movies', 'Videos', 'Storage', 'Store']
  const footerItems = ['About Us', 'Values', 'Employees', 'Careers', 'Contact Us']
  const footerSeparator = '|' // Could also be - or *

  const subscriptionPrices = [0, 7, 14]

  // ------ Free Tier Values ------
  const freeVotePower = 1       // #x
  const freecloudLimit = 50     // GB

  // ------ Pro Tier Values ------
  const proVotePower = 2        // #x
  const procloudLimit = 100     // GB
  const proStoreSale = 5        // Percent
  const proGameSale = 25        // Percent

  // ------ Ultimate Tier Values ------
  const ultVotePower = 3        // #x
  const ultcloudLimit = 150     // GB
  const ultStoreSale = 10       // Percent
  const ultGameSale = 100       // Percent

  const subscriptionTiers: SubscriptionTiers[] = [{

    name: 'Free',
    price: `$${subscriptionPrices[0]}/month`,
    icon: <Check className="h-6 w-6" />,
    features: [
      `Create and vote on Polls (${freeVotePower}x Vote Power)`,
      'Streaming with ads',
      `${freecloudLimit}GB cloud upload limit`
    ]
  }, {

    name: 'Pro',
    price: `$${subscriptionPrices[1]}/month`,
    icon: <Zap className="h-6 w-6" />,
    features: [
      `Create and vote on Polls (${proVotePower}x Vote Power)`,
      'Ad-free streaming',
      `${procloudLimit}GB cloud upload limit`,
      `${proStoreSale}% off store purchases`,
      `${proGameSale}% off game store purchases`
    ]
  }, {

    name: 'Ultimate',
    price: `$${subscriptionPrices[2]}/month`,
    icon: <Crown className="h-6 w-6" />,
    features: [
      `Create and vote on Polls (${ultVotePower}x Vote Power)`,
      'Ad-free streaming',
      `${ultcloudLimit}GB cloud upload limit`,
      `${ultStoreSale}% off store purchases`,
      `${ultGameSale}% off game store purchases`,
      'Support a good cause :D'

    ]
  }];

  const popularPolls: PopularPolls[] = [{
    pollid: 1,
    title: "Add a new anime genre",
    description: "Propose a new genre for categorizing anime",
    likes: 1500,
    dislikes: 300,
    views: 5000,
    author: "AnimeEnthusiast",
    date: "2023-08-15"
  }, {
    pollid: 2,
    title: "Implement a rating system",
    description: "Add a star-based rating system for all content",
    likes: 2000,
    dislikes: 150,
    views: 6000,
    author: "CriticMaster",
    date: "2023-08-10"
  }, {
    pollid: 3,
    title: "Expand manga library",
    description: "Include more indie and lesser-known manga titles",
    likes: 1800,
    dislikes: 200,
    views: 4500,
    author: "MangaLover",
    date: "2023-07-28"
  }, {
    pollid: 4,
    title: "Expand Stuff library",
    description: "Include more indie and lesser-known manga titles",
    likes: 1800,
    dislikes: 200,
    views: 4500,
    author: "MangaLover",
    date: "2023-07-28"
  }];

  const announcements: Announcements[] = [{
    announcementid: 1,
    title: 'Website Maintenance Scheduled',
    description: 'Well be performing routine maintenance on July 15th. The site may be unavailable for a few hours.',
    author: 'TechSupport',
    likes: 500,
    dislikes: 100,
    views: 8000,
    date: '2023-07-10',
    comments: {
            id: 0,
            content: '',
            likes: 0,
            dislkies: 0,
            author: '',
            date: ''
            }
    },{
    announcementid: 1,
    title: 'Website Maintenance Scheduled',
    description: 'Well be performing routine maintenance on July 15th. The site may be unavailable for a few hours.',
    author: 'TechSupport',
    likes: 500,
    dislikes: 100,
    views: 8000,
    date: '2023-07-10',
    comments: {
            id: 0,
            content: '',
            likes: 0,
            dislkies: 0,
            author: '',
            date: ''
            }
    }];

  const user: User[] = [{

      userid: 0,    
      username: 'Thanatos',
      email: 'ryankculkin@gmail.com',
      password_hash: 'Apple450!',   

      /*  Fix Vulnerability in future:
      Entire user variable can be accsess from front end.
      Could lead to password getting leaked from hackers.
      Update to pass only the needed variables needed.
      Also would imporve performance */ 

      date_joined:  '09-08-2024',
      perm_level: 100,
      num_of_friends: 0,
      num_of_followers: 0,
      profile_picture: '',
      bio: 'I am God',
      subscription: 'Free',
      twoFactor: true,
      email_notifications: true,
      push_notifications: true,

      bookmark_content:{
                  content_IDs: [0, 1, 2]},
  
      liked_content:{
                  content_IDs: [0, 2]},
  
      dislikes_content:{
                  content_IDs: [1]},
      
      recent_content:{
                  content_IDs: [0, 1, 2]},
  
      shopping_cart:{
                  content_IDs: [0, 1]},
    }]

    const anime: Anime[] = [{
      animeid: 0,
      authorid: 0,
      title:'stuff',
      description:'more stuff',
      trailerid: 0,
      media_id_reference: 0,
      release_date: '',
      genre:'god',
      likes: 0,
      dislikes: 0,

      ratting: '4',
      ammount_of_reviews: 20,
      
      reviews:{

              id: 0,
              content: 'It was Ok',
              likes: 2,
              dislkies: 100,
              authorid: 0,
              date: 'Date'
    }},{
      animeid: 0,
      authorid: 0,
      title:'stuff',
      description:'more stuff',
      trailerid: 0,
      media_id_reference: 0,
      release_date: '',
      genre:'god',
      likes: 0,
      dislikes: 0,

      ratting: '4',
      ammount_of_reviews: 20,
      
      reviews:{

              id: 0,
              content: 'It was Ok',
              likes: 2,
              dislkies: 100,
              authorid: 0,
              date: 'Date'
      }}]

  return { anime, user, navItems, footerItems, footerSeparator, subscriptionPrices, freeVotePower, freecloudLimit, proVotePower, procloudLimit, proStoreSale, proGameSale, ultVotePower, ultcloudLimit, ultStoreSale, ultGameSale, subscriptionTiers, popularPolls, announcements };
}