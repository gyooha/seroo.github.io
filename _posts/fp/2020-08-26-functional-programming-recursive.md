---
title: "Recusive Data Structure"
date: 2020-08-27
last_modified_at: 2020-08-27
desc: "함수형 프로그래밍 - 재귀적 자료구조"
keywords: "Functional Programming, Recursive Data Structure"
permalink: "/fp/type_component"
categories: 
    - Functioanl Programming
tags: 
    - FP
    - Functioanl Programming
    - Recursive Data Structure
---

# 재귀

함수형 프로그래밍에서 명령분을 반복할 때 루프 대신 재귀를 사용한다. 

## 함수형 프로그래밍에서 재귀가 가지는 의미

**재귀는 어떤 함수의 구현 내부에서 자기 자신을 호출하는 함수를 정의하는 방법을 의미한다.** 특히 수학에서 재귀는 빈번하게 사용되는 개념이다. 예를 들어 수학에서 피보나치 수열의 경우 점화식으로 F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)로 정의된다. F(0)과 F(1)은 첫 번째 값과 두 번째 값을 의미하고 상수로 정의하였다. F(n)은 F(n-1)과 F(n-2)를 호출한 결과를 더한 결과다. 즉 이전 값 두 개의 합을 의미한다. F(n)의 내부에서 자기 자신인 F(n-1), F(n-2)를 호출했기 때문이 이 점화식은 재귀이다.

### 피보나치 수열을 명령형 프로그래밍으로 구현한 예제

명령형 프로그래밍에서는 값을 변경할 수 있기 때문에 재귀를 사용하지 않아도 피보나치 수열 문제를 풀 수 있다. 복잡한 프로그래밍을 명령형 방식으로 풀기 위해서는 간단한 문제로 나누어 접근하는 방식이 좋은데, 이러한 접근 방법을 **동적 계획법이라고 한다.** 아래 예제에서는 동적 계획법을 이용하여 피보나치 수열을 구현하였다.

```kotlin

fun main() {
    println(fiboDynamic(10, IntArray(100)))
}

private fun fiboDynamic(n: Int, fibo: IntArray): Int {
    fibo[0] = 0
    fibo[1] = 1

    for (i in 2..n) {
        fibo[i] = fibo[i - 1] + fibo[i - 2]
    }

    return fibo[n]
}

```

fiboDynamic 함수는 피보나치 수열의 결괏값을 한번에 얻으려고 하지 않고 단계별 결괏값을 구해서 합하였다. 이 과정에서 피보나치 수열의 이전 값들을 기억하기 위한 메모리 IntArray(100)을 확보해 놓았다. 루프가 반복되면서 이전 값이 필요하면 메모리에 저장된 값을 사용한다.

위의 예제를 보면 루프 내에서 fibo 배열에 값을 할당하는 걸 볼 수 있는데, 순수한 함수형 프로그래밍에서는 이러한 값 할당 자체가 불가능하다. 미리 할당된 배열의 크기는 100으로 고정되어 있는데, 명령형 프로그래밍에서는 무한대를 자료구조에 담을 수 없기 때문이다. 따라서 본 예제에서는 피보나치 수열을 100개까지만 계산할 수 있다.

### 피보나치 수열을 재귀로 구현한 예제

이번에는 피보나치 수열을 재귀로 풀어보자.

```kotlin

fun main() {
    println(fiboRecursion(10))
}

private fun fiboRecursion(n: Int): Int = when (n) {
    0 -> 0
    1 -> 1
    else -> fiboRecursion(n - 1) + fiboRecursion(n - 2)
}

```

fiboRecursion 함수에서는 내부에서 자기 자신을 호출하여 재귀로 피보나치 수열 문제를 해결하였다. 재귀로 구현한 예제에는 고정 메모리 할당이나 값의 변경이 없다. 메모리를 직접 할당해서 사용하지 않고, 스택을 활용한다. 재귀 호출을 사용하면 컴파일러 내부적으로 현재 호출하는 함수에 대한 정보들을 스택에 기록해 두고 다음 함수를 호출한다. 프로그래머가 직접 메모리를 할당하지 않아도 컴파일러에 의해서 관리된다.

여기서 피보나치 수열의 크기에 제한을 두지 않았다. 이러한 경우 큰 수를 호출하면 스택 오버플로우가 발생한다. 아래에서 이러한 문제점의 원인을 분석하고 해결해보자.

