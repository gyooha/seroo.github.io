---
title: "High order function"
date: 2020-09-04
last_modified_at: 2020-09-04
desc: "함수형 프로그래밍 - 고차함수"
keywords: "Functional Programming, High order function"
permalink: "/fp/high_order_function"
categories: 
    - Functioanl Programming
tags: 
    - FP
    - Functioanl Programming
    - High order function
---

# 고차 함수

함수형 프로그래밍에서는 함수를 객체처럼 다룬다.따라서 객체만큼 함수를 이해하고 활용할 수 있어야 한다. 

## 고차 함수란?

코틀린의 함수들은 함수를 인자로 받거나 반환값으로 반환하는 것이 가능하다. 이게 가능한 이유는 코틀린에서 함수는 일급 함수이기 때문이다. 함수형 프로그래밍에서는 다음 두 가지 조건 중 하나 이상을 만족하는 함수를 고차 함수라 한다.

* 함수를 매개변수로 받는 함수
* 함수를 반환하는 함수

명령형 언어에서는 이러한 문제를 해결하기 위해서 상태를 변경하거나 반복문을 사용하여 단계별로 정의한다. **함수형 언어에서 문제를 해결할 때는 반드시 고차 함수를 사용해야 한다.**

### 고차 함수 조건을 만족하는 예

고차 함수를 사용하면 코드의 재사용성을 높일 수 있고, 기능을 확장하기 쉬우며, 코드를 간결하게 작성할 수 있다. 고차 함수 조건을 만족하는 다음 두 가지 예제를 살펴보자

```kotlin
fun highOrderFunction1(f: () -> Unit) {
    f.invoke()
}

fun highOrderFunction1(): () -> Unit {
    return { println("Hello, Kotlin") }
}
```

highOrderFunction1은 매개변수로 함수를 전달 받고, highOrderFunction2는 함수를 반환하므로 두 함수 모두 고차 함수이다.

### 코드의 재사용성을 높인다.

고차 함수로 코드의 재사용성을 얼마나 높일 수 있는지 알아보기 위해 상속을 사용한 계산기를 먼저 작성해 보자.

```kotlin
fun main() {
    val calcSum = Sum()
    val calcMinus = Minus()
    val calcProduct = Product()

    println(calcSum.calc(1, 5)) // 6
    println(calcMinus.calc(5, 2)) // 3
    println(calcProduct.calc(4, 2)) // 8
}

interface Calcable {
    fun calc(x: Int, y: Int): Int
}

class Sum: Calcable {
    override fun calc(x: Int, y: Int): Int = x + y
}

class Minus: Calcable {
    override fun calc(x: Int, y: Int): Int = x - y
}

class Product: Calcable {
    override fun calc(x: Int, y: Int): Int = x * y
}
```

여기서 중요한 것은 x + y, x - y, x * y와 같은 핵심 비즈니스 로직이다. 그런데 override fun calc(x: Int, y: Int): Int 와 같은 의미 없는 코드들이 반복해서 나타나 핵심 비즈니스 로직이 한눈에 들어오지 않는다. 따라서 유지보수가 어려울 뿐 아니라 요구사항이 추가될 때마다 의미 없는 코드도 점점 늘어난다.

고차 함수를 활용하면 좀 더 간결하고 재사용성 높은 코드로 만들 수 있다.

```kotlin
fun main() {
    val sum = { x: Int, y: Int -> x + y }
    val minus = { x: Int, y: Int -> x - y }
    val product = { x: Int, y: Int -> x * y }

    println(highOrder(sum, 1, 5)) // 6
    println(highOrder(minus, 5, 2)) // 3
    println(highOrder(product, 4, 2)) // 8
}

fun highOrder(f: (Int, Int) -> Int, x: Int, y: Int): Int = f(x, y)
```

highOrder는 함수를 매개변수로 받고 있으므로 고차 함수이다. 매개변수로 받은 함수는 오직 타입으로만 일반화 되어 있다. 비즈니스 로직은 호출자로부터 주입받는다. 의미 없는 코드도 없고, 핵심 비즈니스 로직도 한꺼번에 잘 정리되어 있다.

### 기능의 확장이 쉽다.

고차 함수를 이용하면 기능을 확장하기도 쉽다. 계산기 기능에 입력받은 두 개의 값을 더해서 두 배하는 기능을 추가해 보자. 이번에도 상속을 사용한 코드를 먼저 살펴본다.

```kotlin
fun main() {
    val calcTwiceSum = TwiceSum()
    println(calcTwiceSum.calc(8, 2)) // 20
}

class TwiceSum: Calcable {
    override fun calc(x: Int, y: Int): Int = (x + y) * 2
}
```

(x + y) * 2 의 비즈니스 로직을 추가하기 위해 override fun calc(x: Int, y: Int): Int { ... } 같은 불필요한 코드를 작성해야 한다. 고차 함수를 활용하면 어떨까?

```kotlin
fun main() {
    val twiceSum = { x: Int, y: Int -> (x + y) * 2}
    println(highOrder(twiceSum, 8, 2)) // 20
}
```

핵심 비즈니스 로직인 (x + y) * 2 만 적절히 추가하면 된다.

### 코드를 간결하게 작성할 수 있다.