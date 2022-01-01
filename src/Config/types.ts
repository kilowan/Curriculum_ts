export interface CurriculumDetail extends ObjectConstructor{
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
  export interface Curriculum extends ObjectConstructor{
    curriculumName: string;
    curriculumId: number;
  }
  export interface PhoneNumber extends ObjectConstructor {
    number: number;
    prefix: string;
  }
  export interface Email extends ObjectConstructor {
    mailName: string;
    domain: string;
    fullEmail: string;
  }
  export interface Experience extends ObjectConstructor {
    id: number;
    name: string;
    type: number;
    place: string;
    initDate?: string;
    finishDate?: string;
    contracts: Array<Contract>;
  }
  export interface Contract extends ObjectConstructor {
    name: string;
    projects: Array<Project>;
  }
  export interface Project extends ObjectConstructor {
    name: string;
    descriptionList: Array<string>;
  }
  export interface Training extends ObjectConstructor {
    id: number;
    name: string;
    type: number;
    place: string;
    initDate?: string;
    finishDate?: string;
    graduationDate?: string;
    contents: Array<Content>;
  }
  export interface Content extends ObjectConstructor {
    id: number;
    name: string;
    edit: boolean;
    subContents: Array<SubContent>;
  }
  export interface SubContent extends ObjectConstructor {
    name: string;
    id: number;
  }
  export interface Language extends ObjectConstructor {
    name: string;
    level: string;
  }
  export interface SocialMedia extends ObjectConstructor {
    name: string;
    type: number;
  }
  export interface OtherData {
    name: string;
    values: Array<string>;
  }
  export interface Credentials {
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