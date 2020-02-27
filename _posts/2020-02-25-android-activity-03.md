---
title: "Android Activity - 3"
date: 2020-02-25
last_modified_at: 2020-02-26
desc: "안드로이드 액티비티 나머지 정리"
keywords: "Android,Activity"
permalink: "/android/activity-other"
categories: 
    - Android
tags: 
    - Android
    - Activity
    - Other
---

## Activity ejection memory

안드로이드에서 메모리 용량이 부족하면 시스템이 프로세스를 강제종료하여 메모리를 확보하는데, 이 때 시스템이 강제종료하는 프로세스는 **프로세스의 상태**에 관련이 있고, 프로세스의 상태는 **프로세스 안에서 활동중인 Activity의 상태**에 연관이 있다. 아래의 표는 프로세스의 상태, Activity의 상태 및 시스템이 프로세스를 종료시키는 우선순위를 표시한 것이다.

| 시스템에 의해 강제종료될 가능성 | 프로세스 상태 | Activity 상태 |
|:--------:|:-------:|:--------:|
| Least   | Foreground   | Create<br/>Started <br/> resumed   |
| More   | Background(lost focus)   | Paused   |
| Most   | Background(not visible)<br/>Empty   | Stoped<br/>Destroyed  |

시스템은 Activity를 메모리에서 직접적으로 강제종료 하지 않는 대신 Activity가 실행되고 있는 프로세스를 종료하여 Activity 뿐만 아니라 프로세스에서 실행되고있는 다른것 까지 같이 종료한다. 

> 사용자가 설정메뉴 안에 있는 앱관리 메뉴에서 프로세스를 강제종료 시킬 수 있다.

## Saving and resotre transient UI state

사용자는 가로모드 혹은 세로모드로 바뀔 때 UI(User Interface)의 상태가 그대로 일 것이라고 기대하지만, 안드로이드 에서는 그런 설정변경(가로모드에서 세로모드, 세로모드에서 가로모드로 변경될 때)이 일어날 때 기본적으로 Activity를 파괴했다가 재생성 하므로 기존에 사용했던 UI를 제거하고 다시 생성한다.(즉 처음으로 돌아간다.) 

> 유사하게 사용자가 앱을 사용하다가, 다른 앱으로 이동하거나 장시간 사용한 앱을 백그라운드에 두고 다시 돌아왔을 때 마지막에 사용했던 상태와 같은 상태일거라고 생각하지만, 그렇지 않다. 왜냐하면 시스템이 앱 프로세스를 종료했기 떄문이다.

우리는 위와같이 안드로이드 시스템 제약에 의해서 Activity가 종료되는 상황 속에서 ViewModel, onSaveInstanceState, Local Storage(Local database)를 이용해 UI 데이터를 보호해야 한다. 

> 이 포스팅의 예제에서는 onSaveInstanceState를 기반으로 다룰것이다. onSaveInstance는 설정변경이 일어나거나, 안드로이드 시스템에 의해 프로세스가 강제종료되고 다시 시작 했을 때 UI 상태가 가볍다면(기본 타입이거나 String 같은 가벼운 객체일 때) 이를 유지할 수 있다. 하지만 대부분의 경우 onSaveInstanceState에서 직렬화 비직렬화 이슈가 발생하기 때문에 사용한다면 ViewModel과 onSaveInstanceState를 같이 사용 할 것을 권장하고 있다.

## Instance state

사용자가 뒤로가기 버튼을 눌러 앱을 종료하거나, **finish()** 메소드를 이용하여 앱을 종료하면 개발자는 **아무 처리를 하지 않아도 된다.** 하지만 안드로이드 시스템 제약으로 Activity가 사라졌을 때 시스템은 이 Activity가 존재했다는 것을 기억을 하고 있고, 사용자가 다시 시스템에 의해 강제종료된 Activity를 실행할 때 이전 강제종료된 Activity의 마지막 상태를 참고하여 시스템은 새로운 Activity를 실행 한다.

