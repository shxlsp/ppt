export const addAndRemoveListen = ( { el, eventName, func, useCapture }, isRemove ) => {
    if( isRemove ){
        el.removeEventListener( eventName, func, useCapture );
    }else{
        el.addEventListener( eventName, func, useCapture );
    }
}