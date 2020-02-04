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
        "teaser":null}]
