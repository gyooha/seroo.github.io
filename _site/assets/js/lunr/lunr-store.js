var store = [{
        "title": "나를 헷갈리게 하는 안드로이드 문제들 - 1(백스택)",
        "excerpt":"Android 백스택 안드로이드에는 여러가지 launchMode가 존재한다. 이 launchMode에 따라서 안드로이드의 Activity의 백스택의 쌓이는 방식이 다르다. Standard &lt;application&gt; &lt;activity android:name=\".MainActivity\"&gt; &lt;intent-filter&gt; &lt;action android:name=\"android.intent.action.MAIN\" /&gt; &lt;category android:name=\"android.intent.category.LAUNCHER\" /&gt; &lt;/intent-filter&gt; &lt;/activity&gt; &lt;activity android:name=\".B_Activity\"/&gt; &lt;activity android:name=\".C_Activity\"/&gt; &lt;activity android:name=\".D_Activity\"/&gt; &lt;/application&gt; 각 Activity에 특정 launchMode를 설정하지 않았을 때 기본적으로 standard로 설정된다. 이러한 경우 MainActivity -&gt; B_Activity로...","categories": ["Android"],
        "tags": ["Android","Activity","BackStack"],
        "url": "http://localhost:4000/categories/android/problem01",
        "teaser":null},{
        "title": "캥거루",
        "excerpt":"두 마리의 캥거루가 있다. 두 마리의 캥거루는 각각 다른 라인(x1, x2)에서 시작하고 점프 거리(v1, v2)도 다르다. 두 마리의 캥거루가 만약 어느 지점에서 만날 수 있다면 “YES” 아니라면 “NO”를 출력하는 로직을 작성하라 SampleInput 0 3 4 2 SampleOutput Yes SampleInput 0 2 5 3 SampleOutput NO 문제 풀이 fun kangaroo(x1: Int,...","categories": ["Algorithm"],
        "tags": ["Algorithm","Kangaroo","Hackerrank"],
        "url": "http://localhost:4000/algorithm/kangaroo",
        "teaser":null},{
        "title": "자료구조 - 해쉬테이블",
        "excerpt":"해쉬테이블(HashTable) 해쉬테이블은 효율적인 탐색을 위한 자료구조로서 키를 값에 대응시킨다. 가장 기본적인 해쉬테이블의 구현은 해쉬 코드와 연결리스트, 배열만 있으면 된다. 방법 키의 해쉬 코드를 계산한다 hash(key) % arrayLegnth와 같은 방법으로 해쉬 코드를 이용해 배열의 인덱스를 구한다. 배열의 각 인덱스에는 키와 값으로 이루어진 연결리스트가 존재한다. 항상 충돌에 대비해야 한다. 여기서 말하는 충돌이란...","categories": ["Datastructure"],
        "tags": ["Datastructure","HashTable"],
        "url": "http://localhost:4000/datastructure/hash_table",
        "teaser":null},{
        "title": "자료구조 - 연결리스트",
        "excerpt":"연결리스트(LinkedList) 연결리스트는 차례로 연결된 노드를 표현해주는 자료구조이다. 연결리스트는 두 종류가 있다. 단방향 연결리스트 양방향 연결 리스트 배열과 달리 연결리스트에서는 특정 인덱스를 O(1) 시간안에 접근할 수 없고, 루프를 돌아서 특정 인덱스의 노드에 접근해야 한다. 연결리스트의 장점은 O(1) 시간안에 노드를 추가하거나 삭제할 수 있다는 점이다. 단방향 연결리스트 data class LinkedListNode&lt;T&gt;(val data: T)...","categories": ["Datastructure"],
        "tags": ["Datastructure","LinkedList"],
        "url": "http://localhost:4000/datastructure/linked_list",
        "teaser":null},{
        "title": "자료구조 - 스택",
        "excerpt":"스택(Stack) 스택 자료구조는 말 그대로 쌓아 올린다는 의미이다. 스택은 LIFO(Last In First Out) 구조로 접시를 쌓아 두었다가 사용할 때와 마찬가지로, 가장 최근에 스택에 추가한 항목이 가장 먼저 제거될 항목이라는 것이다. 사용 함수 스택은 아래와 같은 함수가 있다. pop() - 스택에서 가장 위에 있는 항목을 제거한다. push(item) - 스택의 가장 위에...","categories": ["Datastructure"],
        "tags": ["Datastructure","Stack"],
        "url": "http://localhost:4000/datastructure/stack",
        "teaser":null},{
        "title": "물을 담은 용기",
        "excerpt":"물을 담은 용기가 있다. 물을 담은 용기의 어느 세로 라인을 각각의 엔드포인트로 잡아야 물을 가장 많이 채울 수 있는지 찾아라! SampleInput [1,8,6,2,5,4,8,3,7] SampleOutput 49 문제 풀이 주어진 Input을 통해 시작점과 끝점을 구한다. 루프를 돌면서 현재 시작점의과 끝점의 작은 값을 기준으로 최대넓이 구한다. 구한 최대넓이는 항상 제일 큰 값으로 갱신해준다. 시작점과...","categories": ["Algorithm"],
        "tags": ["Algorithm","LeetCode"],
        "url": "http://localhost:4000/algorithm/container_with_water",
        "teaser":null}]
