import { InputHTMLAttributes, ReactNode } from "react";

export interface IMyButton {
    children: string;
    props?: {
        diabled: boolean;
        (e: React.SyntheticEvent): void;
    }
}

export interface MyButtonProps {
    children: string;
    type: 'submit' | 'reset' | 'button';
    className: string;
    handler?: () => void | null;
  }

export type MyInputProps = InputHTMLAttributes<HTMLInputElement>;

export interface IHeader {
    children: ReactNode | ReactNode[];
} 

export interface IContentCard {
    id: string;
    title: string;
    image: string;
    content: string
}

export interface ILoggedInToolbarProps {
    userName: string;
    userAvatar: string;
    logoutHandler: () => void;
}

export interface ISubmittedUserInfo {
    userLogin: string;
    userPassword: string;
}

export interface ISubmittedProfileInfo {
    userProfile: string | null;
}

export interface IUserData {
    id: string;
    login: string;
    name: string;
    avatar: string;
} 

export interface IHandleSubmit {
    handleSumbit: (data: ISubmittedUserInfo) => void
}

export interface INews {
    id: string;
    title: string;
    image: string;
    content: string;
}