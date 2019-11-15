//闭包
// var aa = void 0;
// var a = () => {
//     var i = 0;
//     if( !aa ){
//         aa = function (){
//             console.log(i);
//         }
//     }
//     return aa
// }
// console.log( aa );
// a()()
// aa();

//正则
// console.log( aa );
// var reg = /.{8}(Function|Array)]/;
// var str = '[ooooooo Function]';
// var str1 = '[ooooooo Array]';
// console.log(
//     reg.test(str),
//     RegExp.$1,
//     reg.test(str1),
//     RegExp.$1
//     );
// var a = new RegExp( reg );
// console.log(
//     reg.test(str),
//     a.test(str),
//     reg.test(str1),
//     a.$1
//     );

//getter/setter

var person = function() {
    var _name = '';
    var obj = {};
    Object.defineProperty(obj, 'name', {
        configurable: true,
        enumerable: true,
        get: function() {
            return _name;
        },
        set: function(n) {
            _name = n;
        }
    })
    return obj;
}();

var a = {
    b: 'll',
    c: 'dd',
    d: [ 1,2,3 ],
    e: {
        a: 'a',
        b: 'b'
    }
}

function setGet( a ){
    Object.keys(a).forEach( key => {
        if( typeof a[key] === 'object' ){
            setGet(a[key])
        }else{
            Object.defineProperty( a, key, 
                {
                    configurable: true,
                    enumerable: true,
                    get: function(dd) {
                        return a[key];
                    },
                    set: function(v) {
                        a[key] = v;
                    }
                } )
        }
    } );
    return a;
}
// Object.defineProperties( b )
// a = setGet(a);

class SetObj{
    constructor( state ){
        this.state = this.addSetterAndGetter( state );
        this.setFuncArr = [];
        this.getFuncArr = [];
    }

    addSetterAndGetter = ( state ) => {
        return this.setGet( state )
    }
    setGet = ( state ) => {
        var newState = {},
            self = this;
        Object.keys(state).forEach( key => {
            if( typeof state[key] === 'object' ){
                setGet(state[key])
            }else{
                Object.defineProperty( newState, key, 
                    {
                        configurable: true,
                        enumerable: true,
                        get: function() {
                            return state[key];
                        },
                        set: function(v) {
                            self.setFuncArr.forEach( item=> { 
                                if( typeof item === 'function' ){
                                    item( v, state[key] ) 
                                }
                            } )
                            state[key] = v;
                        }
                    } )
            }
        } );
        return newState;
    }
    addSetFunc = ( cb ) => {
        console.log( cb )
        if( typeof cb === 'function' ){
            this.setFuncArr.push(cb)
        }
    }
}

//监听数组
//方法一    （不改变Array prototype）
// const arrayProto = Array.prototype
// const arrayMethods = Object.create(arrayProto)
// const newArrProto = []
// const method = [
//     'push',
//     'pop',
//     'shift',
//     'unshift',
//     'splice',
//     'sort',
//     'reverse'
// ]
// method.forEach(function (method) {
//     // 原生Array的原型方法
//     let original = arrayMethods[method];
//     // 将push，pop等方法重新封装并定义在对象newArrProto的属性上
//     // 这里需要注意的是封装好的方法是定义在newArrProto的属性上而不是其原型属性
//     // newArrProto.__proto__ 没有改变
//     newArrProto[method] = function mutator() {
//         console.log('监听到数组的变化啦！');
//         console.log( arguments[0] )
//         // 调用对应的原生方法并返回结果（新数组长度）
//         return original.apply(this, arguments);
//     }

// });
// // 将我们要监听的数组的原型指针指向上面定义的空数组对象
// // newArrProto的属性上定义了我们封装好的push，pop等方法
// var list = [1, 2]
// list.__proto__ = newArrProto;
// list.push(3);  // 监听到数组的变化啦！ 3
// console.log(list.length);
// // 这里的list2没有被重新定义原型指针，所以这里会正常执行原生Array上的原型方法
// let list2 = [1, 2];
// list2.push(3);  // 3
// var c = [1,2]
// c.__proto__ = newArrProto;
// c.push(3);

//方法二    （不改变Array prototype）

// class NewArray extends Array {
//     constructor(...args) {
//         super()
//     }
//     push(...args) {
//         console.log("监听数组的变化")
//         return super.push(...args)
//     }
// }

// let list3 = [1, 2];

//     let arr = new NewArray(...list3);
//     console.log(arr)
//     // (2) [1, 2]

//     arr.push(3);
//     // 监听到数组的变化啦！
//     console.log(arr)
// var a = new SetObj(a)

//方法三    （改变Array prototype）
const method = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
method.forEach( key => {
    var oldFunc = Array.prototype[key];
    Array.prototype[key] = function() {
        console.log( 'change' );
        oldFunc.apply( this, arguments )
    }
} )

var list = [1, 2]
list.push(3); 
document.querySelector('button').onclick = function(){
    var xhr = new XMLHttpRequest();
    var b = document.querySelector('script');
    console.log( b.src )
    xhr.open('get',b.src);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                alert(1);
                var data = xhr.responseText;
                console.log( data );
            }
        };
    }
    xhr.send();
    return
    console.log( 123 )
    var link = document.createElement('a');
    var src = getSrc()
    // link.download = 'filename.js';
    link.setAttribute("download", 'filename.html');
    link.style.display = 'none';
    //设置下载路径
    link.href = src;
    // 触发点击 1
    document.body.appendChild(link);
    link.click();
    // 移除节点
    document.body.removeChild(link);

    //触发点击 2
    // var ev = document.createEvent("MouseEvents");
    // //事件名/是否冒泡/是否可以preventDefault取消
    // ev.initMouseEvent(
    //     "click", true, false, window, 0, 0, 0, 0, 0
    //     , false, false, false, false, 0, null
    //     );
    // link.dispatchEvent(ev);
}

function getSrc(){
    var obj = {
        data: {
            arr: [123,123,123],
            a: 1,
            b: 'b',
            c: true,
            d: void 0,
            e: null,
        }
    }
    //canvas 1
    /*
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        这里在canvas上面进行一些操作

        这里导出src，然后把这里的src赋给上面的src即可
        var src = context.toDataURL('image/jpeg');
    */

    //canvas 2
    /*
        var canvas = document.getElementById('canvas');

        canvas.toBlob(function(blob) {
        var newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url);
        };

        newImg.src = url;
        document.body.appendChild(newImg);
        });
    */

    /*
        //content是文本或字符串内容
        var blob = new Blob([content]);

        //这里导出src，然后把这里的src赋给上面的src即可
        var src = URL.createObjectURL(blob);
    */
    /*
        //创建字符串对象
        var blob1 = new Blob([JSON.stringify(obj)]);

        //创建一个DOMString对象
        var s = '<div>Hello World!!</div>'
        var blob2 = new Blob([s], {type: 'text/xml'});

        //创建一个ArrayBuffer对象
        var abf = new ArrayBuffer(8);
        var blob3 = new Blob([abf], {type: 'text/plain'});
    */
    var a = document.querySelector('html').outerHTML;
    var b = document.querySelector('script');
    console.log(b.src)
    var blob = new Blob([a]);
    // return b.src
    return URL.createObjectURL(blob);
}
