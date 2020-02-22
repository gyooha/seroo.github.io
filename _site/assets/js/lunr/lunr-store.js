var store = [{
        "title": "Android Backstack - 1",
        "excerpt":"Android 백스택 안드로이드에는 여러가지 launchMode가 존재한다. 이 launchMode에 따라서 안드로이드의 Activity의 백스택의 쌓이는 방식이 다르다. Standard &lt;application&gt; &lt;activity android:name=\".MainActivity\"&gt; &lt;intent-filter&gt; &lt;action android:name=\"android.intent.action.MAIN\" /&gt; &lt;category android:name=\"android.intent.category.LAUNCHER\" /&gt; &lt;/intent-filter&gt; &lt;/activity&gt; &lt;activity android:name=\".B_Activity\"/&gt; &lt;activity android:name=\".C_Activity\"/&gt; &lt;activity android:name=\".D_Activity\"/&gt; &lt;/application&gt; 각 Activity에 특정 launchMode를 설정하지 않았을 때 기본적으로 standard로 설정된다. 이러한 경우 MainActivity -&gt; B_Activity로...","categories": ["Android"],
        "tags": ["Android","Activity","BackStack"],
        "url": "http://localhost:4000/android/backstack",
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
        "excerpt":"스택(Stack) 스택 자료구조는 말 그대로 쌓아 올린다는 의미이다. 스택은 LIFO(Last In First Out) 구조로 접시를 쌓아 두었다가 사용할 때와 같이 가장 최근에 스택에 추가한 항목이 가장 먼저 제거될 항목이라는 것이다. 사용 함수 스택은 아래와 같은 함수가 있다. pop() - 스택에서 가장 위에 있는 항목을 제거한다. push(item) - 스택의 가장 위에...","categories": ["Datastructure"],
        "tags": ["Datastructure","Stack"],
        "url": "http://localhost:4000/datastructure/stack",
        "teaser":null},{
        "title": "자료구조 - 큐",
        "excerpt":"큐(Queue) 큐는 FIFO(First In First Out) 구조로 매표소 앞에 서 있는 사람들이 움직이는 형태와 같이, 큐에 저장되는 순서대로 큐에서 제거된다. 사용 함수 큐는 아래와 같은 함수가 있다. add(item) : 큐의 마지막에 item을 추가한다. remove() : 큐의 첫 번째 항목을 제거한다. peek() : 큐의 가장 첫번째 항목을 반환한다. isEmpty() : 큐가...","categories": ["Datastructure"],
        "tags": ["Datastructure","Queue"],
        "url": "http://localhost:4000/datastructure/queue",
        "teaser":null},{
        "title": "물을 담은 용기",
        "excerpt":"물을 담은 용기가 있다. 물을 담은 용기의 어느 세로 라인을 각각의 엔드포인트로 잡아야 물을 가장 많이 채울 수 있는지 찾아라! SampleInput [1,8,6,2,5,4,8,3,7] SampleOutput 49 문제 풀이 주어진 Input을 통해 시작점과 끝점을 구한다. 루프를 돌면서 현재 시작점의과 끝점의 작은 값을 기준으로 최대넓이 구한다. 구한 최대넓이는 항상 제일 큰 값으로 갱신해준다. 시작점과...","categories": ["Algorithm"],
        "tags": ["Algorithm","LeetCode"],
        "url": "http://localhost:4000/algorithm/container_with_water",
        "teaser":null},{
        "title": "중복되는 가장 긴 단어 찾기",
        "excerpt":"문자열에서 가장 긴 공통의 접두사(prefix)를 찾아보자! SampleInput [\"flower\",\"flow\",\"flight\"] SampleOutput \"fl\" SampleInput [\"dog\",\"racecar\",\"car\"] SampleOutput \"\" 풀이 문자열이 비어있는지 체크한다. prefix로 리스트의 첫번째 String을 변수에 저장한다. 리스트의 사이즈만큼 for loop를 돌고 그 안에서 prefix를 각 리스트의 String에 맞게 뒤에서부터 하나씩 제거한다. 공통된 문자열을 찾으면 prefix를 리턴, 아닌경우 빈 String을 리턴 class Solution...","categories": ["Algorithm"],
        "tags": ["Algorithm","LeetCode"],
        "url": "http://localhost:4000/algorithm/longest_common_prefix",
        "teaser":null},{
        "title": "3개의 합",
        "excerpt":"하나의 리스트가 주어진다. 이 리스트 안의 임의의 값 3개를 골라 더해서 0이 되는 리스트들을 찾아라. 조건 리스트와 리스트의 값은 중복될 수 없다. 풀이 배열의 사이즈가 2개 이하이면 빈 리스트를 반환한다. 받은 배열을 정렬한다. 배열의 사이즈 -2만큼 for loop를 돈다.(최소 3개의 값을 가져와야 하기 때문에) start, end 값을 정한다. i, start,...","categories": ["Algorithm"],
        "tags": ["Algorithm","LeetCode"],
        "url": "http://localhost:4000/algorithm/3sum",
        "teaser":null},{
        "title": "자료구조 - 트리(1)",
        "excerpt":"트리(Tree) 트리는 그래프의 일종으로, 노드로 이루어진 자료구조 이다. 트리는 하나의 루트 노드를 갖는다. (사실 그래프 이론상 꼭 하나의 노드일 필요는 없지만, 대부분 사용하는 트리에서는 맞는 말이다.) 루트 노드는 0개 이상의 자식 노드를 가지고 있다. 그 자식 노드는 또 0개 이상의 자식 노드를 가지고 있고, 이는 계속 반복적으로 정의 된다. 트리는...","categories": ["Datastructure"],
        "tags": ["Datastructure","Tree"],
        "url": "http://localhost:4000/datastructure/tree01",
        "teaser":null},{
        "title": "자료구조 - 트리(2)",
        "excerpt":"이진 트리 순회 트리는 아래와 같은 순회 방식이 있다. 전위(pre-order) 중위(in-order) 후위(post-order) 중위 순회(in order) 중위 순회(in order traversal)는 왼쪽 노드, 현재 노드, 오른쪽 노드 순서로 노드를 방문하는 방법을 말한다. fun inOrderTraversal(node: TreeNode?) { node?.let { inOrderTraversal(it.left) visit(it) inOrderTraversal(it.right) } } 중위 순회 방식으로 트리를 순회하게 되면 오름차순으로 방문하게 된다....","categories": ["Datastructure"],
        "tags": ["Datastructure","Tree"],
        "url": "http://localhost:4000/datastructure/tree02",
        "teaser":null},{
        "title": "자료구조 - 그래프",
        "excerpt":"그래프(Graph) 그래프는 단순히 노드와 노드 사이를 연결한 것을 하나로 모아 놓은 것과 같다. 이전에 포스팅한 트리도 그래프의 한 종류이다. 하지만 그렇다고 모든 그래프가 트리인 것은 아니다. 간단히 말해서 트리는 사이클이 없는 하나의 연결 그래프이다. 그래프의 특징 그래프는 방향성이 있을 수도 있고 없을 수도 있다. 그래프는 여러 개의 고립된 부분 그래프(isolated...","categories": ["Datastructure"],
        "tags": ["Datastructure","Graph"],
        "url": "http://localhost:4000/datastructure/graph",
        "teaser":null},{
        "title": "Android Activity - 1",
        "excerpt":"Activity Activity는 한 Application에서 다른 Application의 Activity를 호출하면 호출된 Application Activity를 호출한 Application의 Acitivty처럼 사용할 수 있는 패러다임을 중심으로 만들어졌다. 이렇게 Activity는 사용자의 상호작용을 중심으로 여러 진입지점을 제공한다. 또한, Activity는 화면(Screen)보다 작거나, 다른 Window위에 나타날 수 있는 Window를 제공하고 있으며, 이 Window는 User Interface를 그려 화면을 채운다. 이처럼 Activity는 Android...","categories": ["Android"],
        "tags": ["Android","Activity"],
        "url": "http://localhost:4000/android/activity",
        "teaser":null}]
