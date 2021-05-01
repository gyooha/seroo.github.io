# 유니온 파인드

### 퀵 파인드

한 가지 접근 방법은 p와 q가 연결되어 있을 때 id[p]와 id[q]가 동일하다는 것이다. 즉 같은 컴포넌트에 속한 모든 사이트는 id[]의 값이 모두 같아야 한다.

#### 함수 정의

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

#### 퀵 파인드 분석

find() 작업 자체는 빠르지만, 퀵 파인드를 전체적으로 봤을 때 문제의 크기가 큰 경우 그다지 빠르지 않다. 왜냐하면 union() 에서 각 입력 쌍마다 id[] 배열 전체 순회해야 하기 때문이다.

#### 퀵 파인드 결론

퀵 파인드는 현대 시대의 컴퓨터로 실행한다 했을 때, 수가 적으면 문제 없이 동작하지만, 문제의 수가 수백만 개 ~ 수조 개의 명령을 수행 할 때는 문제가 된다. 따라서 퀵파인드 알고리즘으로는 이러한 큰 입력에 대해서 컴포넌트 개수를 구하기가 현실적으로 불가능하다.

### 퀵 유니온

퀵 유니온은 union()의 연산 속도를 높여주는 보완적인 함수를 사용하는 것이다. 퀵 파인드와 마찬가지로 사이트 배열 id[] 데이터 구조를 기반으로 한다. 하지만 퀵 파인드와 달리 좀 더 복잡한 구조를 가진다.

#### 함수 정의

```kotlin
class UF(private var count: Int) {
    // ... find, union 외의 다른 함수는 퀵 파인드와 동일하다.
    tailrec fun find(p: Int) = when {
        p != id[p] -> find(id[p])
        else -> temp
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

#### 퀵 유니온 분석

퀵 유니온 알고리즘은 언뜻 보기에도 퀵 파인드 알고리즘보다 빨라 보인다. 왜냐하면 각 사이트 쌍 입력마다 모든 배열 항목을 순회할 필요가 없다.