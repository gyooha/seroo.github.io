---
title: "유니온 파인드"
date: 2021-05-02
last_modified_at: 2021-05-02
desc: "유니온 파인드 정리"
keywords: "Algorithm,UnionFind"
permalink: "/study/algorithm/union_find"
categories: 
    - Algorithm
tags: 
    - Algorithm
    - UnionFind
---

# 유니온 파인드

## 퀵 파인드

한 가지 접근 방법은 p와 q가 연결되어 있을 때 id[p]와 id[q]가 동일하다는 것이다. 즉 같은 컴포넌트에 속한 모든 사이트는 id[]의 값이 모두 같아야 한다.

### 함수 정의

```kotlin
class UF(private var count: Int) {
    private val id: IntArray
    
    init {
        id = IntArray(count) {
            it
        }
    }

    fun count() = count

    fun connected(p: Int, q: Int) = find(p) == find(q)

    fun find(p: Int) = id[p]

    fun union(p: Int, q: Int) {
        val pId = find(p)
        val qId = find(q)

        if (pId == qId) return

        for (i = 0 until id.length) {
            if (id[i] == pId) id[i] = qId
        }

        count--;
    }
}
```

### 퀵 파인드 분석

find() 작업 자체는 빠르지만, 퀵 파인드를 전체적으로 봤을 때 문제의 크기가 큰 경우 그다지 빠르지 않다. 왜냐하면 union() 에서 각 입력 쌍마다 id[] 배열 전체 순회해야 하기 때문이다.

퀵 파인드는 현대 시대의 컴퓨터로 실행한다 했을 때, 수가 적으면 문제 없이 동작하지만, 문제의 수가 수백만 개 ~ 수조 개의 명령을 수행 할 때는 문제가 된다. 따라서 퀵파인드 알고리즘으로는 이러한 큰 입력에 대해서 컴포넌트 개수를 구하기가 현실적으로 불가능하다.

## 퀵 유니온

퀵 유니온은 union()의 연산 속도를 높여주는 보완적인 함수를 사용하는 것이다. 퀵 파인드와 마찬가지로 사이트 배열 id[] 데이터 구조를 기반으로 한다. 하지만 퀵 파인드와 달리 좀 더 복잡한 구조를 가진다.

### 함수 정의

```kotlin
class UF(private var count: Int) {
    // ... find, union 외의 다른 함수는 퀵 파인드와 동일하다.
    tailrec fun find(p: Int) = when {
        p != id[p] -> find(id[p])
        else -> p
    }

    fun union(p: Int, q: Int) {
        val i = find(p)
        val j = find(q)

        if (i == j) return

        id[i] = j

        count--;
    }
}
```

### 퀵 유니온 분석

퀵 유니온 알고리즘은 언뜻 보기에도 퀵 파인드 알고리즘보다 빨라 보인다. 왜냐하면 각 사이트 쌍 입력마다 모든 배열 항목을 순회할 필요가 없다.

퀵 유니온의 경우 입력 쌍들이 모두 같은 컴포넌트에 속한다고 할때 최악의 조건에서 실행 시간이 제곱 시간이라는 것이 쉽게 도출된다. 입력 쌍이 0 - 1, 0 - 2, 0 - 3 의 순서로 들어온다고 할 때 N - 1개의 쌍 뒤에 같은 집합에 속하는 N개의 사이트를 얻게 된다. 그리고 퀵 유니온 알고리즘에 의해 높이 N - 1 인 트리가 생성된다. 이 트리는 0은 1에 링크되고 1은 2에 링크되고 2는 3에 링크되는 형태가 된다. 그리고 이 트리에서 0, i 쌍 입력에 대한 union() 함수의 배열 접근 횟수는 정확히 2i + 3이 된다. 따라서, N개의 쌍에 대한 find() 함수의 연산은 총 (3 + 5 + 7 + .... + 2N + 1) ~ N^2 회의 배열 접근을 유발한다.

## 가중 퀵 유니온

가중 퀵 유니온은 두 번째 트리를 첫 번째 트리에 연결할 때 임의로 연결하는 것이 아니라 각 트리의 크기를 기록해 두면서 항상 작은 트리를 큰 트리에 연결하게 한다. 이렇게 하려면 노드의 개수를 저장할 배열과 그것을 관리할 코드를 추가해야 한다. 이러한 변화로 큰 폭의 효율성 개선을 가져온다.

### 함수 정의

```kotlin
class UF(private var count: Int) {
    val id: IntArray
    val size: IntArray

    init {
        id = IntArray(count) {
            it
        }

        size = IntArray(count) {
            it
        }
    }

    fun count() = count

    tailrec fun find(p: Int) = when {
        p != id[p] -> find(id[p])
        else -> p
    }

    fun union(p: Int, q: Int) {
        val i = find(p)
        val j = find(q)

        if (i == j) return

        if (size[i] < size[j]) {
            id[i] = j
            size[j] += size[i]
        } else {
            id[j] = i
            size[i] += size[j]
        }

        id[i] = j

        count--;
    }
}
```

### 가중 퀵 유니온 분석

가중 퀵 유니온의 최악 조건은 병합할 두 트리의 크기가 항상 같을때 이다. 이러한 트리 구조가 언뜻 보기에는 복잡해 보이지만 2^N개의 노드를 가진 트리는 높이 N을 가진다는 단순한 속성을 가졌다. 더욱이 2^N개의 노드를 가진 두 트리를 병합하면 2^N+1개의 노드를 가진 트리가 생긴다. 즉 노드의 높이가 N + 1이 된다. 이러한 조건을 바탕으로 가중 퀵 유니온 알고리즘은 일반적으로 로그 시간의 성능을 가진다는 것을 증명할 수 있다.