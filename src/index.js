import './index.css';
import Ppt from './tools/ppt/initPpt';
new Ppt( '#pptCanvas', '#sidebar' );
document.querySelector('button').onclick = function(){
    document.querySelector('.asd').classList.add('dsa');
}
export default Ppt;
