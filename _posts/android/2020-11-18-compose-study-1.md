---
title: "컴포즈 스터디 - 1"
date: 2020-11-18
last_modified_at: 2020-11-18
desc: "컴포즈 스터디(1)"
keywords: "Compose,Android"
permalink: "/study/compose-1"
categories: 
    - Android
tags: 
    - Compose
    - Android
---

1. 생각보다 생각한 뷰를 그리기 되게 어렵다.
2. 컴포넌트가 분리되다 보니 이벤트 전달이 매끄럽지 않음
    * 추가와 수정 기능 TopBar에 OnClick과 리스트에서 선택한 데이터 동기화? 마찬가지로 플로팅 버튼을 사용할 경우도 똑같음
3. 각 컴포넌트별 state로 감싸 하나의 스캐폴드로 처리하려 했지만 실패함
    * TopAppBar에서 스테이트별 뒤로가기 버튼 Visible, Invisible 형식으로 개발하려 했지만 Invisible 햇을 때 TopAppBar 타이틀 앞에 빈공간이 생김

```kotlin
@Composable
fun RootComponent(rootViewModel: RootViewModel, wordViewModel: WordViewModel, alarmViewModel: AlarmViewModel) {
    val screenState = rootViewModel.currentScreenState

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = "WordBook") },
                navigationIcon = {
                    when (screenState) {
                        ScreenState.EDITOR, ScreenState.ALARM -> {
                            // 뒤로가기 버튼 노출
                            Icon(
                                asset = Icons.Default.ArrowBack,
                                modifier = Modifier.clickable(onClick = { rootViewModel.isPopOrExit() })
                            )
                        }
                        ScreenState.HOME -> Unit // 뒤로가기 버튼 미노출
                    }
                },
                actions = {
                    when (screenState) {
                        ScreenState.HOME -> { // Title bar 노출
                            TextButton(
                                modifier = Modifier.padding(8.dp),
                                onClick = { }
                            ) {
                                Text(text = "시작", color = Color.White)
                            }
                        }
                        ScreenState.EDITOR -> Unit // 툴바 미노출
                        ScreenState.ALARM -> Unit // 툴바 미노출
                    }
                }
            )
        },
        floatingActionButton = {
            when (screenState) { // 플로팅바 노출 미노출 제어
                ScreenState.ALARM -> {
                    FloatingActionButton(onClick = {}, shape = CircleShape) {
                        Icon(asset = Icons.Default.Add, modifier = Modifier.size(16.dp))
                    }
                }
                ScreenState.EDITOR -> {
                    FloatingActionButton(onClick = {}, shape = CircleShape) {
                        Icon(asset = Icons.Default.Add, modifier = Modifier.size(16.dp))
                    }
                }
                ScreenState.HOME -> Unit
            }
        },
        bottomBar = {
            BottomNavigationComponent(rootViewModel = rootViewModel) // 바텀 네비게이션
        }
    ) {
        when (screenState) { // 스크린 전환
            ScreenState.HOME -> {
                WordCardListComponent(wordViewModel = wordViewModel) {
                    rootViewModel.addScreenState(ScreenState.EDITOR)
                }
            }
            ScreenState.EDITOR -> WordEditorComponent(wordViewModel)
            ScreenState.ALARM -> AlarmListComponent(alarmViewModel = alarmViewModel)
        }
    }
}
```

![imageProcess]({{ site.url }}{{ site.baseurl }}/assets/images/posts/image_compose_study_titlebar_space.png)

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            WordBookTheme {
                // A surface container using the 'background' color from the theme
                Surface(color = MaterialTheme.colors.background) {
                    when (rootViewModel.currentScreenState) {
                        ScreenState.HOME -> WordView(
                            rootViewModel = rootViewModel,
                            wordViewModel = wordViewModel
                        )
                        ScreenState.ALARM -> AlarmView(
                            rootViewModel = rootViewModel,
                            alarmViewModel = alarmViewModel
                        )
                        ScreenState.CREATE -> WordCreateView(
                            rootViewModel = rootViewModel,
                            wordViewModel = wordViewModel
                        )
                        ScreenState.EDITOR -> WordEditView(
                            rootViewModel = rootViewModel,
                            wordViewModel = wordViewModel
                        )
                    }
                }
            }
        }
    }
```

![imageProcess]({{ site.url }}{{ site.baseurl }}/assets/images/posts/image_compose_study_title_bar_non_space.png)

4. TextField 트러블슈팅(?)
    * MutableState로 TextField를 제어 하려 함
    * TextField에 빈 공백만 나타남
        * State : Composable이 실행되는 동안 가져올 수 있는 가변 값 홀더, 현재 RecomposeScope가 State 값의 변경 사항을 구독한다. State의 값이 변하면 값을 구독하고 있는 RecomposeScope 들이 Recomposing 작업이 스케쥴 된다. 만약 값이 같다면 Recomposing은 일어나지 않는다.
        * Remember : 계산에 의한 값 생성, 계산은 오직 composition에만 평가된다. Recomposition 에서는 항상 composition에서 생상된 값을 리턴한다.
        * saveInstanceState : remember { mutableStateOf() } 와 유사하지만, activity or process recreation 될 때 saved instans state 메커니즘과 유사하다.
