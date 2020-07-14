---
title: "Parcelables and Bundles"
date: 2020-05-06
last_modified_at: 2020-05-06
desc: "안드로이드 Parcelables and Bundles"
keywords: "Android,Parcelables,Bundles"
permalink: "/android/parcelables_and_bundles"
categories: 
    - Android
tags: 
    - Android
    - Parcelables
    - Bundles
---

# Parcelables and Bundles

Parcelable 그리고 번들 객체는 IPC/Binder 트랜잭션과 같이 프로세스 경계를 가로질르거나, 인텐트와 함께 Activity 사이 그리고 구성변경시 일시적인 상태 저장에 사용된다. 

이 페이지는 Parcelable 과 번들 오브젝트를 어떻게 사용하는 권장 사항 및 모범 사례를 제공한다.

> Parcel은 일반적인 목적의 직렬화 메커니즘이 아니므로, Parcel 데이터를 디스크에 저장하거나, 네트워크 전송에 사용해선 안된다.

## Activity 사이에서 데이터 전송

인텐트 객체를 만들 때 _startActivity(android.content.intent)_ 메소드를 이용하여 새로운 Activity를 시작한다. 이 때 _putExtra(java.lang.String, java.lang.String)_ 메소드를 이용해서 파라미터를 넘길 수 있다.

코드를 보면 아래와 같다.

```kotlin
val intent = Intent(this, MyActivity::class.java).apply {
    putExtra("media_id", "a1b2c3")
    // ...
}
startActivity(intent)
```

OS에서 인텐트의 번들을 Parcel 한다. 그런 다음 OS는 새로운 Activity 생성해, 데이터를 un-parcels 한 다음, 인텐트를 새로운 Activity에 전달한다.

안드로이드에서 제안하는 방식은 번들 클래스를 사용해 OS가 알고있는 프리미티브 타입을 인텐트의 번들에 저장 하는 것이다. 번들 클래스는 Parcel을 사용하여 정렬화, 비정렬화 작업에 높은 최적화를 제공한다.

또 다른 케이스로 복잡한 오브젝트를 다른 Activity에 전달하고 싶은 경우가 있을것이다. 이 경우  커스텀 객체에 Parcelable을 implement 하고, _writeToParcel(android.os.Parcel, int)_ 메소드를 제공해야 한다. 또한 반드시 Parcelable.Creator 인터페이스를 구현하는 non-null 필드를 제공해야 한다. Parcelable.Creator 인터페이스는 createFromParcel() 메소드를 사용하여 Parcel을 현재 객체로 다시 변환하는데 사용된다.

인텐트를 통해 데이터를 전송할 때, 데이터 사이즈에 유의해야 한다. 몇 KB가 넘어가면 데이터를 전송할 때 _TransactionTooLargeException_ 이 발생한다.

## 프로세스 사이에서 데이터 전송

프로세스 사이에서 데이터 전송은 Activity와 유사하다. 그러나 프로세스 사이의 전송에서 커스텀 parcelables 을 사용하는것을 추천하지 않는다. 만약 커스텀 Parcelable 객체를 현재 앱에서 다른 앱으로 전송하면, 받는 앱이나 보내는 앱이나 동일한 객체가 존재해야 한다. 그렇지 않으면 시스템에서 비정렬화에 대한 지식이 없어서 커스텀 parceable 객체를 보내는 경우 시스템에서 에러가 발생할 수 있기 때문이다.

AlarmManager 클래스로 예를 들어보면 커스텀 Parcelable 객체를 알람 인텐트에 사용한다고 가정하자. 알람이 울리면 시스템은 인텐트의 번들의 엑스트라들을 수정하여 반복 카운트를 추가한다. 이 수정은 엑스트라로 부터 커스텀 Parcelable 객체를 벗길 수 있고, 수정된 인텐트의 번들 객체를 앱에서 수신하면 크래쉬가 발생할 수 있다. 왜냐하면 앱에서 알수없는 추가 데이터를 받을 수 있기 때문이다.

바인더 트랜잭션은 제한된 고정 크기(1MB)를 가지며 프로세스에 대해 진행중인 모든 트랜잭션을 공유한다. 이 한도는 Activity 수준이 아닌 프로세스 수준에 있으므로, 이 트랜잭션은 앱 안의 _onSaveInstanceState_, _startActivity_ 와 시스템과 상호작용하는 모든 바인더 트랜잭션을 포함한다. 사이즈가 넘어가게 되면 _TransactionTooLargeException_ 예외가 발생한다.

onSaveInstanceState의 특정 상황의 경우 사용자가 해당 Activity로 돌아갈 수 있는 한 시스템 프로세스가 제공된 데이터를 보유해야 하기 때문에 50k 미만의 데이터로 유지하는 것이 좋다.

## 참조

- [Parcelables and Bundles](https://developer.android.com/guide/components/activities/parcelables-and-bundles)