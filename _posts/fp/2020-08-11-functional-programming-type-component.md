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

### 값 생성자

**타입에서 값 생성자는 타입의 값을 반환하는 것이다.** Box 예제에서 class Box<T>(t: T) 가 값 생성자다. Box는 생성자가 한 개 지만, 여러 개가 될 수도 있다. 

> class 나 sealed class에서 값 생성자는 그 자체로도 타입으로 사용될 수 있다. 그러나 enum의 경우 값 생성자는 값으로만 사용되고, 타입으로 사용될 수 없다.

아래의 예제를 통해 sealed class와 enum 클래스의 차이를 확인해보자.

```kotlin
sealed class Expr

data class Const(val number: Double): Expr()
data class Sum(val e1: Expr, val e2: Expr): Expr()
object NotANumber: Expr()

fun getSume(p1: Double, p2: Double): Sum  {
    return Sum(Const(p1), Const(p2))
}
```

Sum은 Expr의 값 생성자이지만, getSum 함수의 타입 선언에 사용할 수 있다. 


```kotlin

enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}

fun getRed(): Color {
    return Color.RED
}

// compile error
fun getRed(): Color.RED {
    return Color.RED
}

```

enum의 경우 Color는 타입이지만, 값 생성자인 Color.RED는 값으로만 사용될 수 있다. 따라서 getRed 함수에서 타입 선언에 사용하면 컴파일 오류가 발생한다.

### 타입 생성자와 타입 매개변수

값 생성자가 값 매개변수를 받아서 새로운 값을 생성한 것처럼, **타입 생성자는 새로운 타입을 생성하기 위해서 매개변수화된 타입을 받을 수 있다.** Box 클래스 예제에서 타입 생성자와 타입 매개변수를 보았다. class Box<T>(t: T)에서 Box는 타입 생성자고, T는 타입 매개변수다. 다음 예를 통해 타입 생성자와 타입 매개변수에 대해 알아보자.

```kotlin
sealed class Maybe<T>
object Nothing: Maybe<kotlin.Nothing>
data class Just<T>(val value: T): Maybe<T>()
```

여기서 Maybe는 타입 생성자고, T는 타입 매개변수다. Maybe는 타입이 아니라 타입 생성자이기 때문에, 구체적 타입이 되려면 모든 매개변수가 채워져야 한다. 타입 매개변수를 활용하면 매개변수의 타입에 따라서 여러가지 타입을 만들 수 있다. Maybe는 Nothing이 아닐 때, Maybe Int, Maybe String, Maybe Double 등의 타입을 생성할 수 있다. 다른 예로 FunList를 살펴보자

```kotlin
selaed class FunList<out T>
object Nil: FunList<Nothing>()
data class Cons<out T>(val head: T, val tail: FunList<T>): FunList<T>()
```

Maybe와 마찬가지로 FunList에서도 타입 생성자와 매개변수화된 타입이 있다는 것을 확인할 수 있다. 어떤 값의 타입이 되기 위해서는 FunList<Int>, FunList<String>과 같이 타입 매개변수가 확정되어야 한다.

타입 매개변수는 값이 주어질 때 타입 추론에 의해서 결정될 수 있다. 타입 생성자에 의해서 타입 매개변수가 추론되는 예를 보자.

```kotlin
val maybe1: Maybe<Int> = Just<Int>(5)
val maybe2 = Just(5)

val list1: FunList<Int> = Cons<Int>(1, Cons<Int>(2, Nil))
val list2 = Cons(1, Cons(2, Nil))
```

컴파일러가 타입 추론을 하기 때문에 maybe1, list1처럼 타입 매개변수를 직접 명시하지 않아도 된다. maybe2, list2처럼 값이 할당되면, 값의 타입으로 타입 매개변수가 정해진다.

타입 매개변수가 여러 가지 이점을 가지고 있으나, 늘 사용할 수 있는 것은 아니다. 타입 매개변수는 Maybe<T>나 FunList<T> 처럼 타입이 포함하는 값의 타입에 관계없이 동작할 때 사용하는 게 좋다. 다음과 같은 Person 타입에 타입 매개변수를 사용하는 것은 적합하지 않다.

```kotlin
data class Person1(val name: String, val age: Int)
data class Person2<T1, T2>(val name: T1, val age: T2)
```

**일반적으로 타입을 구성하는 값 생성자에 포함된 타입들이, 타입을 동작시키는데 중요하지 않은 경우 타입 매개변수를 사용한다.** 예를 들어 Maybe의 값 생성자 Nothing과 Cons<out T>(val head: T, val tail: FunList<T>)에 포함된 타입인 T가 Maybe 타입을 동작시키는 데는 중요하지 않기 때문에 타입 매개변수를 사용할 수 있다. Maybe는 아무것도 없거나 어떤 값을 가지고 있는데, **어떤 것의 타입에 관계없이 동작한다.** 또한 리스트는 리스트 내의 값 타입에 관계없이 동작할 수 있기 때문에, 타입 매개변수를 사용하기에 적합하다.

## 타입 클래스와 타입 클래스의 인스턴스 선언하기

하스켈에서는 **타입의 행위를 선언하는 방법을 타입 클래스라 한다.** 이름은 비슷하지만 객체지향 프로그래밍의 클래스와는 다르다는 점에 유의하자. 타입 클래스는 다음과 같은 기능을 가지고, 코틀린의 인터페이스와 유사하다.

* 행위에 대한 선언을 할 수 있다.
* 필요시, 행위의 구현부도 포함될 수 있다.

두 값이 같은지 또는 다른지 판단하는 행위를 가진 타입 클래스를 만들어 보자.