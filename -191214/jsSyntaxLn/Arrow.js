console.log('%c [javaScript]Arrow関数のつかいかた', 'color:red;font-size:1.5em;')

// function(){}
// () => {}

// 従来の書き方
function timesTow(i) {console.log(i * 2)}
timesTow(2)


//  その次
const timesTow1 = function(i) {console.log(i * 2)}
timesTow1(3)


// アロー関数を使用した場合
const timesTow2 = i => console.log(i * 2)
timesTow2(4)

// 静的スコープ
// 出典: フリー百科事典『ウィキペディア（Wikipedia）』
// 静的スコープ（せいてきスコープ、英: static scope）とは、プログラミング言語におけるスコープの一種。字句のみから決定できるため、字句スコープまたはレキシカルスコープ (lexical scope) ともいう[1]。
