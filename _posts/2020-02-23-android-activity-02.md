---
title: "Android Activity - 2"
date: 2020-02-23
last_modified_at: 2020-02-24
desc: "안드로이드 액티비티 라이프사이클 정리"
keywords: "Android,Activity"
permalink: "/android/activity-02"
categories: 
    - Android
tags: 
    - Android
    - Activity
    - Activity 라이프사이클
---

# Activity 라이프사이클

사용자가 앱(Application)을 사용, 종료, 탐색등을 할 때 Activity의 라이프사이클은 각각의 상태에 맞게 전환된다. 그에 따라 개발자는 Activity의 라이프사이클에 적절한 행동을 정의 해야 하고, 잘 정의하게 되면 아래와 같은 문제를 피할 수 있다.

1. 사용자가 전화를 받거나 다른 앱으로 전환 했을 때 앱이 강제종료되는 것을 피할 수 있다.
2. 사용자가 앱을 사용하지 않을 때, 시스템 자원을 낭비하는 것을 막을 수 있다.
3. 사용자가 앱을 떠나 나중에 다시 돌아오게 될 때, 사용자의 현재 상태를 잃는 것을 방지할 수 있다.
4. 사용자가 화면을 전환할 때,(가로모드, 세로모드) 사용자의 현재 상태를 잃거나, 앱이 강제종료 되는것을 방지할 수 있다.

> Activity의 복잡성에 따라 라이프사이클 메소드를 구현이 필요하거나 필요하지 않을 수 있지만, 더욱 안전한 앱을 위해 라이프사이클 메소드를 이해하고 구현해보는것이 중요하다.

라이프사이클의 중요 메소드는 6가지가 있다. 하나씩 살펴보자.

## onCreate

Activity가 생성될 때 발생하는 콜백이다. Activity가 살아있을 때 단 한번만 불려서 시작을 위한 로직 대부분을 **onCreate** 에서 선언한다. 

> 파라미터로 saveInstanceState란 Bundle 객체가 넘어오는데, 이전에 저장한 상태값이 있으면 이 파라미터로 넘어오고 아니면 null이 반환된다.


간단한 구현을 보면 아래와 같다.
```kotlin
lateinit var textView: TextView

// some transient state for the activity instance
var gameState: String? = null

override fun onCreate(savedInstanceState: Bundle?) {
    // call the super class onCreate to complete the creation of activity like
    // the view hierarchy
    super.onCreate(savedInstanceState)

    // recovering the instance state
    gameState = savedInstanceState?.getString(GAME_STATE_KEY)

    // set the user interface layout for this activity
    // the layout file is defined in the project res/layout/main_activity.xml file
    setContentView(R.layout.main_activity)

    // initialize member TextView so we can manipulate it later
    textView = findViewById(R.id.text_view)
}

// This callback is called only when there is a saved instance that is previously saved by using
// onSaveInstanceState(). We restore some state in onCreate(), while we can optionally restore
// other state here, possibly usable after onStart() has completed.
// The savedInstanceState Bundle is same as the one used in onCreate().
override fun onRestoreInstanceState(savedInstanceState: Bundle?) {
    textView.text = savedInstanceState?.getString(TEXT_VIEW_KEY)
}

// invoked when the activity may be temporarily destroyed, save the instance state here
override fun onSaveInstanceState(outState: Bundle?) {
    outState?.run {
        putString(GAME_STATE_KEY, gameState)
        putString(TEXT_VIEW_KEY, textView.text.toString())
    }
    // call superclass to save any view hierarchy
    super.onSaveInstanceState(outState)
}
```

