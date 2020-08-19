---
title: "Category theory"
date: 2020-08-11
last_modified_at: 2020-08-11
desc: "함수형 프로그래밍 - 카테고리 이론"
keywords: "Functional Programming, Category theory"
permalink: "/fp/category_theory"
categories: 
    - Functioanl Programming
tags: 
    - FP
    - Functioanl Programming
    - Category theory
---

# 함수형 타입 시스템

## 카테고리 이론(순한맛)

함수형 프로그래밍은 카테고리 이론이라는 수학적 원리를 토대로 만들어졌다. 이론에는 다양한 수학적 증명과 개념들이 존재하는데, 하스켈과 같은 함수형 언어에서는 증명된 개념들의 구현체를 만들어 제공한다. 이와 같은 구현체들은 각각 쓰임새와 사용법이 다르고, 어떤 행위를 정의한 타입 클래스의 인스턴스로 작성된다.

### 펑터

펑터란? 매핑할 수 있는 것 이라는 행위를 선언한 타입클래스를 말한다. __"여기서 매핑할 수 있는 것 이라는 동작"__ 은 리스트에서 사용한 map과 동일하다.

