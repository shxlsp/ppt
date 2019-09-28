
var aa = void 0;
var a = () => {
    var i = 0;
    if( !aa ){
        aa = function (){
            console.log(i);
        }
    }
    return aa
}
console.log( aa );
a()()
aa()
console.log( aa );
var reg = /.{8}(Function|Array)]/;
var str = '[ooooooo Function]';
var str1 = '[ooooooo Array]';
console.log(
    reg.test(str),
    RegExp.$1,
    reg.test(str1),
    RegExp.$1
    );
var a = new RegExp( reg );
console.log(
    reg.test(str),
    a.test(str),
    reg.test(str1),
    a.$1
    );