### 함수형 프로그래밍에서 재귀

함수형 프로그래밍에서는 어떻게(how) 값을 계산할 수 있을지 선언하는 대신 **무엇(what)을 선언할지를 고민**해야 한다. for나 while문과 같은 반복 명령어는 구조적으로 어떻게 동작해야 하는지를 명령하는 구문이다. 따라서 함수형 프로그래밍에서는 루프를 사용하여 해결하던 문제들을 재귀로 풀어야 한다.

순수한 함수형 언어 하스켈은 반복 명령어를 아예 제공하지 않는다. 하지만 코틀린은 멀티 패러다임 언어이기 때문에 반복 명령어를 지원한다. 모든 반복문은 재귀로 구현할 수 있다. 재귀는 반복문에 비하여 복잡한 알고리즘을 간결하게 표현할 수 있지만, 다음과 같은 문제점을 가진다.

* 동적 계획법 방식에 비해서 성능이 느리다.
* 스택 오버플로우 오류가 발생할 수 있다.

> 함수형 프로그래밍에 익숙해지기 위해서 반복문 대신 재귀를 사용할 것을 권장한다.

## 메모이제이션으로 성능 개선하기

**메모이제이션이란, 어떤 반복된 연산을 수행할 때 이전에 계산했던 값을 캐싱해서 중복된 연산을 제거하는 방법이다.** 연산 횟수가 줄어 속도가 개선되므로 동적 계획법의 핵심이 되는 기술이기도 하다.

### 재귀적인 방식의 피보나치 수열 예제

앞의 피보나치 수열의 예를 다시 한번 살펴보자. 결과를 확인하기 위해 fiboRecursion 함수에 로그를 추가했다.

```kotlin

fun main() {
    println(fiboRecursion(10))
}

private fun fiboRecursion(n: Int): Int {
    println("fiboRecursion($n)")
    
    return when (n) {
        0 -> 0
        1 -> 1
        else -> fiboRecursion(n - 1) + fiboRecursion(n - 2)
    }
}

```

fiboRecursion(6)을 실행해보면 아래와 같다.

```
fiboRecursion(6)
fiboRecursion(4)
fiboRecursion(2)
fiboRecursion(0)
fiboRecursion(1)
fiboRecursion(3)
fiboRecursion(1)
fiboRecursion(2)
fiboRecursion(0)
fiboRecursion(1)
fiboRecursion(5)
fiboRecursion(3)
fiboRecursion(1)
fiboRecursion(2)
fiboRecursion(0)
...
```

총 24번 호출되었다. 더 큰 값을 테스트할수록 로그는 기하급수적으로 늘어난다. 함수 내부에서 자기 자신을 두 번 호출하기 때문에 단계가 지날 때마다 호출 개수는 두 배씩 늘어난다. 따라서 n이 N일 때 시간 복잡도는 O(2n제곱)이 된다. 그리고 이전에 했던 연산 결과를 저장해 두지 않았기 때문에 같은 연산을 여러 번 호출한다. 상당히 비효율적인 걸 알 수 있다.

### 메모이제이션을 사용한 피보나치 수열 예제

메모이제이션을 이용하면 불필요한 재귀 호출을 줄이고, 성능을 개선할 수 있다. 위의 코드예제를 메모이제이션을 이용하여 재작성 해보자.

```kotlin
var memo = Array(100, { -1 })

fun fiboMemoization(n: Int) = when {
    n == 0 -> 0
    n == 1 -> 1
    memo[n] != -1 -> memo[n]
    else -> {
        println("fiboMemoization($n)")
        memo[n] = fiboMemoization(n - 2) + fiboMemoization(n - 1)
        memo[n]
    }
}
```

배열 memo를 연산의 결괏값이 될 수 없는 -1로 초기화해 놓고, 중간 연산 결과를 저장하여 사용했다. 중간 결과의 값이 -1이 아니라면 이미 연산된 것이므로 종료조건을 추가했다. fiboMemoization(6)을 실행하면 다음과 같이 출력된다.

```
fiboMemoization(6)
fiboMemoization(4)
fiboMemoization(2)
fiboMemoization(3)
fiboMemoization(5)
```

fiboMemoization은 총 5번 호출되었다. 시간 복잡도는 O(N)으로 개선된다. 동일한 값으로 두 번 재귀 호출하지 않는다. 이와 같이 메모이제이션을 사용하면 비효율적인 호출을 제거해서 성능을 개선할 수 있다.

