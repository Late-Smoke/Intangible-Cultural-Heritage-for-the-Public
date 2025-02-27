import * as Posts from './api/posts'
import * as Comments from './api/comments'
import * as Activity from './api/activity'

// @ts-nocheck

export const Post: Posts.Post = {
    createdTime: '2025-02-20T14:07:53',
    "id": 3,
    "category": "资讯",
    "title": "非遗文化之美",
    "content": "今天，我们来探讨一下神经病非物质文化遗产的独特魅力……",
    "userId": 3,
    "nickName": "哈哈哈",
    "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
    "sex": 0,
    "userType": 3,
    "tag": null,
    "views": 0,
    "likes": 0,
    "favorite": 0,
    "comments": 0,
    "urls": [
        {
            "type": 0,                                //0代表图片
            "url": "https://example.com/image1.jpg",
            "postId": 3,
            "deletedSign": 0,
            "createdTime": "2025-02-20T14:07:53"
        },
        {
            "type": 1,                               //1代表视频
            "url": "https://example.com/video1.mp4",
            "postId": 3,
            "deletedSign": 0,
            "createdTime": "2025-02-20T14:07:53"
        }
    ],
    "currentUserLike": false,
    currentUserFavorite: true,
}


export const Comment: Comments.Comment[] = [
    {
        "id": 22,
        "postId": 20,
        "parentId": null,
        "rootCommentId": null,
        "userId": 23,
        "nickName": "可可学打铁花",
        "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
        "content": "这篇写得好",
        "status": 1,
        "likes": 0,
        "disLikes": 0,
        "createdTime": "2025-02-25T00:53:35",
        "children": []
    },
    {
        "id": 23,
        "postId": 20,
        "parentId": null,
        "rootCommentId": null,
        "userId": 3,
        "nickName": "可可学打铁花",
        "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
        "content": "这篇写得好",
        "status": 1,
        "likes": 0,
        "disLikes": 0,
        "createdTime": "2025-02-25T00:53:38",
        "children": [
            {
                "id": 24,
                "postId": 20,
                "parentId": 23,
                "rootCommentId": 23,
                "userId": 3,
                "nickName": "可可学打铁花",
                "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
                "content": "哈哈",
                "status": 2,
                "likes": 0,
                "disLikes": 0,
                "createdTime": "2025-02-25T00:54:30",
                "children": [
                    {
                        "id": 26,
                        "postId": 20,
                        "parentId": 24,
                        "rootCommentId": 24,
                        "userId": 23,
                        "nickName": "可可学打铁花",
                        "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
                        "content": "哈哈",
                        "status": 2,
                        "likes": null,
                        "disLikes": null,
                        "createdTime": "2025-02-25T00:55:52",
                        "children": null
                    }
                ]
            },
            {
                "id": 24,
                "postId": 20,
                "parentId": 24,
                "rootCommentId": 23,
                "userId": 3,
                "nickName": "可可学打铁花",
                "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
                "content": "哈哈",
                "status": 2,
                "likes": 0,
                "disLikes": 0,
                "createdTime": "2025-02-25T00:54:30",
                "children": [
                    {
                        "id": 26,
                        "postId": 20,
                        "parentId": 24,
                        "rootCommentId": 24,
                        "userId": 23,
                        "nickName": "可可学打铁花",
                        "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
                        "content": "哈哈",
                        "status": 2,
                        "likes": null,
                        "disLikes": null,
                        "createdTime": "2025-02-25T00:55:52",
                        "children": null
                    }
                ]
            }
        ]
    },
    {
        "id": 25,
        "postId": 20,
        "parentId": null,
        "rootCommentId": null,
        "userId": 23,
        "nickName": "可可学打铁花",
        "avatarUrl": "https://hmleadnewshaha.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg",
        "content": "哈哈",
        "status": 1,
        "likes": 0,
        "disLikes": 0,
        "createdTime": "2025-02-25T00:54:51",
        "children": []
    }
]


