import { debouncePromise } from "@/utils";
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
    firstType: '线上' | '线下';
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

export interface ActivityParticipateDTO {
    activityId: number;
    eventDetailList: ParticipatePerson[];
    participationTime: string;
}

export interface ParticipatePerson {
    name: string;
    phoneNumber: string;
    idNumber: string;
}

export interface ActivityParticipateDetail {
    id: number
    activityId: number
    userId: number
    chargeAmount: number
    eventDetailList: ActivityParticipatePerson[]
    participationTime: string
    status: '待确认' | '已确认' | '已取消'
    orderNumber: string
    createdTime: string
}

export interface ActivityParticipatePerson extends ParticipatePerson {
    id: number
    eventId: number
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

export function participateActivityPaid(payload: ActivityParticipateDTO) {
    return apiClient.post<Response<number>>('/activities/activityChargeEvent', payload)
}

export function participateActivityFree(payload: ActivityParticipateDTO) {
    return apiClient.post<Response<ActivityParticipateDetail>>('/activities/activityEvent', payload)
}

export function participateActivityOnline(id) {
    return apiClient.put<Response<string>>('/activities/link', null, { params: { id } })
}

export function confirmActivityPay(invoiceId) {
    return apiClient.put<Response<ActivityParticipateDetail>>('/activities/activityEvent/charge', null, { params: { id: invoiceId } })
}

export function getParticipatedActivities() {
    return apiClient.get<Response<ActivityParticipateDetail[]>>('/activities/activityEvent')
}

export function getParticipateDetails(id) {
    return getParticipatedActivities().then(r => r.data.data?.filter(x => x.activityId == id))
}

export function cancelParticipateActivity(id) {
    return apiClient.delete<Response<ActivityParticipateDetail[]>>('/activities/activityEvent', { params: { id } })
}
