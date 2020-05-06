---
title: "Android RecyclerView"
date: 2020-04-12
last_modified_at: 2020-04-12
desc: "안드로이드 RecyclerView"
keywords: "Android,RecyclerView"
permalink: "/android/recyclerview"
categories: 
    - Android
tags: 
    - Android
    - RecyclerView
---

* RecyclerView
    * 재사용하는 리스트뷰 뷰를 몇 개 생성해 놓고 재사용 한다.
* LayoutManager
    * 아이템 뷰를 측정하고 배치하는 역활을 한다.
    * 뷰가 유저에게 보이지 않게되면 어떻게 할지 정책을 결정한다.
    * LayoutManager에 따라서 어떤 방식으로 스크롤할지 정하게 된다.
        * Vertical, Horizontal, grid, staggered grids
* ItemDecoration
    * 리사이클러뷰 어댑터 데이터 셋에서 특정한 아이템 뷰에 특별한것을 그리거나, offset을 추가할 수 있다.
    * 아이템 뷰 사이에 디바이더를 그리거나, 하이라이팅, 시각적 그룹화의 경계를 만들 수 있고, 이보다 더 많은것을 추가로 할 수 있다.
* ViewHolder
    * 리스트의 각각의 뷰를 표시한다. 뷰 홀더에 따라 다른 아이템이 표시될 수 있다.