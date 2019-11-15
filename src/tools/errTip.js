export default function sendErr ( type, msg ){
    switch (type) {
        case 'logErr':
            console.error( msg || 'error' );
            break;
        case 'throwErr':
            throw Error( msg || 'error' );
        default:
            console.error( msg || 'error' );
            break;
    }
}