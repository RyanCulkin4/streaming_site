
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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
exports.FileType = exports.$Enums.FileType = {
  FILE: 'FILE',
  FOLDER: 'FOLDER'
};

exports.AccessLevel = exports.$Enums.AccessLevel = {
  READ: 'READ',
  WRITE: 'WRITE',
  ADMIN: 'ADMIN'
};

exports.AccountType = exports.$Enums.AccountType = {
  INDIVIDUAL: 'INDIVIDUAL',
  STUDIO: 'STUDIO',
  ADMIN: 'ADMIN'
};

exports.AgeRating = exports.$Enums.AgeRating = {
  G: 'G',
  PG: 'PG',
  PG13: 'PG13',
  R: 'R',
  NC17: 'NC17',
  MA: 'MA'
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

exports.MediaType = exports.$Enums.MediaType = {
  ANIME: 'ANIME',
  MOVIE: 'MOVIE',
  MANGA: 'MANGA',
  VIDEO: 'VIDEO',
  POLL: 'POLL',
  STORE: 'STORE',
  STORAGE: 'STORAGE'
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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/ryan/Desktop/streaming_site2/shared/prisma_client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/ryan/Desktop/streaming_site2/backend/sql_service/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../backend/sql_service/.env"
  },
  "relativePath": "../../backend/sql_service/prisma",
  "clientVersion": "6.5.0",
  "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../../../shared/prisma_client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Anime {\n  animeid          String       @id @default(cuid())\n  description      String?      @default(\"An amazing show with a great story lies ahead\")\n  trailerid        String?\n  upload_date      DateTime?    @default(now())\n  release_date     DateTime     @default(dbgenerated(\"'2024-12-08 20:51:00'::timestamp without time zone\"))\n  likes            BigInt       @default(0)\n  dislikes         BigInt       @default(0)\n  activity         Int          @default(0)\n  authorid         String\n  average_rating   Float        @default(0)\n  anime_ratings    Int          @default(0)\n  age_rating       AgeRating    @default(G)\n  mangaid          String?\n  title            String\n  type             MediaType    @default(ANIME)\n  MediaGenre       MediaGenre[]\n  anime_key_visual String?      @default(\"\")\n  visible          Boolean      @default(false)\n\n  // Existing Relations\n  Manga         Manga?          @relation(fields: [mangaid], references: [mangaid], onDelete: NoAction, onUpdate: NoAction, map: \"anime_media_id_reference_fkey\")\n  Videos        Videos?         @relation(fields: [trailerid], references: [videoid], onDelete: NoAction, onUpdate: NoAction, map: \"anime_trailer_id_fkey\")\n  Users         Users           @relation(fields: [authorid], references: [userid], onDelete: NoAction, onUpdate: NoAction, map: \"author_id_fkey\")\n  Anime_Authors Anime_Authors[]\n  Bookmarks     Bookmarks[]\n\n  // Updated Relation: Anime -> ContentGroupMedia -> ContentGroup\n  ContentGroupLinks ContentGroupMedia[] @relation(\"Anime_ContentGroupMedia\")\n}\n\nmodel Anime_Authors {\n  animeid  String\n  authorid String\n  Anime    Anime  @relation(fields: [animeid], references: [animeid], onDelete: NoAction, onUpdate: NoAction)\n  Users    Users  @relation(fields: [authorid], references: [userid], onDelete: NoAction, onUpdate: NoAction)\n\n  @@id([animeid, authorid])\n}\n\nmodel Bookmarks {\n  userid    String\n  mediatype MediaType\n  parentid  String\n  Anime     Anime     @relation(fields: [parentid], references: [animeid], onDelete: Cascade, map: \"Bookmarks_Anime_parentid_fkey\")\n  Manga     Manga     @relation(fields: [parentid], references: [mangaid], onDelete: Cascade, map: \"Bookmarks_Manga_parentid_fkey\")\n  Movies    Movies    @relation(fields: [parentid], references: [movieid], onDelete: Cascade, map: \"Bookmarks_Movies_parentid_fkey\")\n  Videos    Videos    @relation(fields: [parentid], references: [videoid], onDelete: Cascade, map: \"Bookmarks_Videos_parentid_fkey\")\n  Users     Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([userid, parentid, mediatype])\n}\n\nmodel Comments {\n  commentid         Int         @id @default(autoincrement())\n  parentid          String\n  mediatype         MediaType\n  mediatime         Int\n  userid            String\n  comment_text      String      @default(\"A really cool comment\")\n  comment_date      DateTime    @default(now())\n  parent_comment_id Int?\n  likes             BigInt      @default(0)\n  dislikes          BigInt      @default(0)\n  ContentUnit       ContentUnit @relation(fields: [parentid], references: [episodeid], onDelete: Cascade, map: \"Comments_ContentUnit_parentid_fkey\")\n  Videos            Videos      @relation(fields: [parentid], references: [videoid], onDelete: Cascade, map: \"Comments_Videos_parentid_fkey\")\n  Users             Users       @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n}\n\nmodel ContentGroup {\n  seasonid      String   @id @default(cuid())\n  season_number Int\n  release_date  DateTime @default(now())\n  visible       Boolean  @default(false)\n  season_path   String   @default(\"shows\")\n\n  // Relation to ContentGroupMedia\n  ContentGroupLinks ContentGroupMedia[] @relation(\"ContentGroup_ContentGroupMedia\")\n}\n\nmodel ContentGroupMedia {\n  id        String    @id @default(cuid())\n  seasonid  String\n  mediaid   String // Links to Anime, Manga, or Movie IDs\n  mediatype MediaType // ANIME, MANGA, MOVIE\n\n  // Back relations to media types\n  Anime  Anime?  @relation(\"Anime_ContentGroupMedia\", fields: [mediaid], references: [animeid], onDelete: Cascade, map: \"ContentGroupMedia_Anime_mediaid_fkey\")\n  Manga  Manga?  @relation(\"Manga_ContentGroupMedia\", fields: [mediaid], references: [mangaid], onDelete: Cascade, map: \"ContentGroupMedia_Manga_mediaid_fkey\")\n  Movies Movies? @relation(\"Movies_ContentGroupMedia\", fields: [mediaid], references: [movieid], onDelete: Cascade, map: \"ContentGroupMedia_Movies_mediaid_fkey\")\n\n  // Relation to ContentGroup (season)\n  ContentGroup ContentGroup  @relation(\"ContentGroup_ContentGroupMedia\", fields: [seasonid], references: [seasonid], onDelete: Cascade)\n  ContentUnits ContentUnit[]\n\n  @@unique([seasonid, mediaid, mediatype])\n}\n\nmodel ContentUnit {\n  episodeid      String     @id @default(cuid())\n  contentgroupid String\n  title          String     @default(\"An Amazing Episode\")\n  description    String     @default(\"An incredible show with a story to be told\")\n  release_date   DateTime?  @default(now())\n  likes          BigInt     @default(0)\n  dislikes       BigInt     @default(0)\n  visible        Boolean    @default(false)\n  episode_number Float\n  views          Int        @default(0)\n  duration       Int\n  episode_path   String     @default(\"\")\n  thumbnail      String     @default(\"\")\n  Comments       Comments[]\n\n  // Link to ContentGroupMedia instead of ContentGroup\n  ContentGroupMedia ContentGroupMedia @relation(fields: [contentgroupid], references: [id], onDelete: Cascade)\n}\n\nmodel Disliked_Content {\n  userid    String\n  contentid Int\n  mediatype MediaType\n  Users     Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([userid, contentid, mediatype])\n}\n\nmodel File {\n  id             String       @id @default(cuid())\n  name           String\n  description    String?\n  path           String       @default(\"server_data/\")\n  extension      String\n  folderId       String?\n  size           BigInt\n  createdAt      DateTime     @default(now())\n  updatedAt      DateTime?\n  lastAccessed   DateTime?\n  isShared       Boolean      @default(false)\n  ownerId        String\n  tags           String[]     @default([\"file\"])\n  checksum       String?\n  downloadCount  Int          @default(0)\n  previewEnabled Boolean      @default(true)\n  isPublic       Boolean      @default(true)\n  filetype       FileType     @default(FILE)\n  location       MediaType    @default(STORAGE)\n  Folder         Folder?      @relation(fields: [folderId], references: [id], onDelete: Cascade)\n  Users          Users        @relation(fields: [ownerId], references: [userid])\n  FileShares     FileShares[]\n\n  @@unique([ownerId, folderId, name])\n}\n\nmodel FileShares {\n  userId      String\n  fileId      String\n  accessLevel AccessLevel @default(READ)\n  File        File        @relation(fields: [fileId], references: [id], onDelete: Cascade)\n  Users       Users       @relation(fields: [userId], references: [userid], onDelete: Cascade)\n\n  @@id([userId, fileId])\n}\n\nmodel Folder {\n  id             String         @id @default(cuid())\n  name           String\n  description    String?\n  createdAt      DateTime       @default(now())\n  updatedAt      DateTime?\n  lastAccessed   DateTime?\n  ownerId        String\n  tags           String[]       @default([\"folder\"])\n  accessCount    Int            @default(0)\n  totalSize      Int            @default(0)\n  parentFolderId String?\n  filetype       FileType       @default(FOLDER)\n  location       MediaType      @default(STORAGE)\n  File           File[]\n  Users          Users          @relation(fields: [ownerId], references: [userid])\n  Folder         Folder?        @relation(\"FolderToFolder\", fields: [ownerId, parentFolderId], references: [ownerId, id], onDelete: Cascade)\n  other_Folder   Folder[]       @relation(\"FolderToFolder\")\n  FolderShares   FolderShares[]\n\n  @@unique([ownerId, id])\n}\n\nmodel FolderShares {\n  userId      String\n  folderId    String\n  accessLevel AccessLevel @default(READ)\n  Folder      Folder      @relation(fields: [folderId], references: [id])\n  Users       Users       @relation(fields: [userId], references: [userid], onDelete: Cascade)\n\n  @@id([userId, folderId])\n}\n\nmodel Liked_Content {\n  userid    String\n  mediatype MediaType\n  contentid Int\n  Users     Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([userid, contentid, mediatype])\n}\n\nmodel Manga {\n  mangaid           String              @id @default(cuid())\n  authorid          String\n  title             String              @db.VarChar(255)\n  description       String?             @default(\"Really Cool Manga\")\n  release_date      DateTime?           @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  cover_iamge       String?\n  likes             BigInt              @default(0)\n  dislikes          BigInt              @default(0)\n  age_rating        AgeRating           @default(G)\n  MediaGenre        MediaGenre[]\n  Anime             Anime[]\n  Bookmarks         Bookmarks[]\n  Users             Users               @relation(fields: [authorid], references: [userid], onDelete: NoAction, onUpdate: NoAction)\n  ContentGroupLinks ContentGroupMedia[] @relation(\"Manga_ContentGroupMedia\")\n}\n\nmodel Movies {\n  movieid              String              @id @default(cuid())\n  title                String              @db.VarChar(255)\n  description          String?\n  release_date         DateTime?           @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  media_id_reference   Int?\n  likes                BigInt              @default(0)\n  dislikes             BigInt              @default(0)\n  showbanner           String?\n  age_rating           AgeRating           @default(G)\n  authorid             String\n  media_reference_type MediaType\n  MediaGenre           MediaGenre[]\n  Bookmarks            Bookmarks[]\n  Users                Users               @relation(fields: [authorid], references: [userid], onDelete: NoAction, onUpdate: NoAction)\n  ContentGroupLinks    ContentGroupMedia[] @relation(\"Movies_ContentGroupMedia\")\n}\n\nmodel Polls {\n  pollid      Int       @id @default(autoincrement())\n  author      String\n  title       String    @db.VarChar(255)\n  description String\n  likes       BigInt    @default(0)\n  dislikes    BigInt    @default(0)\n  date        DateTime? @default(now()) @db.Timestamp(6)\n  category    String    @default(\"all\")\n  status      String    @default(\"In Voting\")\n  progress    String?\n  views       Int       @default(0)\n  Users       Users     @relation(fields: [author], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n}\n\nmodel Reviews {\n  reviewid    Int       @id @default(autoincrement())\n  parentid    String\n  mediatype   MediaType\n  userid      String\n  review_text String    @default(\"This is a great show\")\n  review_date DateTime  @default(now())\n  likes       BigInt    @default(0)\n  dislikes    BigInt    @default(0)\n  Users       Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n}\n\nmodel Shopping_Cart {\n  userid   String\n  storeid  String\n  quantity Int?   @default(0)\n  Store    Store  @relation(fields: [storeid], references: [storeid], onDelete: Cascade, onUpdate: NoAction)\n  Users    Users  @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([userid, storeid])\n}\n\nmodel Store {\n  storeid              String          @id @default(cuid())\n  sellerid             String\n  title                String\n  num_in_stock         Int             @default(0)\n  release_date         DateTime?       @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  original_price       Decimal         @default(0.00) @db.Decimal(10, 2)\n  discount_price       Decimal         @default(0.00) @db.Decimal(10, 2)\n  discount_percent     Float           @default(0.00)\n  shipping_price       Decimal         @default(0.00) @db.Decimal(10, 2)\n  description          String          @default(\"A really cool item\")\n  num_of_carts         Int             @default(0)\n  images               String?         @default(\"\")\n  media_id_reference   Int?\n  sales                Int             @default(0)\n  reference_media_type String?\n  MediaGenre           MediaGenre[]\n  Shopping_Cart        Shopping_Cart[]\n  Users                Users           @relation(fields: [sellerid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n}\n\nmodel Subscription_Tiers {\n  tierid         Int        @id @db.SmallInt\n  name           String     @unique\n  price          Int        @db.SmallInt\n  votepower      Int        @db.SmallInt\n  cloudlimit     Int        @db.SmallInt\n  icon           String?    @db.VarChar\n  store_discount Int        @default(0)\n  game_discount  Int        @default(0)\n  permissions    navItems[]\n  features       String[]\n  userid         String? // This is a foreign key to the Users table allows for custom tiers\n  Users          Users[]\n}\n\nmodel TitleTranslation {\n  translationid Int       @id @default(autoincrement())\n  parentid      Int\n  mediatype     MediaType\n  title         String    @db.VarChar(255)\n  language      String    @db.VarChar(10)\n}\n\nmodel User_Activity {\n  userid         String\n  child_content  String\n  parent_content String\n  mediatype      MediaType\n  stopping_point Int\n  date_watched   DateTime  @default(now())\n  Users          Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction, map: \"fk_user\")\n\n  @@id([userid, child_content, parent_content, mediatype])\n}\n\nmodel User_Bookmarks {\n  userid    String\n  mediatype MediaType\n  parentid  String\n  Users     Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([userid, parentid, mediatype])\n}\n\nmodel User_Ratings {\n  userid    String\n  parentid  String\n  mediatype MediaType\n  rating    Int\n  Users     Users     @relation(fields: [userid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([userid, parentid])\n}\n\nmodel Users {\n  userid              String              @id @default(cuid())\n  username            String              @unique @db.VarChar(30)\n  email               String              @unique @db.VarChar(60)\n  password_hash       String              @db.VarChar(120)\n  date_joined         DateTime            @default(now())\n  num_of_friends      Int?                @default(0)\n  num_of_followers    Int?                @default(0)\n  profile_picture     String?             @db.VarChar(255)\n  user_bio            String?             @default(\"A really cool user :P\")\n  two_factor          Boolean             @default(false)\n  email_notifications Boolean             @default(false)\n  push_notifications  Boolean             @default(false)\n  subscriptionTierId  Int?                @db.SmallInt\n  usedstorage         BigInt              @default(0)\n  subscription_tier   Subscription_Tiers? @relation(fields: [subscriptionTierId], references: [tierid])\n  accountType         AccountType         @default(INDIVIDUAL)\n  Anime               Anime[]\n  Anime_Authors       Anime_Authors[]\n  Bookmarks           Bookmarks[]\n  Comments            Comments[]\n  Disliked_Content    Disliked_Content[]\n  File                File[]\n  FileShares          FileShares[]\n  Folder              Folder[]\n  FolderShares        FolderShares[]\n  Liked_Content       Liked_Content[]\n  Manga               Manga[]\n  Movies              Movies[]\n  Polls               Polls[]\n  Reviews             Reviews[]\n  Shopping_Cart       Shopping_Cart[]\n  Store               Store[]\n  User_Activity       User_Activity[]\n  User_Bookmarks      User_Bookmarks[]\n  User_Ratings        User_Ratings[]\n  Videos              Videos[]\n}\n\nmodel Videos {\n  videoid      String       @id @default(cuid())\n  title        String       @db.VarChar(255)\n  authorid     String\n  description  String       @default(\"A really cool video\")\n  release_date DateTime?    @default(dbgenerated(\"CURRENT_DATE\")) @db.Date\n  media_type   MediaType    @default(VIDEO)\n  video_banner String       @default(\"\")\n  likes        BigInt       @default(0)\n  dislikes     BigInt       @default(0)\n  duration     BigInt?\n  MediaGenre   MediaGenre[]\n  thumbnail    String       @default(\"\")\n  views        Int          @default(0)\n  Anime        Anime[]\n  Bookmarks    Bookmarks[]\n  Comments     Comments[]\n  Users        Users        @relation(fields: [authorid], references: [userid], onDelete: Cascade, onUpdate: NoAction)\n}\n\nmodel Website_Variables {\n  website_version     String      @id\n  footer_items        String[]\n  footer_separator    String?     @db.VarChar(1)\n  important_info      String?\n  rootContentPath     String?     @default(\"public/content\")\n  loggedin_nav_items  MediaType[]\n  loggedout_nav_items MediaType[]\n}\n\nenum FileType {\n  FILE\n  FOLDER\n}\n\nenum AccessLevel {\n  READ\n  WRITE\n  ADMIN\n}\n\nenum AccountType {\n  INDIVIDUAL\n  STUDIO\n  ADMIN\n}\n\nenum AgeRating {\n  G\n  PG\n  PG13\n  R\n  NC17\n  MA\n}\n\nenum MediaGenre {\n  ACTION\n  ADVENTURE\n  COMEDY\n  DRAMA\n  FANTASY\n  HORROR\n  MYSTERY\n  ROMANCE\n  SCI_FI\n  SLICE_OF_LIFE\n  SPORTS\n  SUPERNATURAL\n  THRILLER\n  MECHA\n  HISTORICAL\n  MUSIC\n  PSYCHOLOGICAL\n  SCHOOL\n  SHOUNEN\n  SHOUJO\n  SEINEN\n  JOSEI\n  ISEKAI\n  MILITARY\n  VAMPIRE\n  DEMONS\n  MAGIC\n  PARODY\n  MARTIAL_ARTS\n  GAME\n  HAREM\n  YAOI\n  YURI\n  TRAGEDY\n  CRIME\n  WESTERN\n  BIOGRAPHY\n  DOCUMENTARY\n  FAMILY\n  KIDS\n  ARTS\n  ANIME\n  SUPERHERO\n  FOLKLORE\n  ECOLOGICAL\n  ALTERNATIVE\n  LITRPG\n  CYBERPUNK\n  STEAMPUNK\n  GOTHIC\n  POST_APOCALYPTIC\n  HIGH_FANTASY\n  LOW_FANTASY\n  ARTSY\n  AUTOBIOGRAPHY\n  SLASHER\n  SUSPENSE\n  ROMANTIC_COMEDY\n  FANFICTION\n  COZY_MYSTERY\n  BODY_HORROR\n  ADULT_ANIMATION\n  POLITICAL\n  SCIENCE_FANTASY\n  ANARCHY\n  APOCALYPTIC\n  ZOMBIE\n  VILLAIN\n  MUSIC_DRAMA\n  FANTASY_ROMANCE\n  HISTORICAL_FICTION\n  SHAPESHIFTER\n  SWORD_AND_SORCERY\n  GUILTY_PLEASURE\n  ECO_FICTION\n  RELIGIOUS\n  EXPLORATION\n  WAR_DRAMA\n  ROAD_MOVIE\n  POLICE_PROCEDURAL\n  ANIMATED_COMEDY\n  LOVE_TRIANGLE\n  PSYCHIC\n  FANTASY_ADVENTURE\n  DARK_FANTASY\n  TERROR\n  WITCHCRAFT\n  SURVIVAL\n  UTOPIA\n  DYSTOPIA\n  GENDER_BENDER\n  TIME_TRAVEL\n  HIGH_SCHOOL\n  WAR_FANTASY\n  RAPE_REVENUE\n  MYSTICAL_REALISM\n  WUXIA\n  MYTHOLOGY\n  FRAGMENTED_NARRATIVE\n  DANCE\n  FANTASY_MYSTERY\n  INDIE\n  FOLK\n  ZANY\n  MONSTER\n  ALIEN\n  SPY\n  COOKING\n  ESCAPE_ROOM\n  SURVIVAL_HORROR\n  CULT_FAVORITE\n  DOCUMENTARY_FICTION\n  UNRELIABLE_NARRATOR\n  RANDOMIZED\n  EXTREME_SPORTS\n  DARK_COMEDY\n  TRAVEL\n  VINTAGE\n  FARM_LIFE\n  NATURE\n  HEROIC_FANTASY\n  LOVE_HATE\n  SLEEPY\n  POLITICAL_DRAMA\n  PARANORMAL_ROMANCE\n  LOVE_HURTS\n  GLOBAL\n  TRAILER\n}\n\nenum MediaType {\n  ANIME\n  MOVIE\n  MANGA\n  VIDEO\n  POLL\n  STORE\n  STORAGE\n}\n\nenum navItems {\n  OVERVIEW\n  DRIVE\n  VIDEOS\n  ANIME\n  MANGA\n  MOVIES\n  STORE\n  POLLS\n  STATS\n  SETTINGS\n}\n",
  "inlineSchemaHash": "3c2df37c211572520708fa804b1a496080af4a4bae9a2275364456e95155e503",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Anime\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"animeid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"An amazing show with a great story lies ahead\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trailerid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"upload_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2024-12-08 20:51:00'::timestamp without time zone\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"activity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"average_rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"anime_ratings\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"age_rating\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AgeRating\",\"nativeType\":null,\"default\":\"G\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mangaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MediaType\",\"nativeType\":null,\"default\":\"ANIME\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MediaGenre\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaGenre\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"anime_key_visual\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Manga\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Manga\",\"nativeType\":null,\"relationName\":\"AnimeToManga\",\"relationFromFields\":[\"mangaid\"],\"relationToFields\":[\"mangaid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Videos\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Videos\",\"nativeType\":null,\"relationName\":\"AnimeToVideos\",\"relationFromFields\":[\"trailerid\"],\"relationToFields\":[\"videoid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"AnimeToUsers\",\"relationFromFields\":[\"authorid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime_Authors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime_Authors\",\"nativeType\":null,\"relationName\":\"AnimeToAnime_Authors\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Bookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bookmarks\",\"nativeType\":null,\"relationName\":\"AnimeToBookmarks\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentGroupLinks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentGroupMedia\",\"nativeType\":null,\"relationName\":\"Anime_ContentGroupMedia\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Anime_Authors\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"animeid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime\",\"nativeType\":null,\"relationName\":\"AnimeToAnime_Authors\",\"relationFromFields\":[\"animeid\"],\"relationToFields\":[\"animeid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"Anime_AuthorsToUsers\",\"relationFromFields\":[\"authorid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"animeid\",\"authorid\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Bookmarks\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime\",\"nativeType\":null,\"relationName\":\"AnimeToBookmarks\",\"relationFromFields\":[\"parentid\"],\"relationToFields\":[\"animeid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Manga\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Manga\",\"nativeType\":null,\"relationName\":\"BookmarksToManga\",\"relationFromFields\":[\"parentid\"],\"relationToFields\":[\"mangaid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Movies\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movies\",\"nativeType\":null,\"relationName\":\"BookmarksToMovies\",\"relationFromFields\":[\"parentid\"],\"relationToFields\":[\"movieid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Videos\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Videos\",\"nativeType\":null,\"relationName\":\"BookmarksToVideos\",\"relationFromFields\":[\"parentid\"],\"relationToFields\":[\"videoid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"BookmarksToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"parentid\",\"mediatype\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Comments\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"commentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"A really cool comment\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent_comment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentUnit\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentUnit\",\"nativeType\":null,\"relationName\":\"CommentsToContentUnit\",\"relationFromFields\":[\"parentid\"],\"relationToFields\":[\"episodeid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Videos\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Videos\",\"nativeType\":null,\"relationName\":\"CommentsToVideos\",\"relationFromFields\":[\"parentid\"],\"relationToFields\":[\"videoid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"CommentsToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ContentGroup\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"seasonid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"season_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"season_path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"shows\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentGroupLinks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentGroupMedia\",\"nativeType\":null,\"relationName\":\"ContentGroup_ContentGroupMedia\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ContentGroupMedia\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seasonid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime\",\"nativeType\":null,\"relationName\":\"Anime_ContentGroupMedia\",\"relationFromFields\":[\"mediaid\"],\"relationToFields\":[\"animeid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Manga\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Manga\",\"nativeType\":null,\"relationName\":\"Manga_ContentGroupMedia\",\"relationFromFields\":[\"mediaid\"],\"relationToFields\":[\"mangaid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Movies\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movies\",\"nativeType\":null,\"relationName\":\"Movies_ContentGroupMedia\",\"relationFromFields\":[\"mediaid\"],\"relationToFields\":[\"movieid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentGroup\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentGroup\",\"nativeType\":null,\"relationName\":\"ContentGroup_ContentGroupMedia\",\"relationFromFields\":[\"seasonid\"],\"relationToFields\":[\"seasonid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentUnits\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentUnit\",\"nativeType\":null,\"relationName\":\"ContentGroupMediaToContentUnit\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"seasonid\",\"mediaid\",\"mediatype\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"seasonid\",\"mediaid\",\"mediatype\"]}],\"isGenerated\":false},\"ContentUnit\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"episodeid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contentgroupid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"An Amazing Episode\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"An incredible show with a story to be told\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"episode_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"duration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"episode_path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thumbnail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comments\",\"nativeType\":null,\"relationName\":\"CommentsToContentUnit\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentGroupMedia\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentGroupMedia\",\"nativeType\":null,\"relationName\":\"ContentGroupMediaToContentUnit\",\"relationFromFields\":[\"contentgroupid\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Disliked_Content\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"Disliked_ContentToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"contentid\",\"mediatype\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"File\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"server_data/\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extension\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"folderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"size\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastAccessed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isShared\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":[\"file\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"checksum\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"downloadCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"previewEnabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublic\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filetype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"FileType\",\"nativeType\":null,\"default\":\"FILE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MediaType\",\"nativeType\":null,\"default\":\"STORAGE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Folder\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Folder\",\"nativeType\":null,\"relationName\":\"FileToFolder\",\"relationFromFields\":[\"folderId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"FileToUsers\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"userid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FileShares\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FileShares\",\"nativeType\":null,\"relationName\":\"FileToFileShares\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"ownerId\",\"folderId\",\"name\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"ownerId\",\"folderId\",\"name\"]}],\"isGenerated\":false},\"FileShares\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessLevel\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AccessLevel\",\"nativeType\":null,\"default\":\"READ\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"File\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"File\",\"nativeType\":null,\"relationName\":\"FileToFileShares\",\"relationFromFields\":[\"fileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"FileSharesToUsers\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userId\",\"fileId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Folder\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastAccessed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":[\"folder\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalSize\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentFolderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filetype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"FileType\",\"nativeType\":null,\"default\":\"FOLDER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MediaType\",\"nativeType\":null,\"default\":\"STORAGE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"File\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"File\",\"nativeType\":null,\"relationName\":\"FileToFolder\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"FolderToUsers\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"userid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Folder\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Folder\",\"nativeType\":null,\"relationName\":\"FolderToFolder\",\"relationFromFields\":[\"ownerId\",\"parentFolderId\"],\"relationToFields\":[\"ownerId\",\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"other_Folder\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Folder\",\"nativeType\":null,\"relationName\":\"FolderToFolder\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FolderShares\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FolderShares\",\"nativeType\":null,\"relationName\":\"FolderToFolderShares\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"ownerId\",\"id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"ownerId\",\"id\"]}],\"isGenerated\":false},\"FolderShares\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"folderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessLevel\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AccessLevel\",\"nativeType\":null,\"default\":\"READ\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Folder\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Folder\",\"nativeType\":null,\"relationName\":\"FolderToFolderShares\",\"relationFromFields\":[\"folderId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"FolderSharesToUsers\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userId\",\"folderId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Liked_Content\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"Liked_ContentToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"contentid\",\"mediatype\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Manga\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"mangaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"Really Cool Manga\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cover_iamge\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"age_rating\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AgeRating\",\"nativeType\":null,\"default\":\"G\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MediaGenre\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaGenre\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime\",\"nativeType\":null,\"relationName\":\"AnimeToManga\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Bookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bookmarks\",\"nativeType\":null,\"relationName\":\"BookmarksToManga\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"MangaToUsers\",\"relationFromFields\":[\"authorid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentGroupLinks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentGroupMedia\",\"nativeType\":null,\"relationName\":\"Manga_ContentGroupMedia\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Movies\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"movieid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"media_id_reference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"showbanner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"age_rating\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AgeRating\",\"nativeType\":null,\"default\":\"G\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"media_reference_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MediaGenre\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaGenre\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Bookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bookmarks\",\"nativeType\":null,\"relationName\":\"BookmarksToMovies\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"MoviesToUsers\",\"relationFromFields\":[\"authorid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ContentGroupLinks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContentGroupMedia\",\"nativeType\":null,\"relationName\":\"Movies_ContentGroupMedia\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Polls\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"pollid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"all\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"In Voting\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"progress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"PollsToUsers\",\"relationFromFields\":[\"author\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Reviews\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"reviewid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"review_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"This is a great show\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"review_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"ReviewsToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Shopping_Cart\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"nativeType\":null,\"relationName\":\"Shopping_CartToStore\",\"relationFromFields\":[\"storeid\"],\"relationToFields\":[\"storeid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"Shopping_CartToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"storeid\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Store\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"storeid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sellerid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"num_in_stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"original_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discount_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discount_percent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shipping_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"A really cool item\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"num_of_carts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"media_id_reference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sales\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reference_media_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MediaGenre\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaGenre\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Shopping_Cart\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Shopping_Cart\",\"nativeType\":null,\"relationName\":\"Shopping_CartToStore\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"StoreToUsers\",\"relationFromFields\":[\"sellerid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Subscription_Tiers\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"tierid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"votepower\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cloudlimit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"icon\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store_discount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"game_discount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permissions\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"navItems\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"features\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"Subscription_TiersToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TitleTranslation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"translationid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"language\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User_Activity\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"child_content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent_content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stopping_point\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_watched\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"User_ActivityToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"child_content\",\"parent_content\",\"mediatype\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User_Bookmarks\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"User_BookmarksToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"parentid\",\"mediatype\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User_Ratings\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mediatype\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"User_RatingsToUsers\",\"relationFromFields\":[\"userid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userid\",\"parentid\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Users\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"userid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"30\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"60\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"120\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_joined\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"num_of_friends\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"num_of_followers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_bio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"A really cool user :P\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"two_factor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email_notifications\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"push_notifications\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subscriptionTierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usedstorage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subscription_tier\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Subscription_Tiers\",\"nativeType\":null,\"relationName\":\"Subscription_TiersToUsers\",\"relationFromFields\":[\"subscriptionTierId\"],\"relationToFields\":[\"tierid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AccountType\",\"nativeType\":null,\"default\":\"INDIVIDUAL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime\",\"nativeType\":null,\"relationName\":\"AnimeToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime_Authors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime_Authors\",\"nativeType\":null,\"relationName\":\"Anime_AuthorsToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Bookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bookmarks\",\"nativeType\":null,\"relationName\":\"BookmarksToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comments\",\"nativeType\":null,\"relationName\":\"CommentsToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Disliked_Content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Disliked_Content\",\"nativeType\":null,\"relationName\":\"Disliked_ContentToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"File\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"File\",\"nativeType\":null,\"relationName\":\"FileToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FileShares\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FileShares\",\"nativeType\":null,\"relationName\":\"FileSharesToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Folder\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Folder\",\"nativeType\":null,\"relationName\":\"FolderToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"FolderShares\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FolderShares\",\"nativeType\":null,\"relationName\":\"FolderSharesToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Liked_Content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Liked_Content\",\"nativeType\":null,\"relationName\":\"Liked_ContentToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Manga\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Manga\",\"nativeType\":null,\"relationName\":\"MangaToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Movies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movies\",\"nativeType\":null,\"relationName\":\"MoviesToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Polls\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Polls\",\"nativeType\":null,\"relationName\":\"PollsToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Reviews\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Reviews\",\"nativeType\":null,\"relationName\":\"ReviewsToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Shopping_Cart\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Shopping_Cart\",\"nativeType\":null,\"relationName\":\"Shopping_CartToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Store\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"nativeType\":null,\"relationName\":\"StoreToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"User_Activity\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User_Activity\",\"nativeType\":null,\"relationName\":\"User_ActivityToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"User_Bookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User_Bookmarks\",\"nativeType\":null,\"relationName\":\"User_BookmarksToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"User_Ratings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User_Ratings\",\"nativeType\":null,\"relationName\":\"User_RatingsToUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Videos\",\"nativeType\":null,\"relationName\":\"UsersToVideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Videos\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"videoid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"A really cool video\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"release_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"default\":{\"name\":\"dbgenerated\",\"args\":[\"CURRENT_DATE\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"media_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MediaType\",\"nativeType\":null,\"default\":\"VIDEO\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_banner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"nativeType\":null,\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"duration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MediaGenre\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaGenre\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thumbnail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Anime\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Anime\",\"nativeType\":null,\"relationName\":\"AnimeToVideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Bookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bookmarks\",\"nativeType\":null,\"relationName\":\"BookmarksToVideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comments\",\"nativeType\":null,\"relationName\":\"CommentsToVideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Users\",\"nativeType\":null,\"relationName\":\"UsersToVideos\",\"relationFromFields\":[\"authorid\"],\"relationToFields\":[\"userid\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Website_Variables\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"website_version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"footer_items\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"footer_separator\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"important_info\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rootContentPath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"public/content\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loggedin_nav_items\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loggedout_nav_items\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MediaType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"FileType\":{\"values\":[{\"name\":\"FILE\",\"dbName\":null},{\"name\":\"FOLDER\",\"dbName\":null}],\"dbName\":null},\"AccessLevel\":{\"values\":[{\"name\":\"READ\",\"dbName\":null},{\"name\":\"WRITE\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null},\"AccountType\":{\"values\":[{\"name\":\"INDIVIDUAL\",\"dbName\":null},{\"name\":\"STUDIO\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null},\"AgeRating\":{\"values\":[{\"name\":\"G\",\"dbName\":null},{\"name\":\"PG\",\"dbName\":null},{\"name\":\"PG13\",\"dbName\":null},{\"name\":\"R\",\"dbName\":null},{\"name\":\"NC17\",\"dbName\":null},{\"name\":\"MA\",\"dbName\":null}],\"dbName\":null},\"MediaGenre\":{\"values\":[{\"name\":\"ACTION\",\"dbName\":null},{\"name\":\"ADVENTURE\",\"dbName\":null},{\"name\":\"COMEDY\",\"dbName\":null},{\"name\":\"DRAMA\",\"dbName\":null},{\"name\":\"FANTASY\",\"dbName\":null},{\"name\":\"HORROR\",\"dbName\":null},{\"name\":\"MYSTERY\",\"dbName\":null},{\"name\":\"ROMANCE\",\"dbName\":null},{\"name\":\"SCI_FI\",\"dbName\":null},{\"name\":\"SLICE_OF_LIFE\",\"dbName\":null},{\"name\":\"SPORTS\",\"dbName\":null},{\"name\":\"SUPERNATURAL\",\"dbName\":null},{\"name\":\"THRILLER\",\"dbName\":null},{\"name\":\"MECHA\",\"dbName\":null},{\"name\":\"HISTORICAL\",\"dbName\":null},{\"name\":\"MUSIC\",\"dbName\":null},{\"name\":\"PSYCHOLOGICAL\",\"dbName\":null},{\"name\":\"SCHOOL\",\"dbName\":null},{\"name\":\"SHOUNEN\",\"dbName\":null},{\"name\":\"SHOUJO\",\"dbName\":null},{\"name\":\"SEINEN\",\"dbName\":null},{\"name\":\"JOSEI\",\"dbName\":null},{\"name\":\"ISEKAI\",\"dbName\":null},{\"name\":\"MILITARY\",\"dbName\":null},{\"name\":\"VAMPIRE\",\"dbName\":null},{\"name\":\"DEMONS\",\"dbName\":null},{\"name\":\"MAGIC\",\"dbName\":null},{\"name\":\"PARODY\",\"dbName\":null},{\"name\":\"MARTIAL_ARTS\",\"dbName\":null},{\"name\":\"GAME\",\"dbName\":null},{\"name\":\"HAREM\",\"dbName\":null},{\"name\":\"YAOI\",\"dbName\":null},{\"name\":\"YURI\",\"dbName\":null},{\"name\":\"TRAGEDY\",\"dbName\":null},{\"name\":\"CRIME\",\"dbName\":null},{\"name\":\"WESTERN\",\"dbName\":null},{\"name\":\"BIOGRAPHY\",\"dbName\":null},{\"name\":\"DOCUMENTARY\",\"dbName\":null},{\"name\":\"FAMILY\",\"dbName\":null},{\"name\":\"KIDS\",\"dbName\":null},{\"name\":\"ARTS\",\"dbName\":null},{\"name\":\"ANIME\",\"dbName\":null},{\"name\":\"SUPERHERO\",\"dbName\":null},{\"name\":\"FOLKLORE\",\"dbName\":null},{\"name\":\"ECOLOGICAL\",\"dbName\":null},{\"name\":\"ALTERNATIVE\",\"dbName\":null},{\"name\":\"LITRPG\",\"dbName\":null},{\"name\":\"CYBERPUNK\",\"dbName\":null},{\"name\":\"STEAMPUNK\",\"dbName\":null},{\"name\":\"GOTHIC\",\"dbName\":null},{\"name\":\"POST_APOCALYPTIC\",\"dbName\":null},{\"name\":\"HIGH_FANTASY\",\"dbName\":null},{\"name\":\"LOW_FANTASY\",\"dbName\":null},{\"name\":\"ARTSY\",\"dbName\":null},{\"name\":\"AUTOBIOGRAPHY\",\"dbName\":null},{\"name\":\"SLASHER\",\"dbName\":null},{\"name\":\"SUSPENSE\",\"dbName\":null},{\"name\":\"ROMANTIC_COMEDY\",\"dbName\":null},{\"name\":\"FANFICTION\",\"dbName\":null},{\"name\":\"COZY_MYSTERY\",\"dbName\":null},{\"name\":\"BODY_HORROR\",\"dbName\":null},{\"name\":\"ADULT_ANIMATION\",\"dbName\":null},{\"name\":\"POLITICAL\",\"dbName\":null},{\"name\":\"SCIENCE_FANTASY\",\"dbName\":null},{\"name\":\"ANARCHY\",\"dbName\":null},{\"name\":\"APOCALYPTIC\",\"dbName\":null},{\"name\":\"ZOMBIE\",\"dbName\":null},{\"name\":\"VILLAIN\",\"dbName\":null},{\"name\":\"MUSIC_DRAMA\",\"dbName\":null},{\"name\":\"FANTASY_ROMANCE\",\"dbName\":null},{\"name\":\"HISTORICAL_FICTION\",\"dbName\":null},{\"name\":\"SHAPESHIFTER\",\"dbName\":null},{\"name\":\"SWORD_AND_SORCERY\",\"dbName\":null},{\"name\":\"GUILTY_PLEASURE\",\"dbName\":null},{\"name\":\"ECO_FICTION\",\"dbName\":null},{\"name\":\"RELIGIOUS\",\"dbName\":null},{\"name\":\"EXPLORATION\",\"dbName\":null},{\"name\":\"WAR_DRAMA\",\"dbName\":null},{\"name\":\"ROAD_MOVIE\",\"dbName\":null},{\"name\":\"POLICE_PROCEDURAL\",\"dbName\":null},{\"name\":\"ANIMATED_COMEDY\",\"dbName\":null},{\"name\":\"LOVE_TRIANGLE\",\"dbName\":null},{\"name\":\"PSYCHIC\",\"dbName\":null},{\"name\":\"FANTASY_ADVENTURE\",\"dbName\":null},{\"name\":\"DARK_FANTASY\",\"dbName\":null},{\"name\":\"TERROR\",\"dbName\":null},{\"name\":\"WITCHCRAFT\",\"dbName\":null},{\"name\":\"SURVIVAL\",\"dbName\":null},{\"name\":\"UTOPIA\",\"dbName\":null},{\"name\":\"DYSTOPIA\",\"dbName\":null},{\"name\":\"GENDER_BENDER\",\"dbName\":null},{\"name\":\"TIME_TRAVEL\",\"dbName\":null},{\"name\":\"HIGH_SCHOOL\",\"dbName\":null},{\"name\":\"WAR_FANTASY\",\"dbName\":null},{\"name\":\"RAPE_REVENUE\",\"dbName\":null},{\"name\":\"MYSTICAL_REALISM\",\"dbName\":null},{\"name\":\"WUXIA\",\"dbName\":null},{\"name\":\"MYTHOLOGY\",\"dbName\":null},{\"name\":\"FRAGMENTED_NARRATIVE\",\"dbName\":null},{\"name\":\"DANCE\",\"dbName\":null},{\"name\":\"FANTASY_MYSTERY\",\"dbName\":null},{\"name\":\"INDIE\",\"dbName\":null},{\"name\":\"FOLK\",\"dbName\":null},{\"name\":\"ZANY\",\"dbName\":null},{\"name\":\"MONSTER\",\"dbName\":null},{\"name\":\"ALIEN\",\"dbName\":null},{\"name\":\"SPY\",\"dbName\":null},{\"name\":\"COOKING\",\"dbName\":null},{\"name\":\"ESCAPE_ROOM\",\"dbName\":null},{\"name\":\"SURVIVAL_HORROR\",\"dbName\":null},{\"name\":\"CULT_FAVORITE\",\"dbName\":null},{\"name\":\"DOCUMENTARY_FICTION\",\"dbName\":null},{\"name\":\"UNRELIABLE_NARRATOR\",\"dbName\":null},{\"name\":\"RANDOMIZED\",\"dbName\":null},{\"name\":\"EXTREME_SPORTS\",\"dbName\":null},{\"name\":\"DARK_COMEDY\",\"dbName\":null},{\"name\":\"TRAVEL\",\"dbName\":null},{\"name\":\"VINTAGE\",\"dbName\":null},{\"name\":\"FARM_LIFE\",\"dbName\":null},{\"name\":\"NATURE\",\"dbName\":null},{\"name\":\"HEROIC_FANTASY\",\"dbName\":null},{\"name\":\"LOVE_HATE\",\"dbName\":null},{\"name\":\"SLEEPY\",\"dbName\":null},{\"name\":\"POLITICAL_DRAMA\",\"dbName\":null},{\"name\":\"PARANORMAL_ROMANCE\",\"dbName\":null},{\"name\":\"LOVE_HURTS\",\"dbName\":null},{\"name\":\"GLOBAL\",\"dbName\":null},{\"name\":\"TRAILER\",\"dbName\":null}],\"dbName\":null},\"MediaType\":{\"values\":[{\"name\":\"ANIME\",\"dbName\":null},{\"name\":\"MOVIE\",\"dbName\":null},{\"name\":\"MANGA\",\"dbName\":null},{\"name\":\"VIDEO\",\"dbName\":null},{\"name\":\"POLL\",\"dbName\":null},{\"name\":\"STORE\",\"dbName\":null},{\"name\":\"STORAGE\",\"dbName\":null}],\"dbName\":null},\"navItems\":{\"values\":[{\"name\":\"OVERVIEW\",\"dbName\":null},{\"name\":\"DRIVE\",\"dbName\":null},{\"name\":\"VIDEOS\",\"dbName\":null},{\"name\":\"ANIME\",\"dbName\":null},{\"name\":\"MANGA\",\"dbName\":null},{\"name\":\"MOVIES\",\"dbName\":null},{\"name\":\"STORE\",\"dbName\":null},{\"name\":\"POLLS\",\"dbName\":null},{\"name\":\"STATS\",\"dbName\":null},{\"name\":\"SETTINGS\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

