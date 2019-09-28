import WindowResize from './listenWindowResize';

export default class Ppt{
    constructor( pptBox, sidebar ){
        this.pptBox = this.setRightEl(pptBox);
        //侧边栏
        this.sidebar = sidebar && this.setRightEl(sidebar);
        //添加按钮
        this.addBox = null;
        //侧边栏缩略图
        this.sideBarThumbnailList = null;
        //主图
        this.pptList = null;
        this.init();
    }
    setRightEl = ( el ) => {
        //设置正确的dom
        if( Object.prototype.toString.call(el).indexOf('HTML') > -1 ){
            return el
        }else{
            if( typeof el === 'string' ){
                el=document.querySelector(el);
                if( !el ){
                    throw Error('未找到dom节点，请检查参数')
                }
                return el;
            }else{
                throw Error('参数必须为 dom节点或字符串')
            }
        }
    }

    init = () => {
        if( !this.sidebar ){
            let option = {
                elName: 'div', 
                option: { id: 'sidebar' }, 
                addEl: this.pptBox,
                addFun: 'append',
                save: {
                    saveName: 'sidebar'
                }
            }
            this.createElAndAppend( option )
        }
        {
            let option = {
                elName: 'div', 
                option: { id: 'pptList' }, 
                addEl: this.pptBox,
                addFun: 'append',
                save: {
                    saveName: 'pptList'
                }
            };
            this.createElAndAppend( option )
        }
        {
            let option = {
                elName: 'div', 
                option: { id: 'sideBarThumbnailList' }, 
                addEl: this.sidebar,
                addFun: 'append',
                save: {
                    saveName: 'sideBarThumbnailListsave'
                }
            };
            this.createElAndAppend( option )
        }
        {
            let option = {
                elName: 'div', 
                option: { id: 'addBox', height: this.sidebar.offsetWidth, backgroundColor: '#eee' }, 
                addEl: this.sidebar,
                addFun: 'append',
                save: {
                    saveName: 'addBox'
                }
            };
            this.createElAndAppend( option );
            //页面大小改变时，重新计算高度
            new WindowResize(this.reComputedHeight)
        }
        console.log( this.sidebar )
    }

    reComputedHeight = () => {
        if( this.addBox ){
            this.addBox.style.height = this.sidebar.offsetWidth + 'px';
        }
    }

    createElAndAppend = ( { elName, option, addEl, addFun, save } ) => {
        let el = document.createElement(elName);
        Object.keys(option).forEach( key => {
            if( 'id|class'.indexOf(key) > -1 ){
                el[key] = option[key];
            }else{
                
                el.style[key] = option[key] + ( typeof option[key] === 'string'? '': 'px' );
            }
        } )
        if( save ){
            this[save.saveName] = el;
        }
        switch (addFun) {
            case 'append':
                addEl.appendChild( el );
                break;
            case 'insertBefore':
                addEl.parentNode.insertBefore( el, addEl );
                break;
            default:
                addEl.appendChild( el );
                break;
        }
    }
}