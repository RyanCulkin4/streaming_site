
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AnimeScalarFieldEnum = {
  animeid: 'animeid',
  description: 'description',
  trailerid: 'trailerid',
  upload_date: 'upload_date',
  release_date: 'release_date',
  likes: 'likes',
  dislikes: 'dislikes',
  activity: 'activity',
  authorid: 'authorid',
  average_rating: 'average_rating',
  anime_ratings: 'anime_ratings',
  age_rating: 'age_rating',
  mangaid: 'mangaid',
  title: 'title',
  type: 'type',
  MediaGenre: 'MediaGenre',
  anime_key_visual: 'anime_key_visual',
  visible: 'visible'
};

exports.Prisma.Anime_AuthorsScalarFieldEnum = {
  animeid: 'animeid',
  authorid: 'authorid'
};

exports.Prisma.BookmarksScalarFieldEnum = {
  userid: 'userid',
  mediatype: 'mediatype',
  parentid: 'parentid'
};

exports.Prisma.CommentsScalarFieldEnum = {
  commentid: 'commentid',
  parentid: 'parentid',
  mediatype: 'mediatype',
  mediatime: 'mediatime',
  userid: 'userid',
  comment_text: 'comment_text',
  comment_date: 'comment_date',
  parent_comment_id: 'parent_comment_id',
  likes: 'likes',
  dislikes: 'dislikes'
};

exports.Prisma.ContentGroupScalarFieldEnum = {
  seasonid: 'seasonid',
  season_number: 'season_number',
  release_date: 'release_date',
  visible: 'visible',
  season_path: 'season_path'
};

exports.Prisma.ContentGroupMediaScalarFieldEnum = {
  id: 'id',
  seasonid: 'seasonid',
  mediaid: 'mediaid',
  mediatype: 'mediatype'
};

exports.Prisma.ContentUnitScalarFieldEnum = {
  episodeid: 'episodeid',
  contentgroupid: 'contentgroupid',
  title: 'title',
  description: 'description',
  release_date: 'release_date',
  likes: 'likes',
  dislikes: 'dislikes',
  visible: 'visible',
  episode_number: 'episode_number',
  views: 'views',
  duration: 'duration',
  episode_path: 'episode_path',
  thumbnail: 'thumbnail'
};

exports.Prisma.Disliked_ContentScalarFieldEnum = {
  userid: 'userid',
  contentid: 'contentid',
  mediatype: 'mediatype'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  path: 'path',
  extension: 'extension',
  folderId: 'folderId',
  size: 'size',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastAccessed: 'lastAccessed',
  isShared: 'isShared',
  ownerId: 'ownerId',
  tags: 'tags',
  checksum: 'checksum',
  downloadCount: 'downloadCount',
  previewEnabled: 'previewEnabled',
  isPublic: 'isPublic',
  filetype: 'filetype',
  location: 'location'
};

exports.Prisma.FileSharesScalarFieldEnum = {
  userId: 'userId',
  fileId: 'fileId',
  accessLevel: 'accessLevel'
};

exports.Prisma.FolderScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastAccessed: 'lastAccessed',
  ownerId: 'ownerId',
  tags: 'tags',
  accessCount: 'accessCount',
  totalSize: 'totalSize',
  parentFolderId: 'parentFolderId',
  filetype: 'filetype',
  location: 'location'
};

exports.Prisma.FolderSharesScalarFieldEnum = {
  userId: 'userId',
  folderId: 'folderId',
  accessLevel: 'accessLevel'
};

exports.Prisma.Liked_ContentScalarFieldEnum = {
  userid: 'userid',
  mediatype: 'mediatype',
  contentid: 'contentid'
};

exports.Prisma.MangaScalarFieldEnum = {
  mangaid: 'mangaid',
  authorid: 'authorid',
  title: 'title',
  description: 'description',
  release_date: 'release_date',
  cover_iamge: 'cover_iamge',
  likes: 'likes',
  dislikes: 'dislikes',
  age_rating: 'age_rating',
  MediaGenre: 'MediaGenre'
};

exports.Prisma.MoviesScalarFieldEnum = {
  movieid: 'movieid',
  title: 'title',
  description: 'description',
  release_date: 'release_date',
  media_id_reference: 'media_id_reference',
  likes: 'likes',
  dislikes: 'dislikes',
  showbanner: 'showbanner',
  age_rating: 'age_rating',
  authorid: 'authorid',
  media_reference_type: 'media_reference_type',
  MediaGenre: 'MediaGenre'
};