> setContentView에 layout xml을 전달하는 대신, 새로운 View를 만들어 ViewGroup에 추가하고 ViewGroup의 root를 setContentView에 전달하는 방법을 사용할 수 있다. 자세한 내용은 [여길](https://developer.android.com/guide/topics/ui) 참조하자 



## onStart

Activity가 시작 상태로 진입했을 때 발생하는 콜백이다. **onStart** 콜백이 발생했을 때는 해당 Activity가 사용자에게 보여진다는 것을 의미한다.

> onStart 콜백은 매우 빠르게 완료되고 바로 다음 상태인 onResume 상태로 넘어간다.

## onResume

Activity가 재개 상태로 진입했을 때 발생하는 콜백이다. **onResume** 콜백이 불린다는 것은 해당 Activity가 Foreground에 진입했다는 것이고, 사용자와 상호작용을 할 수 있다는 것을 의미한다. 다른 상태전환(Activity 이동 또는 종료)이 일어나기 전까지 해당 Activity는 이 상태를 유지한다.

## onPause

사용자가 Activity에서 떠날때 가장 먼저 발생하는 콜백이 **onPause** 이다. Activity가 Pause 상태로 진입하여 Activity가 더이상 Foreground에 있지 않다는걸 의미한다.

onPause의 경우 매우 짧은 시간안에 끝나기 때문에 저장 작업 같은 긴 작업을 하기에 적합하지 않다. 이말은 즉 저장작업, 네트워크 작업 등을 onPause에서 하지 말라는 의미이다. 

> onPause에서 위와 같은 작업을 실행하게 되면, onPause 메소드가 끝날 때 까지 해당 작업이 완료되지 않을 수 있다. 이러한 무거운 작업은 onStop 에서 해야한다.

>onPause 작업이 완료되면 Activity가 일시정지 상태를 벗어났다는 의미이다. 그리고 Activity가 일시정지 상태를 벗어나면, 다시 재개되거나, 사용자에게 아얘 안보인다는 것이고, 만약 Activity 가 재개됐다면 **onResume** 콜백이 다시 호출되게 된다. onResume 콜백이 불리게 된 상황에서는 Activity 인스턴스가 메모리에 계속 거주하게 된다. 이 시나리오 대로라면 Activity는 다른 라이프사이클 콜백에서 초기화 작업을 수행하지 않아도 되며, 종료 시나리오를 타는 경우 사용자에게 아얘 안보이게 되고 **onStop** 콜백이 실행되게 된다.

## onStop

Activity가 사용자에게 더이상 보이지 않을 때 정지 상태에 돌입한다. 그리고 그 즉시 시스템은 **onStop** 콜백을 호출하게 된다. 

> **onStop**이 불리게 될때 새로운 Activity가 실행되어 기존 Activity를 가리거나, 기존 Activity가 종료 로직을 수행하게 된다.

일시정지 애니메이션이나 세밀한 위치정보 업데이트 같은, 불필요하거나 조정해야 하는 리소스는 onStop에서 수행해야 한다. 또한 데이터베이스에 데이터 저장 같은 CPU를 사용하는 작업은 적당한 수행장소를 찾지 못했을 경우 onStop에서 수행해야 한다.

> Activity가 정지 상태일 때 **Window Manager를 제외한** 모든 상태와 정보를 가지고 메모리에 계속 거주하고 있게 된다.(Activity가 재개될 때 Window Manager에 필요한 정보를 다시 호출한다.) **onPause** 콜백과 같이 재개됐을 때는 다른 라이프사이클 콜백에서 초기화 작업을 수행하지 않아도 되며, onStop에서 정리한 리소스들을 onStart에서 적절히 재수행 시켜주기만 하면 된다. 재수행 될 경우 onRestart 콜백이 불리게 되고, 종료 프로세스를 수행하는 경우 onDestroy 콜백이 불리게 된다.

## onDestroy

Activity가 종료되기 전에 호출되는 콜백이다. 아래와 같은 상황에 수행된다.

1. 유저가 종료하거나, finish() 함수가 불리는 경우
2. Configuration change 가 일어나는 경우

Activity의 종료 이유를 찾기 보단, **ViewModel을 이용**하여 View의 데이터를 적절히 가지고 있어야 한다. Configuration Change가 일어나 해당 Activity 파괴되고 다시 생성되는 경우에도 ViewModel은 다시 생성되는 Activity 인스턴스에 제공되므로 아무것도 수행하지 않아도 된다.

> Activity가 재생성되지 않고 파괴되는 경우 ViewModel은 **onCleared** 함수가 호출 된다.

onDestroy 콜백에서 해당 Activity에서 사용하는 resource들을 최대한 해제시켜야 한다.

## 참조

* [Activity 라이프사이클](https://developer.android.com/guide/components/activities/activity-lifecycle)