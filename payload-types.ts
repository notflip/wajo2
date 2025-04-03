/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    pages: Page;
    cases: Case;
    redirects: Redirect;
    users: User;
    posts: Post;
    postCategories: PostCategory;
    media: Media;
    sharedBlocks: SharedBlock1;
    submissions: Submission;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    cases: CasesSelect1<false> | CasesSelect1<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    postCategories: PostCategoriesSelect<false> | PostCategoriesSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    sharedBlocks: SharedBlocksSelect<false> | SharedBlocksSelect<true>;
    submissions: SubmissionsSelect<false> | SubmissionsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    settings: Setting;
    blogSettings: BlogSetting;
    navigation_main: NavigationMain;
    footer: Footer;
  };
  globalsSelect: {
    settings: SettingsSelect<false> | SettingsSelect<true>;
    blogSettings: BlogSettingsSelect<false> | BlogSettingsSelect<true>;
    navigation_main: NavigationMainSelect<false> | NavigationMainSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  /**
   * ✋ Het wijzigen van de slug na publicatie kan bestaande links breken en zorgt ervoor dat bezoekers of zoekmachines de pagina niet meer kunnen vinden.
   */
  slug?: string | null;
  _collection?: string | null;
  path?: string | null;
  /**
   * Dit is de titel van de pagina
   */
  title: string;
  blocks?: (Hero | Image | Paragraph | Cards | Cases | FeatureRows | CtaBlock | SharedBlock)[] | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  parent?: (number | null) | Page;
  breadcrumbs?:
    | {
        doc?: (number | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Hero".
 */
export interface Hero {
  title: string;
  content: string;
  links?:
    | {
        link: {
          type: 'reference' | 'custom';
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: number | Page;
          } | null;
          url?: string | null;
          label?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  textAlign?: ('left' | 'center') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Image".
 */
export interface Image {
  /**
   * Dit veld is een landschap afbeelding, de afbeelding die je hier upload moet in een landschap formaat zijn
   */
  image: number | Media;
  callout?: {
    content?: string | null;
    link?: (number | null) | Case;
    image?: (number | null) | Media;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'image';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  blurhash?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cases".
 */
export interface Case {
  id: number;
  /**
   * ✋ Het wijzigen van de slug na publicatie kan bestaande links breken en zorgt ervoor dat bezoekers of zoekmachines de pagina niet meer kunnen vinden.
   */
  slug?: string | null;
  title: string;
  image: number | Media;
  callout?: {
    content?: string | null;
    image?: (number | null) | Media;
  };
  tags?: ('copywriting' | 'webdevelopment' | 'webdesign' | 'marketing')[] | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Paragraph".
 */
export interface Paragraph {
  badge: string;
  content: string;
  bgColor?: ('transparent' | 'beige') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'paragraph';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Cards".
 */
export interface Cards {
  items?:
    | {
        icon: string;
        title: string;
        text: string;
        id?: string | null;
      }[]
    | null;
  bgColor?: ('transparent' | 'beige') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'cards';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Cases".
 */
export interface Cases {
  badge: string;
  title: string;
  link: {
    type: 'reference' | 'custom';
    newTab?: boolean | null;
    reference?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
    url?: string | null;
    label?: string | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'cases';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeatureRows".
 */
export interface FeatureRows {
  items?:
    | {
        icon: string;
        title: string;
        text: string;
        id?: string | null;
      }[]
    | null;
  bgColor?: ('transparent' | 'beige' | 'gray') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'featureRows';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CtaBlock".
 */
export interface CtaBlock {
  /**
   * Indien dit ingevuld is, komt deze kleine titel boven de hoofd titel in een kader staan
   */
  subtitle?: string | null;
  title: string;
  text: string;
  image?: (number | null) | Media;
  link: {
    type: 'reference' | 'custom';
    newTab?: boolean | null;
    reference?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
    url?: string | null;
    label?: string | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'ctaBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SharedBlock".
 */
export interface SharedBlock {
  block: number | SharedBlock1;
  id?: string | null;
  blockName?: string | null;
  blockType: 'shared';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sharedBlocks".
 */
export interface SharedBlock1 {
  id: number;
  title?: string | null;
  blocks: CtaBlock[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: number;
  /**
   * Redirect pad, startende met een slash
   */
  from: string;
  to: string;
  type: '301' | '302';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  avatar?: (number | null) | Media;
  role: 'admin' | 'user';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  /**
   * ✋ Het wijzigen van de slug na publicatie kan bestaande links breken en zorgt ervoor dat bezoekers of zoekmachines de pagina niet meer kunnen vinden.
   */
  slug?: string | null;
  title: string;
  description: string;
  category: number | PostCategory;
  author: number | User;
  publishedAt?: string | null;
  heroImage: number | Media;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  readingTime?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "postCategories".
 */
export interface PostCategory {
  id: number;
  /**
   * ✋ Het wijzigen van de slug na publicatie kan bestaande links breken en zorgt ervoor dat bezoekers of zoekmachines de pagina niet meer kunnen vinden.
   */
  slug?: string | null;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "submissions".
 */
export interface Submission {
  id: number;
  form: string;
  data:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'cases';
        value: number | Case;
      } | null)
    | ({
        relationTo: 'redirects';
        value: number | Redirect;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'postCategories';
        value: number | PostCategory;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'sharedBlocks';
        value: number | SharedBlock1;
      } | null)
    | ({
        relationTo: 'submissions';
        value: number | Submission;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  slug?: T;
  _collection?: T;
  path?: T;
  title?: T;
  blocks?:
    | T
    | {
        hero?: T | HeroSelect<T>;
        image?: T | ImageSelect<T>;
        paragraph?: T | ParagraphSelect<T>;
        cards?: T | CardsSelect<T>;
        cases?: T | CasesSelect<T>;
        featureRows?: T | FeatureRowsSelect<T>;
        ctaBlock?: T | CtaBlockSelect<T>;
        shared?: T | SharedBlockSelect<T>;
      };
  seo?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Hero_select".
 */
export interface HeroSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  links?:
    | T
    | {
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  textAlign?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Image_select".
 */
export interface ImageSelect<T extends boolean = true> {
  image?: T;
  callout?:
    | T
    | {
        content?: T;
        link?: T;
        image?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Paragraph_select".
 */
export interface ParagraphSelect<T extends boolean = true> {
  badge?: T;
  content?: T;
  bgColor?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Cards_select".
 */
export interface CardsSelect<T extends boolean = true> {
  items?:
    | T
    | {
        icon?: T;
        title?: T;
        text?: T;
        id?: T;
      };
  bgColor?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Cases_select".
 */
export interface CasesSelect<T extends boolean = true> {
  badge?: T;
  title?: T;
  link?:
    | T
    | {
        type?: T;
        newTab?: T;
        reference?: T;
        url?: T;
        label?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeatureRows_select".
 */
export interface FeatureRowsSelect<T extends boolean = true> {
  items?:
    | T
    | {
        icon?: T;
        title?: T;
        text?: T;
        id?: T;
      };
  bgColor?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CtaBlock_select".
 */
export interface CtaBlockSelect<T extends boolean = true> {
  subtitle?: T;
  title?: T;
  text?: T;
  image?: T;
  link?:
    | T
    | {
        type?: T;
        newTab?: T;
        reference?: T;
        url?: T;
        label?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SharedBlock_select".
 */
export interface SharedBlockSelect<T extends boolean = true> {
  block?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cases_select".
 */
export interface CasesSelect1<T extends boolean = true> {
  slug?: T;
  title?: T;
  image?: T;
  callout?:
    | T
    | {
        content?: T;
        image?: T;
      };
  tags?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?: T;
  type?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  avatar?: T;
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  description?: T;
  category?: T;
  author?: T;
  publishedAt?: T;
  heroImage?: T;
  content?: T;
  readingTime?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "postCategories_select".
 */
export interface PostCategoriesSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  blurhash?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        og?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sharedBlocks_select".
 */
export interface SharedBlocksSelect<T extends boolean = true> {
  title?: T;
  blocks?:
    | T
    | {
        ctaBlock?: T | CtaBlockSelect<T>;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "submissions_select".
 */
export interface SubmissionsSelect<T extends boolean = true> {
  form?: T;
  data?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings".
 */
export interface Setting {
  id: number;
  website_title: string;
  /**
   * Naar deze e-mail adressen worden de contact- en afspraak aanvragen verzonden. Dit e-mail adres wordt ook getoond in de footer en doorheen de website. Het eerste e-mail adres is het primaire e-mail adres.
   */
  website_emails?:
    | {
        email: string;
        id?: string | null;
      }[]
    | null;
  website_phone: string;
  logo: number | Media;
  /**
   * Voeg hier de URL van je sociale media platformen toe. Bijvoorbeeld: https://www.instagram.com/naam-van-je-account
   */
  social_links?:
    | {
        url: string;
        id?: string | null;
      }[]
    | null;
  seo: {
    description: string;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogSettings".
 */
export interface BlogSetting {
  id: number;
  title: string;
  description: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation_main".
 */
export interface NavigationMain {
  id: number;
  items?:
    | {
        type: 'single' | 'list' | 'megamenu';
        label: string;
        reference?: {
          relationTo: 'pages';
          value: number | Page;
        } | null;
        columns?:
          | {
              label: string;
              description?: string | null;
              links: {
                label: string;
                reference: {
                  relationTo: 'pages';
                  value: number | Page;
                };
                id?: string | null;
              }[];
              id?: string | null;
            }[]
          | null;
        links?:
          | {
              label: string;
              reference: {
                relationTo: 'pages';
                value: number | Page;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  privacyPolicyLink?: {
    relationTo: 'pages';
    value: number | Page;
  } | null;
  cookiePolicyLink?: {
    relationTo: 'pages';
    value: number | Page;
  } | null;
  termsAndConditionsLink?: {
    relationTo: 'pages';
    value: number | Page;
  } | null;
  columns?:
    | {
        title: string;
        links?:
          | {
              link: {
                type: 'reference' | 'custom';
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: number | Page;
                } | null;
                url?: string | null;
                label?: string | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings_select".
 */
export interface SettingsSelect<T extends boolean = true> {
  website_title?: T;
  website_emails?:
    | T
    | {
        email?: T;
        id?: T;
      };
  website_phone?: T;
  logo?: T;
  social_links?:
    | T
    | {
        url?: T;
        id?: T;
      };
  seo?:
    | T
    | {
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogSettings_select".
 */
export interface BlogSettingsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation_main_select".
 */
export interface NavigationMainSelect<T extends boolean = true> {
  items?:
    | T
    | {
        type?: T;
        label?: T;
        reference?: T;
        columns?:
          | T
          | {
              label?: T;
              description?: T;
              links?:
                | T
                | {
                    label?: T;
                    reference?: T;
                    id?: T;
                  };
              id?: T;
            };
        links?:
          | T
          | {
              label?: T;
              reference?: T;
              id?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  privacyPolicyLink?: T;
  cookiePolicyLink?: T;
  termsAndConditionsLink?: T;
  columns?:
    | T
    | {
        title?: T;
        links?:
          | T
          | {
              link?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    reference?: T;
                    url?: T;
                    label?: T;
                  };
              id?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}