시스템이 이전 상태를 복원하는데 사용하는 데이터를 인스턴스 상태(Instance State)라고 하며, 이것은 Key-Value 페어로 이루어진 Bundle 객체이다. 기본적으로 시스템은 Bundle 객체를 이용하여 각각의 View의 상태를 저장하며, Activity가 시스템 제약에 의해 강제종료 되고 재생성될 때 **개발자의 추가적인 코드 없이** Bundle 객체를 이용하여 View의 상태를 복원 한다.(EditText안의 있는 텍스트 같은 값)

그러나 Bundle은 큰 데이터를 저장하는데 적합하지 않다. 왜냐하면 Bundle 객체는 직렬화를 메인 쓰레드에 요청하고, 시스템 프로세스 메모리를 사용하기 때문이다. 결국 UI 상태를 저장하려면 local datastorage, onSaveInstanceState, ViewModel을 적절히 조합하여 사용해야 한다.

## Save UI state using onSaveInstanceState

Activity가 **OnStop**콜백을 호출한 다음 **onSaveInstanceState**를 호출하여 인스턴스 상태 Bundle 객체에 추가적인 데이터를 저장할 기회를 준다. 아래와 같이 **onSaveInstanceState** 메소드를 재정의 하여 사용할 수 있다.

```kotlin
override fun onSaveInstanceState(outState: Bundle?) {
    // Save the user's current game state
    outState?.run {
        putInt(STATE_SCORE, currentScore)
        putInt(STATE_LEVEL, currentLevel)
    }

    // Always call the superclass so it can save the view hierarchy state
    super.onSaveInstanceState(outState)
}

companion object {
    val STATE_SCORE = "playerScore"
    val STATE_LEVEL = "playerLevel"
}
```

> 이전에도 언급 했듯이 사용자의 데이터나, DataBase의 데이터를 저장할 적당한 장소를 찾지 못한다면 onStop 에서 데이터를 저장 하는것이 좋다.

## Restore activity UI state using saved instance state

Activity가 재생성 됐을 때 이전에 저장한 데이터를 이용하여 **onCreate** or **onRestoreInstanceState**를 이용하여 복원할 수 있다. 

>> **onCreate**나 **onRestoreInstnaceState**에는 같은 Bundle 객체가 파라미터를 통해 전달된다.

Activity가 재생성 될 때 시스템이 새 인스턴스를 만드는지 혹은 기존의 인스턴스를 재사용하는지의 여부에 관계 없이 **onCreate** 콜백은 실행된다. 이곳에서 파라미터로 넘어오는 **Bundle** 객체는 nullable 이기 때문에 접근할 때 주의해야 한다. 예제코드는 아래와 같다.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState) // Always call the superclass first

    // Check whether we're recreating a previously destroyed instance
    if (savedInstanceState != null) {
        with(savedInstanceState) {
            // Restore value of members from saved state
            currentScore = getInt(STATE_SCORE)
            currentLevel = getInt(STATE_LEVEL)
        }
    } else {
        // Probably initialize members with default values for a new instance
    }
    // ...
}
```

만약 **onCreate** 대신 **onRestoreInstanceState**를 사용한다고 하면, 이 콜백은 **onStart** 이후에 호출된다. 이 콜백은 onCreate와 다르게 Bundle 객체의 null 체크가 필요없다. 왜냐하면 Bundle을 통해 넘어온 객체가 있는 경우에만 **onRestoreInstanceState** 콜백이 호출되기 떄문이다. 구현은 아래와 같다.

```kotlin
override fun onRestoreInstanceState(savedInstanceState: Bundle?) {
    // Always call the superclass so it can restore the view hierarchy
    super.onRestoreInstanceState(savedInstanceState)

    // Restore state members from saved instance
    savedInstanceState?.run {
        currentScore = getInt(STATE_SCORE)
        currentLevel = getInt(STATE_LEVEL)
    }
}
```

> 안드로이드 공식홈페이지 에서 말로는 Null 체크를 하지 않아도 된다고 적혀 있지만, Kotlin의 안전한 Null 처리를 이용하여 처리를 했다.

## 참조

[안드로이드 도큐먼트](https://developer.android.com/guide/components/activities/activity-lifecycle#saras)