export const Activities: Activity.Activity[] = [
    {
        "id": 7,
        "userId": 3,
        "title": "艺术展览活动",
        "description": "这是一个关于现代艺术的展览活动，欢迎各位艺术爱好者前来参观。",
        "participationInstructions": "请提前预约哈哈，携带身份证，并出示相关凭证，活动期间请遵守现场秩序。",
        "chargeAmount": 50,
        "tag": '这是什么啊 啊？',
        "acmedias": [
            {
                "id": 7,
                "type": 0,
                "url": "http://example.com/images/art1.jpg",
                "activityId": 7,
                "deletedSign": 0,
                "createdTime": "2025-02-22T06:56:17"
            },
            {
                "id": 8,
                "type": 1,
                "url": "http://example.com/videos/art1.mp4",
                "activityId": 7,
                "deletedSign": 0,
                "createdTime": "2025-02-22T06:56:17"
            }
        ],
        "activityAddresses": {
            "id": 1,
            "activityId": 7,
            "addressName": "北京艺术馆",
            "addressDetail": "北京市朝阳区艺术路1号",
            "latitude": 39.9042,
            "longitude": 116.4074,
            "province": "北京市",
            "city": "北京市",
            "district": "朝阳区",
            "addressType": "展览馆",
            "addressId": "B000A8XF08",
            "description": "北京艺术馆位于北京市朝阳区，交通便利。",
            "gaodeMapLink": "https://uri.amap.com/marker?position=116.4074,39.9042&name=北京艺术馆&src=mypage&coordinate=gaode&callnative=1",
            "createdAt": "2025-02-22T06:56:17",
            "updatedAt": "2025-02-22T06:56:17"
        },
        "favoritesNumber": 1,
        "currentUserFavorite": true,
        "firstType": "线下展览",
        "secondType": "非遗展览",
        "startTime": "2025-03-01T10:00:00",
        "endTime": "2025-03-01T18:00:00"
    },
    {
        "id": 5,
        "userId": 3,
        "title": "非遗文化展览活动无图片视频",
        "description": "本次展览将展示多种非物质文化遗产，包括传统手工艺、民间艺术和传统音乐等。",
        "participationInstructions": "请提前预约，活动当天携带有效证件入场。",
        "chargeAmount": null,
        "tag": null,
        "acmedias": [],
        "activityAddresses": null,
        "favoritesNumber": 1,
        "currentUserFavorite": true,
        "firstType": "线下展览",
        "secondType": "非遗展览",
        "startTime": "2025-02-21T09:00:00",
        "endTime": "2025-02-25T17:00:00"
    },
    {
        "id": 3,
        "userId": 3,
        "title": "非遗文化展览活动第二版",
        "description": "本次展览将展示多种非物质文化遗产，包括传统手工艺、民间艺术和传统音乐等。",
        "participationInstructions": "请提前预约，活动当天携带有效证件入场。",
        "chargeAmount": null,
        "tag": null,
        "acmedias": [
            {
                "id": 5,
                "type": 0,
                "url": "https://example.com/images/heritage1.jpg",
                "activityId": 3,
                "deletedSign": 0,
                "createdTime": "2025-02-21T08:24:13"
            },
            {
                "id": 6,
                "type": 1,
                "url": "https://example.com/videos/heritage1.mp4",
                "activityId": 3,
                "deletedSign": 0,
                "createdTime": "2025-02-21T08:24:13"
            }
        ],
        "activityAddresses": null,
        "favoritesNumber": 1,
        "currentUserFavorite": true,
        "firstType": "线下展览",
        "secondType": "非遗展览",
        "startTime": "2025-02-21T09:00:00",
        "endTime": "2025-02-25T17:00:00"
    },
    {
        "id": 1,
        "userId": 3,
        "title": "非遗文化展览活动",
        "description": "本次展览将展示多种非物质文化遗产，包括传统手工艺、民间艺术和传统音乐等。",
        "participationInstructions": "请提前预约，活动当天携带有效证件入场。",
        "chargeAmount": null,
        "tag": null,
        "acmedias": [
            {
                "id": 1,
                "type": 0,
                "url": "https://example.com/images/heritage1.jpg",
                "activityId": 1,
                "deletedSign": 0,
                "createdTime": "2025-02-21T08:11:41"
            },
            {
                "id": 2,
                "type": 1,
                "url": "https://example.com/videos/heritage1.mp4",
                "activityId": 1,
                "deletedSign": 0,
                "createdTime": "2025-02-21T08:11:41"
            }
        ],
        "activityAddresses": null,
        "favoritesNumber": 0,
        "currentUserFavorite": false,
        "firstType": "线下展览",
        "secondType": "非遗展览",
        "startTime": "2025-02-21T09:00:00",
        "endTime": "2025-02-25T17:00:00"
    }
]
