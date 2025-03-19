import apiClient from "../axios";
import { Response } from "./common";

export interface ActivitySearch {
    keyword?: string
    firstType?: string
    secondType?: string
    province?: string
    city?: string
    startTime?: Date
    endTime?: Date
}

export interface Activity {
    id: number;
    userId: number;
    title: string;
    description: string;
    participationInstructions: string;
    chargeAmount: number;
    tag: string | null;
    acmedias: Acmedia[];
    activityAddresses: ActivityAddresses | null;
    favoritesNumber: number;
    currentUserFavorite: boolean;
    firstType: string;
    secondType: string;
    startTime: string;
    endTime: string;
}

export interface Acmedia {
    id: number;
    type: number;
    url: string;
    activityId: number;
    deletedSign: number;
    createdTime: string;
}

export interface ActivityAddresses {
    id: number;
    activityId: number;
    addressName: string;
    addressDetail: string;
    latitude: number;
    longitude: number;
    province: string;
    city: string;
    district: string;
    addressType: string;
    addressId: string;
    description: string;
    gaodeMapLink: string;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityParticipate {
    activityId:        number;
    eventDetailList:   ParticipatePerson[];
    participationTime: string;
}

export interface ParticipatePerson {
    name:        string;
    phoneNumber: string;
    idNumber:    string;
}

export function searchActivities(params: ActivitySearch) {
    return apiClient.put<Response<Activity[]>>('/search/activities', params)
}

export function getNearActivities() {
    return apiClient.get<Response<Activity[]>>('/activities/LocationBased')
}

export function getActicity(id) {
    return apiClient.get<Response<Activity>>(`/activities/${id}`)
}

export function addFav(id) {
    return apiClient.put<Response<any>>(`/activities/favorite/${id}`)
}

export function removeFav(id) {
    return apiClient.delete<Response<any>>(`/activities/unfavorite/${id}`)
}

export function participateActivity(payload: ActivityParticipate) {
    return apiClient.post<Response<number>>('/activities/activityChargeEvent/', payload)
}
