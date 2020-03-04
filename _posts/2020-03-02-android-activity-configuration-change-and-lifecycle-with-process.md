---
title: "Android Activity State change and processes with lifecycle"
date: 2020-03-02
last_modified_at: 2020-03-04
desc: "안드로이드 상태변경과 라이프사이클와 프로세스의 상관관계"
keywords: "Android,Process with lifecycle,State change"
permalink: "/android/state-change-and-process"
categories: 
    - Android
tags: 
    - Android
    - Process
    - State change
    - Process with lifecycle
---

# Activity 상태변경(State Change)

사용자 트리거, 시스템 트리거 이벤트는 Activity가 한 상태에서 다른 상태로 전환되는 원인이 될 수 있다. 그러한 전환이 발생하는 몇 가지 일반적인 사례와, 어떻게 처리할 수 있는지 살펴보자.

## Activity 설정변경(Configuration change)

설정변경 예제 중 가장 베스트 예제는 가로, 세로 변경일 것이다. 이 밖의 예제는 언어 변경이나, 입력 장치 삽입일 것이다. 앞의 포스트에서 보았듯이 설정변경이 일어나면 Activity는 파괴됐다가 재생성 된다. 기존의 Activity는 _onPause()_, _onStop()_, _onDestroy()_ 콜백이 순서대로 발생하며 종료되고, _onCreate()_, _onStart()_, _onResume()_ 콜백이 순서대로 발생하며 Activity의 새로운 인스턴스가 만들어진다.

> 안드로이드 ViewModel, onSaveInstanceState() 메소드와 Room 같은 local database를 같이 사용하면 설정변경에 영향받지 않고 Activity의 상태를 보호할 수 있다. 어떻게 앞의 컴포넌트를 결합할 것인지 결정하는 것은 UI 데이터의 복잡성, 앱의 사용 방법 및 검색 속도와 메모리 사용량 비교에 따라 결정된다.

## Activity Foreground

새로운 Activity가 foreground에 나타나게 되면 이전에 있던 Activity는 새로운 Activity에 **부분적으로 가려지면** 포커스를 잃게 되면서 일시정지 상태로 들어가며 시스템은 _onPause()_ 콜백을 호출한다. 만약 이 상태에서 새로운 Activity가 종료되어 이전 Activity가 foreground에 나타나게 되면 _onResume()_ 콜백이 호출된다.

새로운 Activity가 foreground에 나타나게 되면 이전에 있던 Activity는 새로운 Activity에 **완전히 가려지면** 포커스를 잃게 되면서 정지 상태로 들어가며 시스템은 _onStop()_ 콜백을 호출한다. 

만약 이 상태에서 새로운 Activity가 종료되어 이전 Activity가 foreground에 나타나게 되면 시스템은 _onRestart()_, _onStart()_, _onResume()_ 콜백이 호출된다. 만약 덮여 있는 Activity의 인스턴스가 **새로운 Activity 인스턴스**로 시작되는 경우 _onRestart()_ 콜백은 호출되지 않는다.

## User taps Back button

사용자가 백버튼을 눌러 Activity를 종료할 경우 _onPause()_, _onStop()_, _onDestroy()_ 콜백이 차례로 호출되면서 종료된다. 이 때 Activity는 백스택에서 제거된다. 

> 백버튼을 눌러 Activity를 종료할 경우 _onSaveInstanceState()_ 콜백은 실행되지 않는다. 

# 프로세스와 앱 라이프사이클(Processes and Application Lifecycle)

안드로이드 앱은 리눅스 프로세스안에서 실행되고, 이 프로세스는 코드를 실행할 때 앱을 위해 생성된다. 기본적으로 안드로이드 앱 프로세스는 직접적으로 제어되지 않는다. 대신 얼마나 사용자에게 얼마나 중요한지? 그리고 시스템에서 사용 가능한 전체 메모리의 양을 조합하여 시스템에 의해 제어된다. 

앱의 프로세스가 살아있는 동안 앱의 컴포넌트가 얼마나 이 앱에 영향을 끼치는지 이해하는것이 안드로이드 개발자에게 중요하다. 컴포넌트를 올바르게 사용하지 않으면, 앱의 프로세스가 중요한 작업을 하고 있을때 시스템에 의해 종료될 수 있다.

