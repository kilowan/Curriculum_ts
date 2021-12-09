export interface Curriculum extends ObjectConstructor{
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
    name: string;
    type: number;
    place: string;
    initDate?: Date;
    finishDate?: Date;
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
    name: string;
    type: number;
    place: string;
    initDate?: Date;
    finishDate?: Date;
    graduationDate?: Date;
    contents: Array<Content>;
  }
  export interface Content extends ObjectConstructor {
    name: string;
    subContents: Array<SubContent>;
  }
  export interface SubContent extends ObjectConstructor {
    name: string;
    subContents: Array<string>;
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