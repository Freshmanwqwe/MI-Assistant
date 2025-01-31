export default class EventRouter{
    #name; 
    #event; 
    #callback; 

    constructor(name, event, callback) {
        this.name = name;
        this.event = event;
        this.callback = callback; 
    }
} 
    
    
    