exports.Prisma.PollsScalarFieldEnum = {
  pollid: 'pollid',
  author: 'author',
  title: 'title',
  description: 'description',
  likes: 'likes',
  dislikes: 'dislikes',
  date: 'date',
  category: 'category',
  status: 'status',
  progress: 'progress',
  views: 'views'
};

exports.Prisma.ReviewsScalarFieldEnum = {
  reviewid: 'reviewid',
  parentid: 'parentid',
  mediatype: 'mediatype',
  userid: 'userid',
  review_text: 'review_text',
  review_date: 'review_date',
  likes: 'likes',
  dislikes: 'dislikes'
};

exports.Prisma.Shopping_CartScalarFieldEnum = {
  userid: 'userid',
  storeid: 'storeid',
  quantity: 'quantity'
};

exports.Prisma.StoreScalarFieldEnum = {
  storeid: 'storeid',
  sellerid: 'sellerid',
  title: 'title',
  num_in_stock: 'num_in_stock',
  release_date: 'release_date',
  original_price: 'original_price',
  discount_price: 'discount_price',
  discount_percent: 'discount_percent',
  shipping_price: 'shipping_price',
  description: 'description',
  num_of_carts: 'num_of_carts',
  images: 'images',
  media_id_reference: 'media_id_reference',
  sales: 'sales',
  reference_media_type: 'reference_media_type',
  MediaGenre: 'MediaGenre'
};

exports.Prisma.Subscription_TiersScalarFieldEnum = {
  tierid: 'tierid',
  name: 'name',
  price: 'price',
  votepower: 'votepower',
  cloudlimit: 'cloudlimit',
  icon: 'icon',
  store_discount: 'store_discount',
  game_discount: 'game_discount',
  permissions: 'permissions',
  features: 'features',
  userid: 'userid'
};

exports.Prisma.TitleTranslationScalarFieldEnum = {
  translationid: 'translationid',
  parentid: 'parentid',
  mediatype: 'mediatype',
  title: 'title',
  language: 'language'
};

exports.Prisma.User_ActivityScalarFieldEnum = {
  userid: 'userid',
  child_content: 'child_content',
  parent_content: 'parent_content',
  mediatype: 'mediatype',
  stopping_point: 'stopping_point',
  date_watched: 'date_watched'
};

exports.Prisma.User_BookmarksScalarFieldEnum = {
  userid: 'userid',
  mediatype: 'mediatype',
  parentid: 'parentid'
};

exports.Prisma.User_RatingsScalarFieldEnum = {
  userid: 'userid',
  parentid: 'parentid',
  mediatype: 'mediatype',
  rating: 'rating'
};

exports.Prisma.UsersScalarFieldEnum = {
  userid: 'userid',
  username: 'username',
  email: 'email',
  password_hash: 'password_hash',
  date_joined: 'date_joined',
  num_of_friends: 'num_of_friends',
  num_of_followers: 'num_of_followers',
  profile_picture: 'profile_picture',
  user_bio: 'user_bio',
  two_factor: 'two_factor',
  email_notifications: 'email_notifications',
  push_notifications: 'push_notifications',
  subscriptionTierId: 'subscriptionTierId',
  usedstorage: 'usedstorage',
  accountType: 'accountType'
};

exports.Prisma.VideosScalarFieldEnum = {
  videoid: 'videoid',
  title: 'title',
  authorid: 'authorid',
  description: 'description',
  release_date: 'release_date',
  media_type: 'media_type',
  video_banner: 'video_banner',
  likes: 'likes',
  dislikes: 'dislikes',
  duration: 'duration',
  MediaGenre: 'MediaGenre',
  thumbnail: 'thumbnail',
  views: 'views'
};

