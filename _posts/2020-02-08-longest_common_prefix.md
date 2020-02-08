---
title: "중복되는 가장 긴 단어 찾기"
date: 2020-02-08
desc: "하루에 하나씩 알고리즘 풀기"
permalink: "/algorithm/horizontal_scanning"
keywords: "Algorithm"
categories: 
    - Algorithm
tags: 
    - Algorithm 
    - LeetCode
icon: icon-html
---

문자열에서 가장 긴 공통의 접두사(prefix)를 찾아보자!

## SampleInput
```
["flower","flow","flight"]
```

## SampleOutput
```
"fl"
```

## SampleInput
```
["dog","racecar","car"]
```

## SampleOutput
```
""
```

## 풀이

* 문자열이 비어있는지 체크한다.
* prefix로 리스트의 첫번째 String을 변수에 저장한다.
* 리스트의 사이즈만큼 for loop를 돌고 그 안에서 prefix를 각 리스트의 String에 맞게 뒤에서부터 하나씩 제거한다.
* 공통된 문자열을 찾으면 prefix를 리턴, 아닌경우 빈 String을 리턴

```kotlin
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        if (strs.isEmpty()) return ""
        
        var prefix = strs[0]
        
        for (i in 0 until strs.size) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.dropLast(1)
                if (prefix.isEmpty()) return ""
            }
        }
        
        return prefix
    }
}
```

## 참조

https://leetcode.com/problems/longest-common-prefix/