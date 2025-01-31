export default class EventRouters {
    #api = { };
    #routers;

    constructor() { 
        this.routers = new Array()
    }

    addRouter( router ){
        this.routers.push(router)
    }
    
    addRouters( routers ) { 
        this.routers = this.routers.concat(routers) 
    }
    
    removeRouter(name) {
        for( let i = 0; i < this. routers. length; i++){
            if (this.routers[i].name === name){
                this.routers.splice(i, 1)
            }
        }
    }

    route(data) {
        for( let i = 0; i < this.routers.length; i++){
            let _r = this.routers[i]
            if (data.name === _r.name && _r.callback){
                _r.callback(this.#api, data)
            }
        }
    }

    async async_route(data) {
        for( let i = 0; i < this.routers.length; i++){
            let _r = this.routers[i]
            if (data.name === _r.name && _r.callback){
                const res = await _r.callback(this.#api, data)
                return res
            }
        }
    }
    
    addApi (key, api) {
        this.#api[key] = api
    }
}
    
    