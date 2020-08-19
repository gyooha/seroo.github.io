---
title: "Type Component"
date: 2020-08-19
last_modified_at: 2020-08-19
desc: "함수형 프로그래밍 - 타입 구성요소"
keywords: "Functional Programming, Type Component"
permalink: "/fp/type_component"
categories: 
    - Functioanl Programming
tags: 
    - FP
    - Functioanl Programming
    - Type Component
---

# 타입의 구성요소

타입은 표현식이 어떤 카테고리에 포함되는지 알려 주는 라벨과 같다. 예를 들어 String을 보면 표현식이 문자열이라는 것을 알 수 있고, Boolean을 보면 표현식이 True 아니면 False라는 것을 알 수 있다. 특히 함수형 프로그래밍에서는 함수의 타입을 이해하거나 선언하는 것이 중요하다.

### 타입 변수

타입 변수를 알아보기 위해 우선 리스트의 첫 번째 값을 반환하는 head 함수를 예로 들어 보자

```kotlin
fun <T> head(list: List<T>): T = list.first()
```

코틀린에서는 제네릭으로 선언된 T를 **타입 변수**라 한다. 타입 변수를 사용하면 함수를 쉽게 일반화할 수 있다. 이런 타입 변수를 가진 함수들을 다형 함수라 한다. 다형 함수는 아직 구체적 타입이 결정되지 않은 타입 변수 T를 통해서 다양한 타입의 함수가 될 수 있다. 구체적 타입이 결정되는 것은 다음과 같이 head 함수를 사용할 때다.

```kotlin
head(listOf(1, 2, 3, 4))
```

head 함수를 이렇게 호출하면, 함수의 타입은 fun head(list: List<Int>): Int 가 된다. 여기서 Int 타입을 직접 명시하지 않았지만, 타입 추론에 의해서 입력 리스트의 타입이 List<Int>로 입력된다. 따라서 T는 Int가 된다. head(listOf("ab", "cd")) 를 호출하면 T는 String이 된다.

타입 변수는 새로운 타입을 정의할 때도 사용된다.

```kotlin

class Box<T>(t: T) {
    val value = t
}

```

Box 타입을 정의할 때 타입 변수 T를 사용해서, 상자 안에 다양한 타입의 값이 담길 수 있도록 선언했다. 생성자가 호출되면 입력받은 매개변수 T의 타입으로 Box의 타입이 결정된다. 타입 T의 구체적 타입은 다음 예제와 같이 생성자가 호출될 때 결정된다.

```kotlin
val box = Box(1)
```

Box(1)이 호출되는 순간 box의 타입은 Box<Int>로 결정된다. 컴파일러에 의해서 타입이 추론되기 때문인데, 타입을 직접 명시하지 않아도 된다는 장점이 있는 반면에 타입이 복잡해지면 코드를 통해서 타입을 유추하기 힘들다는 단점도 있다. 다음 예제를 보자.

```kotlin
val listOfBox = listOf(Box(1), Box("String"))
```

이 예제에서 리스트에는 Int와 String 타입을 모두 포함한다. 이때 컴파일러는 코틀린의 최상위 오브젝트인 List<Any>로 추론한다. 이런 상황을 프로그래머가 인지하지 못하면, 개발하는 과정에서 의도치 않은 동작의 함수를 호출하거나 원하는 함수를 찾지 못할 수 있다.

