---
title: "Android Activity - Summary"
date: 2020-03-10
last_modified_at: 2020-03-10
desc: "안드로이드 Activity 정리"
keywords: "Android,Activity,Summary"
permalink: "/android/activity-summary"
categories: 
    - Android
tags: 
    - Android
    - Activity
    - Summary
---

## Activity 

안드로이드의 Activity는 한 앱이 다른 앱을 호출할 때 호출 앱은 다른 앱을 전체적으로 호출하는 것이 아니라 _다른 앱의 Activity를_ 호출한다. Activity는 이러한 패러다임으로 설계되었으며, 앱과 사용자의 상호작용을 담당한다.

## Activity 라이프사이클(Activity Lifecycle)

안드로이드 Activity는 아래와 같은 라이프사이클을 가지고 있다.

* onCreate - Activity가 생성될 때 대부분 한번만 호출되는 콜백이다. 초기 셋팅은 물론 _setContentView()_ 를 이용한 레이아웃 정의도 이곳에서 진행된다.
* onStart - Activity가 _시작상태_ 로 전환되어 사용자에게 표시 된다.
* onResume - Activity가 사용자와 상호작용을 시작하기 직전에 호출된다.
* onPause - Activity가 포커스를 잃고 _일시중지상태_ 로 전환될 때 호출되는 콜백이다. Activity가 사용자에게 여전히 표시되지만 대체로 사용자가 떠나는 중이며 있으며 조만간 _중지상태_, _재개상태_ 상태로 전환됨을 의미한다.
> onPause 콜백에서는 네트워크 호출, 데이터베이스 트랜잭션 실행을 하면 안된다.
* onStop - 사용자에게 Activity가 더이상 표시되지 않을 때 나타나는 콜백이다. 이 때 Activity는 제거 중이거나, 새로운 Activity가 시작 중이거나, 기존 Activity가 _재개상태_ 로 전환임을 의미한다.
* onRestart - _중지상태_ 의 Activity가 다시 시작되려고 할 때 이 콜백이 호출된다.
* onDestroy - Activity가 제거되기 전에 이 콜백이 호출된다. 이 콜백에서는 Activity에서 사용하는 모든 리소스를 해제해야 한다.
> 시스템이 메모리 공간을 필요하게 되면 프로세스의 우선순위에 따라 프로세스가 종료된다. 그렇기 때문에 _onDestroy_ 콜백이 호출되지 않을 수 있다.

위와 같은 Activity 라이프사이클을 적절하게 구현해야 아래와 같은 문제를 방지할 수 있다.

1. 사용자가 앱을 사용하는 도중에 전화가 걸려오거나 다른 앱으로 전환할 때 비정상 종료됩니다.
2. 사용자가 앱을 활발하게 사용하지 않는 경우, 소중한 시스템 리소스가 소비됩니다.
3. 사용자가 앱에서 나갔다가 나중에 돌아왔을 때 사용자의 진행 상태가 손실됩니다.
4. 화면이 가로 방향과 세로 방향 간에 회전할 경우, 비정상 종료되거나 사용자의 진행 상태가 손실됩니다.

> 더 자세한 내용은 [도큐먼트](https://developer.android.com/guide/components/activities/activity-lifecycle)를 참조하자.

## Activity와 메모리(Activity and Memory)

시스템은 메모리가 필요할 때 프로세스를 종료한다. 시스템이 특정 프로세스의 상태에 따라 종료 우선순위가 결정되며 그리고 프로세스 상태는 Activity의 상태에 따라 달라진다. 아래의 표는 시스템이 프로세스를 종료할 가능성 사이에 상관관계를 나타낸다.

| 강제종료될 가능성 | 프로세스 상태 | Activity 상태 |
|:--------:|:-------:|:--------:|
| 최소   | 포그라운드   | Created<br/>Started <br/> resumed   |
| 높음   | 백그라운드(포커스 상실)   | Paused   |
| 최대   | 백그라운드(보이지 않음)<br/>비어 있음   | Stoped<br/>Destroyed  |

시스템은 메모리 공간을 확보하기 위해 절대 Activity를 직접 종료하지 않는다. 그 대신 Activity를 실행하는 프로세스를 종료하여 Activity뿐만 아니라 프로세스에서 실행되는 다른 모든 작업을 함께 종료한다.

## 인스턴스 상태(Instance State)

Activity가 시스템 제약으로 인해 종료될 경우, 실제 Activity 인스턴스는 사라지더라도 시스템에 존재했다는 정보는 남아있는다. 사용자가 다시 Activity로 돌아가려고 시도하는 경우 시스템은 Activity의 상태를 나타내는 저장된 데이터 셋을 사용하여 해당 Activity의 새로운 인스턴스를 생성하는데 *시스템이 이전 상태를 복원하기 위해 사용하는 저장된 데이터를 인스턴스 상태* 라고 한다.

## UI 상태 보존

사용자는 화면이 회전되거나 멀티 윈도우 모드로 전환되는 경우에도 UI의 상태가 그대로 유지되기를 기대한다. 그러나 안드로이드 에서 이러한 구성변경이 일어나면 _Activity를 종료시켜 Activity 인스턴스에 저장된 모든 UI 상태를 제거_ 한다. 이러한 경우 _onSaveInstanceState()_ 메소드와 _Android ViewModel_ 클래스 및 _Room_ 같은 로컬 데이터베이스를 사용하여 UI 상태를 임시로 보존해야 한다.