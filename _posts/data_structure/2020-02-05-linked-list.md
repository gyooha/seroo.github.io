---
title: "자료구조 - 연결리스트"
permalink: "/datastructure/linked_list"
date: 2020-02-03
desc: "자료구조 정리"
keywords: "Datastructure,LinkedList"
categories: 
    - Datastructure
tags: 
    - Datastructure 
    - LinkedList
---

# 연결리스트(LinkedList)

연결리스트는 차례로 연결된 노드를 표현해주는 자료구조이다. 연결리스트는 두 종류가 있다.

* 단방향 연결리스트
* 양방향 연결 리스트

배열과 달리 연결리스트에서는 특정 인덱스를 O(1) 시간안에 접근할 수 없고, 루프를 돌아서 특정 인덱스의 노드에 접근해야 한다.

연결리스트의 장점은 O(1) 시간안에 노드를 <b>추가</b>하거나 <b>삭제</b>할 수 있다는 점이다.

단방향 연결리스트
```kotlin
data class LinkedListNode<T>(val data: T) {
    var next: LinkedListNode<T>? = null
}

class LinkedList<T> {
    var head: LinkedListNode<T>? = null

    fun append(value: T) {
        var n = head
        val newNode = LinkedListNode(value)

        return if (n == null) {
            head = newNode
        } else {
            while (n?.next != null) {
                n = n.next
            }

            n?.next = newNode
        }
    }

    override fun toString(): String {
        var s = "["
        var node = head
        while (node != null) {
            s += "${node.data}"
            node = node.next

            if (node != null) s+= ", "
        }

        return "$s]"
    }
}
```

양방향 연결 리스트
```kotlin
data class LinkedListNode<T>(val data: T) {
    var next: LinkedListNode<T>? = null
    var prev: LinkedListNode<T>? = null
}

class LinkedList<T> {
    var head: LinkedListNode<T>? = null
    val isEmpty get() = head == null
    fun first() = head
    fun last(): LinkedListNode<T>? {
        var node = head

        return if (node != null) {
            while (node?.next != null) {
                node = node.next
            }

            node
        } else {
            null
        }
    }

    fun append(value: T) {
        val newNode = LinkedListNode(value)
        val lastNode = this.last()

        if (lastNode != null) {
            newNode.prev = lastNode
            lastNode.next = newNode
        } else {
            head = newNode
        }
    }

    fun removeByValue(value: T) {
        var n = head
        if (n?.data == value) {
            head = head?.next
        }

        while (n?.next != null) {
            if (n.next?.data == value) {
                n.prev = n.next
                n.next = n.next?.next
            }

            n = n.next
        }
    }

    override fun toString(): String {
        var s = "["
        var node = head
        while (node != null) {
            s += "${node.data}"
            node = node.next

            if (node != null) s+= ", "
        }

        return "$s]"
    }
}
```

## 주의

노드 클래스만 있는 단방향 연결리스트에서 여러 객체가 연결리스트를 참조하고 있을 때 헤드가 바뀔 경우 특정 노드들이 이전 헤드를 가르키고 있을 수도 있다. 이러한 경우 위와 같이 Node 클래스를 포함하는 LinkedList 객체를 만드는 것이 좋다. 