exports.Prisma.Website_VariablesScalarFieldEnum = {
  website_version: 'website_version',
  footer_items: 'footer_items',
  footer_separator: 'footer_separator',
  important_info: 'important_info',
  rootContentPath: 'rootContentPath',
  loggedin_nav_items: 'loggedin_nav_items',
  loggedout_nav_items: 'loggedout_nav_items'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.AgeRating = exports.$Enums.AgeRating = {
  G: 'G',
  PG: 'PG',
  PG13: 'PG13',
  R: 'R',
  NC17: 'NC17',
  MA: 'MA'
};

exports.MediaType = exports.$Enums.MediaType = {
  ANIME: 'ANIME',
  MOVIE: 'MOVIE',
  MANGA: 'MANGA',
  VIDEO: 'VIDEO',
  POLL: 'POLL',
  STORE: 'STORE',
  STORAGE: 'STORAGE'
};

exports.MediaGenre = exports.$Enums.MediaGenre = {
  ACTION: 'ACTION',
  ADVENTURE: 'ADVENTURE',
  COMEDY: 'COMEDY',
  DRAMA: 'DRAMA',
  FANTASY: 'FANTASY',
  HORROR: 'HORROR',
  MYSTERY: 'MYSTERY',
  ROMANCE: 'ROMANCE',
  SCI_FI: 'SCI_FI',
  SLICE_OF_LIFE: 'SLICE_OF_LIFE',
  SPORTS: 'SPORTS',
  SUPERNATURAL: 'SUPERNATURAL',
  THRILLER: 'THRILLER',
  MECHA: 'MECHA',
  HISTORICAL: 'HISTORICAL',
  MUSIC: 'MUSIC',
  PSYCHOLOGICAL: 'PSYCHOLOGICAL',
  SCHOOL: 'SCHOOL',
  SHOUNEN: 'SHOUNEN',
  SHOUJO: 'SHOUJO',
  SEINEN: 'SEINEN',
  JOSEI: 'JOSEI',
  ISEKAI: 'ISEKAI',
  MILITARY: 'MILITARY',
  VAMPIRE: 'VAMPIRE',
  DEMONS: 'DEMONS',
  MAGIC: 'MAGIC',
  PARODY: 'PARODY',
  MARTIAL_ARTS: 'MARTIAL_ARTS',
  GAME: 'GAME',
  HAREM: 'HAREM',
  YAOI: 'YAOI',
  YURI: 'YURI',
  TRAGEDY: 'TRAGEDY',
  CRIME: 'CRIME',
  WESTERN: 'WESTERN',
  BIOGRAPHY: 'BIOGRAPHY',
  DOCUMENTARY: 'DOCUMENTARY',
  FAMILY: 'FAMILY',
  KIDS: 'KIDS',
  ARTS: 'ARTS',
  ANIME: 'ANIME',
  SUPERHERO: 'SUPERHERO',
  FOLKLORE: 'FOLKLORE',
  ECOLOGICAL: 'ECOLOGICAL',
  ALTERNATIVE: 'ALTERNATIVE',
  LITRPG: 'LITRPG',
  CYBERPUNK: 'CYBERPUNK',
  STEAMPUNK: 'STEAMPUNK',
  GOTHIC: 'GOTHIC',
  POST_APOCALYPTIC: 'POST_APOCALYPTIC',
  HIGH_FANTASY: 'HIGH_FANTASY',
  LOW_FANTASY: 'LOW_FANTASY',
  ARTSY: 'ARTSY',
  AUTOBIOGRAPHY: 'AUTOBIOGRAPHY',
  SLASHER: 'SLASHER',
  SUSPENSE: 'SUSPENSE',
  ROMANTIC_COMEDY: 'ROMANTIC_COMEDY',
  FANFICTION: 'FANFICTION',
  COZY_MYSTERY: 'COZY_MYSTERY',
  BODY_HORROR: 'BODY_HORROR',
  ADULT_ANIMATION: 'ADULT_ANIMATION',
  POLITICAL: 'POLITICAL',
  SCIENCE_FANTASY: 'SCIENCE_FANTASY',
  ANARCHY: 'ANARCHY',
  APOCALYPTIC: 'APOCALYPTIC',
  ZOMBIE: 'ZOMBIE',
  VILLAIN: 'VILLAIN',
  MUSIC_DRAMA: 'MUSIC_DRAMA',
  FANTASY_ROMANCE: 'FANTASY_ROMANCE',
  HISTORICAL_FICTION: 'HISTORICAL_FICTION',
  SHAPESHIFTER: 'SHAPESHIFTER',
  SWORD_AND_SORCERY: 'SWORD_AND_SORCERY',
  GUILTY_PLEASURE: 'GUILTY_PLEASURE',
  ECO_FICTION: 'ECO_FICTION',
  RELIGIOUS: 'RELIGIOUS',
  EXPLORATION: 'EXPLORATION',
  WAR_DRAMA: 'WAR_DRAMA',
  ROAD_MOVIE: 'ROAD_MOVIE',
  POLICE_PROCEDURAL: 'POLICE_PROCEDURAL',
  ANIMATED_COMEDY: 'ANIMATED_COMEDY',
  LOVE_TRIANGLE: 'LOVE_TRIANGLE',
  PSYCHIC: 'PSYCHIC',
  FANTASY_ADVENTURE: 'FANTASY_ADVENTURE',
  DARK_FANTASY: 'DARK_FANTASY',
  TERROR: 'TERROR',
  WITCHCRAFT: 'WITCHCRAFT',
  SURVIVAL: 'SURVIVAL',
  UTOPIA: 'UTOPIA',
  DYSTOPIA: 'DYSTOPIA',
  GENDER_BENDER: 'GENDER_BENDER',
  TIME_TRAVEL: 'TIME_TRAVEL',
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  WAR_FANTASY: 'WAR_FANTASY',
  RAPE_REVENUE: 'RAPE_REVENUE',
  MYSTICAL_REALISM: 'MYSTICAL_REALISM',
  WUXIA: 'WUXIA',
  MYTHOLOGY: 'MYTHOLOGY',
  FRAGMENTED_NARRATIVE: 'FRAGMENTED_NARRATIVE',
  DANCE: 'DANCE',
  FANTASY_MYSTERY: 'FANTASY_MYSTERY',
  INDIE: 'INDIE',
  FOLK: 'FOLK',
  ZANY: 'ZANY',
  MONSTER: 'MONSTER',
  ALIEN: 'ALIEN',
  SPY: 'SPY',
  COOKING: 'COOKING',
  ESCAPE_ROOM: 'ESCAPE_ROOM',
  SURVIVAL_HORROR: 'SURVIVAL_HORROR',
  CULT_FAVORITE: 'CULT_FAVORITE',
  DOCUMENTARY_FICTION: 'DOCUMENTARY_FICTION',
  UNRELIABLE_NARRATOR: 'UNRELIABLE_NARRATOR',
  RANDOMIZED: 'RANDOMIZED',
  EXTREME_SPORTS: 'EXTREME_SPORTS',
  DARK_COMEDY: 'DARK_COMEDY',
  TRAVEL: 'TRAVEL',
  VINTAGE: 'VINTAGE',
  FARM_LIFE: 'FARM_LIFE',
  NATURE: 'NATURE',
  HEROIC_FANTASY: 'HEROIC_FANTASY',
  LOVE_HATE: 'LOVE_HATE',
  SLEEPY: 'SLEEPY',
  POLITICAL_DRAMA: 'POLITICAL_DRAMA',
  PARANORMAL_ROMANCE: 'PARANORMAL_ROMANCE',
  LOVE_HURTS: 'LOVE_HURTS',
  GLOBAL: 'GLOBAL',
  TRAILER: 'TRAILER'
};

exports.FileType = exports.$Enums.FileType = {
  FILE: 'FILE',
  FOLDER: 'FOLDER'
};

exports.AccessLevel = exports.$Enums.AccessLevel = {
  READ: 'READ',
  WRITE: 'WRITE',
  ADMIN: 'ADMIN'
};

exports.navItems = exports.$Enums.navItems = {
  OVERVIEW: 'OVERVIEW',
  DRIVE: 'DRIVE',
  VIDEOS: 'VIDEOS',
  ANIME: 'ANIME',
  MANGA: 'MANGA',
  MOVIES: 'MOVIES',
  STORE: 'STORE',
  POLLS: 'POLLS',
  STATS: 'STATS',
  SETTINGS: 'SETTINGS'
};

exports.AccountType = exports.$Enums.AccountType = {
  INDIVIDUAL: 'INDIVIDUAL',
  STUDIO: 'STUDIO',
  ADMIN: 'ADMIN'
};

exports.Prisma.ModelName = {
  Anime: 'Anime',
  Anime_Authors: 'Anime_Authors',
  Bookmarks: 'Bookmarks',
  Comments: 'Comments',
  ContentGroup: 'ContentGroup',
  ContentGroupMedia: 'ContentGroupMedia',
  ContentUnit: 'ContentUnit',
  Disliked_Content: 'Disliked_Content',
  File: 'File',
  FileShares: 'FileShares',
  Folder: 'Folder',
  FolderShares: 'FolderShares',
  Liked_Content: 'Liked_Content',
  Manga: 'Manga',
  Movies: 'Movies',
  Polls: 'Polls',
  Reviews: 'Reviews',
  Shopping_Cart: 'Shopping_Cart',
  Store: 'Store',
  Subscription_Tiers: 'Subscription_Tiers',
  TitleTranslation: 'TitleTranslation',
  User_Activity: 'User_Activity',
  User_Bookmarks: 'User_Bookmarks',
  User_Ratings: 'User_Ratings',
  Users: 'Users',
  Videos: 'Videos',
  Website_Variables: 'Website_Variables'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
