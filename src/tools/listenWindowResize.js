import ErrTip from "./errTip";
class WindowResize {
    //监听窗口大小
    constructor( cb ){
        //接收callback，窗口大小改变
        this.cbList = [];
        if( cb ){
            this.pushCb(cb)
        }
        this.init();
    }

    init = () => {
        this.saveResizeFunc = this.onResizeFunc();
        window.addEventListener( 'resize', this.saveResizeFunc )
    }

    onResizeFunc = () => {
        let id = void 0;
        return () => {
            if( id ){
                clearTimeout(id)
            }
            id = setTimeout(() => {
                console.log( '节流' );
                this.cbList.forEach( cb => {
                    if( typeof cb === 'function' ){
                        cb();
                        return;
                    }
                ErrTip( 'logErr', 'cb must be a function' );
                } )
            }, 500);
        }
    }

    saveResizeFunc = null;

    removeEvent = () => {
        window.removeEventListener( 'resize', this.saveResizeFunc )
    }

    pushCb = ( cb ) => {
        let reg = /.{8}(Function)]/;
        if( reg.test( Object.prototype.toString.call(cb) ) ){
            this.cbList.push(cb);
            return;
        }
        ErrTip( 'logErr', 'cb must be a function' );
    }

    
}

export default WindowResize;