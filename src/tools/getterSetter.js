
export class SetObj{
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
                            self.getFuncArr.forEach( item=> { 
                                if( typeof item === 'function' ){
                                    item( state[key] ) 
                                }
                            } )
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