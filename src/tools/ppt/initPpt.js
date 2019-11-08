import WindowResize from '../event/listenWindowResize';
import { addAndRemoveListen } from '../event/add&removeListen';
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
        //windowResize
        this.reComputed = null;
        //页面抽象数据
        this.pptPageData = [];
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
            this.createElAndAppend( option );
        }
        {
            //创建侧边栏缩略图
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
            //创建addbox
            let option = {
                elName: 'div', 
                option: {
                    id: 'addBox',
                    style: {
                        height: this.sidebar.offsetWidth, 
                        backgroundColor: 'rgba( 255, 255, 255, 0.3 )',
                        cursor: "pointer",
                    },
                    event: { 
                        "click":  "addBoxClick"
                    }
                }, 
                addEl: this.sidebar,
                addFun: 'append',
                save: {
                    saveName: 'addBox'
                }
            };
            this.createElAndAppend( option );
            //页面大小改变时，重新计算高度
            this.reComputed = new WindowResize(this.reComputedHeight);
            {
                //addbox里元素
                let option = {
                    elName: 'div', 
                    option: { className: 'addBoxMid'}, 
                    addEl: this.addBox,
                    addFun: 'append',
                };
                this.createElAndAppend( option );
            }
            {
                //addbox里元素
                let option = {
                    elName: 'div', 
                    option: { className: 'addBoxMid', id: 'addBoxCross'}, 
                    addEl: this.addBox,
                    addFun: 'append',
                };
                this.createElAndAppend( option );
            }
        }
        {
            //创建pptlist
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

        console.log( this.sidebar );
    }

    reComputedHeight = () => {
        if( this.addBox ){
            this.addBox.style.height = this.sidebar.offsetWidth + 'px';
        }
    }

    createElAndAppend = ( { elName, option, addEl, addFun, save } ) => {
        let el = document.createElement(elName);
        Object.keys(option).forEach( key => {
            switch (key) {
                case 'style':
                    Object.keys(option[key]).forEach( innerKey => {
                        el.style[innerKey] = option[key][innerKey] + ( typeof option.style[innerKey] === 'string'? '': 'px' );
                    } )
                    break;
                case 'event':
                    Object.keys(option[key]).forEach( innerKey => {
                        addAndRemoveListen( {
                            el,
                            eventName: innerKey,
                            func: this[option[key][innerKey]]
                        }, false )
                    } )
                    break;
                default:
                    el[key] = option[key];
                    break;
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

    addBoxClick = () => {
        //添加新ppt页面
        //step1 建立大页面

        console.log( 'click' )
    }
}