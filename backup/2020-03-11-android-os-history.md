---
title: "Android OS history"
date: 2020-03-11
last_modified_at: 2020-03-11
desc: "안드로이드 OS history"
keywords: "Android,OS"
permalink: "/android/os"
categories: 
    - Android
tags: 
    - Android
    - OS
---

# Android OS 히스토리

## 킷캣 4.4 

ART(Android RunTime) 시험적 추가

## 롤리팝 5.0

ART(Android RunTime) 정식 적용
 * AOT(Ahead-of-time) 컴파일 
 * GC 개선
 * 디버그 지원 개선

머티리얼 디자인 적용

앱이 API 21 이상을 대상으로 하는 경우 MixedContents, ThirdPartyCookies를 기본적으로 차단 한다. (21 미만의 경우는 허용)

## 마시멜로우 6.0

런타임 권한 적용

Doze 모드, 앱 대기 모드 추가

 * Doze 모드 - 충전상태가 아니고 화면이 꺼져있는 경우 앱은 Doze 모드로 진입 한다. 이 때 앱은 절전모드를 계속 유지하게 된다. 이 모드에서는 주기적으로 보류된 작업을 실행하여 앱 동기화 작업을 진행한다.
 * 앱 대기 모드 - 시스템은 일정시간 사용자와 상호작용 없는 앱의 경우 idle 상태로 진입하게 된다. 디바이스가 충전중이 아닌 경우 네트워크 호출을 비활성화 하며, 앱이 idle 상태로 진입할 경우 동기화 작업을 중단한다.

Apache HTTP 클라이언트 제거


## 누가 7.0

Doze 모드 강화 
백그라운드 최적화 
 > CONNECTIVITY_ACTION, ACTION_NEW_PICTURE, ACTION_NEW_VIDEO 브로드캐스트를 더이상 수신할 수 없게 변경 되었다. 

## 오레오 8.0

백그라운드 서비스 제한
노티피케이션 채널 추가
HTTP 사용 제한

## 파이 9.0

백그라운드 센서 제한
포그라운드 서비스 권한 

## Q 10.0

스코프 스토리지
백그라운드 로케이션 퍼미션
백그라운드에서 Activity 실행 제한

