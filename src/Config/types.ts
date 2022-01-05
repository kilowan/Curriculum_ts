export interface base {
  id: number;
}
export interface CurriculumDetail extends base{
    curriculumName: string;
    fullName: string;
    description: string;
    phoneNumber: PhoneNumber;
    email: Email;
    experience: Array<Experience>;
    otherTraining: Array<Training>;
    academicTraining: Array<Training>;
    languageList: Array<Language>;
    socialMedia: Array<SocialMedia>;
    otherData: Array<OtherData>;
  }
  export interface Curriculum extends base {
    curriculumName: string;
    curriculumId: number;
  }
  export interface PhoneNumber extends base {
    number: number;
    prefix: string;
  }
  export interface Email extends base {
    mailName: string;
    domain: string;
    fullEmail: string;
  }
  export interface Experience extends base {
    name: string;
    type: number;
    place: string;
    initDate?: string;
    finishDate?: string;
    contracts: Array<Contract>;
  }
  export interface Contract extends base {
    name: string;
    projects: Array<Project>;
  }
  export interface Project extends base {
    name: string;
    descriptionList: Array<string>;
  }
  export interface Training extends base {
    name: string;
    type: number;
    place: string;
    initDate?: string;
    finishDate?: string;
    graduationDate?: string;
    contents: Array<Content>;
  }
  export interface Content extends base {
    name: string;
    edit: boolean;
    subContents: Array<SubContent>;
  }
  export interface SubContent extends base {
    name: string;
  }
  export interface Language extends base {
    name: string;
    level: LanguageLevel;
  }
  export interface LanguageLevel extends base {
    name: string;
  }
  export interface SocialMedia extends base {
    name: string;
    type: number;
  }
  export interface OtherData extends base {
    name: string;
    values: Array<string>;
  }
  export interface Credentials extends base {
    username: string;
    password: string;
  }

  export interface User {
    userId: number;
    name: string;
    surname1: string;
    surname2: string;
    credentials: Credentials;
    phoneNumbers: Array<PhoneNumber>;
    emailList: Array<Email>;
  }
  export enum ContentType {
    Academic,
    Complementary,
  }
  export enum SocialMediaType {
    Linkedin = 1,
    Infojobs = 2,
    GitHub = 3,
  }
  export enum ExperienceType {
    personal = 1,
    professional = 2
  }
  export enum TrainingType {
    academic = 1,
    other = 2
  }