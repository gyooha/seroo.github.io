---
title: "Android Activity - 1"
date: 2020-02-20
last_modified_at: 2020-02-23
desc: "안드로이드 액티비티 정리"
keywords: "Android,Activity"
permalink: "/android/activity1"
categories: 
    - Android
tags: 
    - Android
    - Activity
---

# Activity

Activity는 한 앱이 다른 앱을 호출할 때 호출 앱은 다른 앱을 전체적으로 호출하는 것이 아니라 _다른 앱의 Activity를_ 호출한다. Activity는 이러한 패러다임으로 설계되었으며, 앱과 사용자의 상호작용을 담당한다.

또한, Activity는 화면(Screen)보다 작거나, 다른 Window위에 나타날 수 있는 Window를 제공하고 있으며, 이 Window는 User Interface를 그려 화면을 채운다.

이처럼 Activity는 Android Component중 가장 중요한 역할을 맡고 있다. Activity를 관리하려면 Manifest에 등록해야 하며, Lifecycle과 [Backstack](https://gyooha.github.io/seroo/android/backstack)을 적절하게 관리해야 한다.

```xml
<manifest ... >
  <application ... >
      <activity android:name=".ExampleActivity" />
      ...
  </application ... >
  ...
</manifest >
```

매니페스트(Manifest)에 위와같이 \<application> 안에 \<activity> 태그를 이용하여 등록이 가능하다.

```xml
<activity android:name=".ExampleActivity" android:icon="@drawable/app_icon">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
</activity>
```

위와 같이 intent-filter 설정도 가능하다. 자세한 내용은 다음 Intent component 시간에 하도록 하겠다.

## Activity Lifecycle

### onCreate

Activity가 생성되면 가장 먼저 불리게 되는 콜백함수 이다. 그래서 가장 먼저 구현해야 하며, setContentView 메소드를 이용하여 layout을 정의해야 하고, list 등의 데이터를 View에 bind 시켜줘야 한다. onCreate 다음 콜백은 항상 onStart 이다.

### onStart

onStart 콜백은 Activity가 시작 상태에 들어와있다는 뜻이다. 

> 시작상태란? - Activity가 Foreground에 와서 사용자와 상호작용할 준비가 완료 됐다는 의미 이다.

### onResume

onResume 콜백이 시작되면 해당 Activity가 Activity Stack의 Top에 와있다는 것이며, 사용자와 상호작용을 시작했다는 뜻이다.
> onPause 콜백은 항상 onResume 다음에 불린다. 

### onPause

onPause 콜백이 시작되면 해당 Activity가 포커스를 잃고 Pause 상태에 들어갔다는 의미이다. 
> onPause 콜백이 호출되면 Activity는 부분적으로 보일순 있지만, 그러나 대부분 해당 Activity 떠난다는 의미이며, 다음콜백(onResume, onStop)을 호출하게 된다.

> 주의사항 - onPause에서는 user data를 저장하거나, Network Call을 하거나, database transaction 작업을 하지 않는것을 권장한다.

### onStop

onStop 콜백이 시작되면 해당 Activity의 UI가 더이상 사용자에게 보이지 않는다는 것을 의미한다. 

> 대부분 이전 Activity는 파괴되고, 새로운 Activity는 생성중 이거나, 존재하는 Activity가 Resume 상태로 돌입하여 Stop된 Activity를 덮는 행동을 한다.

### onRestart

onRestart 콜백은 Activity가 Stop 상태에서 다시 재시작 될 때 호출된다. Activity가 중지될 때의 상태를 복원한다. 

> 다음 콜백은 항상 onStart 이다.

### onDestroy
onDestroy 콜백은 Activity가 마지막 한번만 받게 된다. 
> onDestroy에서는 Activity 또는 Activity를 포함하는 프로세스가 파괴될 때 resource를 해제하기 위해 구현된다.

# 참조

* [Activity](https://developer.android.com/reference/android/app/Activity)
* [Activity 소개](https://developer.android.com/guide/components/activities/intro-activities)