> 프로세스 라이프사이클 버그의 예제로는 _BroadcastReceiver.onReceive()_ 가 있다. 안드로이드 시스템은 일단 _BroadcastReceiver.onReceive()_ 메소드가 종료되면 더 이상 _BroadcastReceiver_는 활성화 되지 않는다고 간주하므로,(다른 앱의 컴포넌트가 _BroadcastReceiver_ 에서 활성화 되지 않는 이상) 프로세스 안에서 스레드가 실행되고 있어도 언제든지 종료될 수 있는 상황에 놓인다.
>이 문제의 해결책은 _BroadcastReceiver_ 의 프로세스가 여전히 활성화 상태라고 시스템이 인지하게 하는 것이다. 그래서 JobService를 예약 하는 것으로 문제를 해결할 수 있다.

안드로이드 프로세스에는 실행 중인 컴포넌트와 컴포넌트의 상태를 기반으로 우선순위 계층(importance hierarchy)이 존재하며, 메모리가 부족할 때 어떤 프로세스를 종료해야 쉽게 결정할 수 있다.

## 포그라운드 프로세스(foreground process)

첫 번째 우선순위를 가지는 foreground 프로세스이다. foreground 프로세스는 사용자와 현재 상호작용하고 있는 프로세스이며, 다양한 앱 컴포넌트로 인해 foreground 프로세스로 인식될 수 있다. foreground 프로세스로 인식될 수 있는 상황은 아래와 같다.

* 화면에서 Activity가 실행되어 사용자와 상호작용 하는 경우
* _BroadcastReceiver_ 가 현재 실행중인 경우(_BroadcastReceiver.onReceive()_ 가 실행중임)
* Service에 콜백(_Service.onCreate()_, _Service.onStart()_, _Service.onDestroy()_) 중 하나가 실행중인 경우

포그라운드 프로세스는 메모리가 매우 부족하여 프로세스를 더 이상 실행할 수 없을때 최후의 방법으로만 종료된다.

## 가시적 프로세스(visible process)

사용자가 현재 인식하고 있는 작업이므로 종료하게되면 사용자에게 매우 부정적인 영향을 끼치게 된다. 가시적 프로세스로 인식될 수 있는 상황은 아래와 같다.

* Activity가 실행중이지만 포그라운드 상태가 아닌경우
* Service가 _포그라운드 서비스_ 로 실행중인 경우
* 프로세스가 live wallpaper, input method 같은 서비스를 호스팅하고 있는 경우

가시적 프로세스도 포그라운드 프로세스에 비해 중요도가 약간 밀릴 뿐이지 중요한 프로세스로 인식된다. 포그라운드 프로세스를 계속 실행하기 위해 메모리가 필요한 상황이 아니면 종료되지 않는다.

## 서비스 프로세스(service process) 

_Service.startService()_ 메소드로 실행된 서비스를 의미한다.

안드로이드8 부터 보안이 강화되어 5초이상 실행되는 백그라운드 서비스는 언제든지 종료될 수 있다.

## 캐쉬 프로세스(cached process) 

캐쉬 프로세스는 현재 필요한 것이 아니므로 언제든지 시스템이 종료하여 메모리를 회수해갈 수 있다. 메모리 관리 관점에서 보자면 일반적으로 시스템은 앱 스위칭을 효과적으로 진행하기 위해 여러개의 캐쉬 프로세스를 가지고 있으며, 오래된 프로세스를 필요에 따라 하나씩 종료한다. 매우 치명적인 상황인 경우에는 모든 캐쉬 프로세스를 종료하며 동시에 서비스 프로세스도 같이 종료된다.

캐쉬 프로세스의 경우 사용자가 볼 수 없는 하나 이상의 Activity 인스턴스인 경우가 많다. Activity가 종료될 때 수명 주기를 올바르게 실행했다면 사용자가 해당 앱으로 다시 돌아갈 때 사용자에게 부정적인 영향을 끼치지 않을것이다.  

## 결론

1. 설정변경이 일어났을 때 Activity는 파괴됐다가 재생성 된다.
2. 백버튼을 눌러 Activity를 종료하는 경우 _onSaveInstanceState()_ 콜백은 호출되지 않는다.
3. 안드로이드 프로세스는 실행 중인 컴포넌트와 컴포넌트의 상태를 기반으로 우선순위 계층이 존재한다.
4. 포그라운드 프로세스 > 가시적 프로세스 > 서비스 프로세스 > 캐쉬 프로세스 순으로 우선순위를 가진다.
5. 앱에서 급하게 메모리가 필요한 경우 캐쉬 프로세스와 서비스 프로세스를 모두 종료한다.


