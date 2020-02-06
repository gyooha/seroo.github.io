---
title: "물을 담은 용기"
date: 2020-02-06
desc: "하루에 하나씩 알고리즘 풀기"
permalink: "/algorithm/container_with_water"
keywords: "Algorithm"
categories: 
    - Algorithm
tags: 
    - Algorithm 
    - LeetCode
icon: icon-html
---

물을 담은 용기가 있다. 물을 담은 용기의 어느 세로 라인을 각각의 엔드포인트로 잡아야 물을 가장 많이 채울 수 있는지 찾아라!

## SampleInput
```
[1,8,6,2,5,4,8,3,7]
```

## SampleOutput
```
49
```

## 문제 풀이
* 주어진 Input을 통해 시작점과 끝점을 구한다.
* 루프를 돌면서 현재 시작점의과 끝점의 작은 값을 기준으로 최대넓이 구한다.
* 구한 최대넓이는 항상 제일 큰 값으로 갱신해준다.
* 시작점과 끝점중 작은값 이었던 지점을 한 칸씩 옮긴다.
* 구한 최대넓이를 반환한다.

```kotlin
class Solution {
    fun maxArea(height: IntArray): Int {
        var left = 0
        var right = height.size - 1
        var maxArea = 0
        
        while(left < right) {
            maxArea = Math.max(maxArea, (Math.min(height[left], height[right]) * (right - left)))
            
            if (height[left] < height[right]) {
                left++
            } else {
                right--
            }
        }
        
        return maxArea
    }
}
```

## 참조
* https://leetcode.com/problems/container-with-most-water/