import bus from '../utils/bus'

export default function useMessage(){
    function setMessage(msg, type){
        bus.emit('flash', {
            message: msg,
            type: type,
        })
    }
    return { setMessage }
}