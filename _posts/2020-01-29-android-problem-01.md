---
layout: post
title: "나를 햇갈리게 하는 안드로이드 문제들 - 1"
date: 2020-01-29
desc: "항상 햇갈려서 틀리기 쉬운 문제들을 정리해 본다."
keywords: "Android, 안드로이드"
categories: [Android]
tags: [Android,안드로이드,Android Activity,액티비티,백스택,BackStack]
icon: icon-html
---
# 나를 햇갈리게 하는 안드로이드 문제들 - 1

## 백스택

안드로이드에는 여러가지 launchMode가 존재한다. 이 launchMode에 따라서 안드로이드의 Activity의 백스택이 쌓이는 방식이 다르다.

### standard

launchMode를 설정 안했을 때 디폴트로 standard로 설정된다. 이러한 경우 A Activity에서 다른 B Activity로 이동하는 경우 A - B 이렇게 쌓이게 된다. A - B 로 쌓인 경우에 다시 Intent를 통해 A Activity로 이동하면 A - B - A로 쌓이게 된다.

### singleTop

launchMode를 singleTop으로 설정할 경우 standard와 약간 다르다. 일단 A - B - C - D 이렇게 Activity의 백스택이 현재 쌓여 있다고 가정해보자. 이러한 경우 D가 Top Activity라고 할 수 있다. 여기서 Intent를 통해 D Activity로 이동하면 A - B - C - D - D 가 되는것이 아니라, A - B - C - D 라는 스택은 그대로 유지 되고, D에서 onNewIntent 콜백이 불리게 된다.

### singleTask

여기서 부터 위의 방식들과 약간 다르다. singleTask로 설정된 Activity를 Intent 등으로 호출할 경우 존재하는 태스크가 없는 경우에는 새로운 태스크를 생성해 호출된 Activity를 태스크의 루트 Activity로 지정한다. 만약 분리된 태스크가 존재 하는 경우 분리된 이미 존재하는 태스크를 불러오고 onNewIntent 콜백이 불리게 된다.

## singleInstance

singleInstance로 지정된 Activity를 Intent로 호출하는 경우 singleTask와 기본적인 동작 방식은 유사하다. 하지만 같은 태스크에 Activity의 스택을 쌓는것이 아니라 다른 Activity를 Intent로 호출할 경우 새로운 태스크에 유일한 Activity로 지정한다. (즉 태스크당 Activity 1개)