### 재귀의 문제점을 함수적으로 해결하기

메모이제이션을 이용해 재귀의 효율성을 높이기는 했는데, 이 방법이 함수적인 해볍인지는 살펴봐야 한다. 순수한 함수의 요건을 다시 따져보자.

순수한 함수는 부수효과가 없어야 한다. 그러나 예제에서는 memo라는 전역변수를 선언함으로써 부수효과가 발생했다. 또한 순수한 함수는 불변성을 띤다. 그러나 memo를 생성하고 재귀 함수 내에서 값을 수정하였으므로 불변성을 지키지 못하였다. 따라서 이 해법은 함수적이지 않다.

그렇다면 함수형 프로그래밍에서는 어떻게 메모이제이션으로 재귀의 성능을 개선할 수 있을까? 부수효과를 없애기 위해 이미 계산된 값을 별도의 메모리에 저장하지 않고, 재귀 함수의 매개변수로 받아서 캐싱을 대신하면 된다.

```kotlin
fun main() {
    println(fiboFP(6)) // 8 출력
}

fun fiboFP(n: Int): Int = fiboFP(n, 0, 1)

tailrec fun fiboFP(n: Int, first: Int, second: Int): Int = when (n) {
    0 -> first
    1 -> second
    else -> fiboFP(n - 1, second, first + second)
}
```

첫 번째 fiboFP 함수는 재귀 함수의 입력을 제한하기 위한 함수로 내부에서 실제로 재귀 호출을 수행하는 함수를 호출한다. 두 번째 fiboFP 함수는 재귀 호출을 수행하는 함수로 이전에 계산된 값을 매개변수로 받는다. 입력 n은 피보나치 수열의 크기를 의미하며 하나씩 감소되어 1이 되면 second를 반환하고 종료한다. first는 현재 피보나치 수열의 바로 이전 값이고, second는 현재 피보나치 수열의 두 단계 이전 값이다.

### 꼬리 재귀로 최적화 하기

# 재귀적 자료구조

sealed class를 사용해서 만든 대수적 데이터 타입을 활용하면 재귀적 자료구조를 만들 수 있다. 아래의 FunList가 바로 재귀적 자료구조의 대표적인 예다.

```kotlin
selaed class FunList<out T>
object Nil : FunList<Nothing>()
data class Cons<out T>(val head: T, val tail: FunList<T>): FunList<T>()
```

FunList는 sealed class를 사용해서 만든 대수적 데이터 타입이다. 따라서 Nil이거나 Cons가 될 것이다. Cons를 보면 두 개의 필드를 가지고 있는데, 첫 번째 필드는 리스트를 구성하는 첫 번째 값을 나타내는 head이고, 두 번째 필드는 나머지 값들의 리스트를 나타내는 tail이다. 여기서 tail의 타입을 보면 자기 자신을 나타내는 FunList인 것을 알 수 있다. 이렇게 **대수적 데이터 타입에서 구성하는 값 생성자의 필드에 자신을 포함하는 구조를 재귀적 자료구조**라고 한다. 

값을 1만 가지고 있는 리스트 [1]을 Funlist로 만들면 Cons(1, Nil)과 같다. 여기서 첫 번째 매개변수는 값이고 두 번째 매개변수는 비어 있는 FunList이다. 마찬가지로 [1, 2]는 Cons(1, Cons(2, Nil))이다. 첫 번째 매개변수에는 값이 있고, 두 번째 매개변수에는 FunList가 있다. 따라서 FunList는 Nil이거나 '값 + 다른 FunList'의 조합이다. 이러한 재귀적 자료구조를 만들면 생성자 패턴 매칭을 사용하기에 용이하다.

다음은 FunList의 값들을 뒤집어서 출력한 코드다.

```kotlin
fun main() {
    val reversed = reverse(Cons1, Cons(2, Cons(3, Nil)))
    printFunList(reversed)
}

fun <T> reverse(list: FunList<T>, acc: FunList<T> = Nil) {
    return when (list) {
        Nil -> acc
        is Cons -> reverse(list.tail, acc.addHead(list.head))
    }
}
```

> reverse 함수에서 FunList를 구성하는 값 생성자에 의한 패턴 매칭을 이용했다. 재귀적 자료구조가 아닌 코틀린의 기본 리스트는 이러한 생성자 패턴 매칭을 사용할 수 없다.