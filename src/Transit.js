

class Transit{
    funMap = new Map()
    keySet = new Set()
    publish(name,fun){
        if(!this.funMap.get(name)){
            this.funMap.set(name,fun)
        }
    }

    subscriptions(name,...value){
        const fun = this.funMap.get(name)
        fun(...value)
    }

    publishOnlyKey(name){
        console.log('meiyou调用了---publishOnlyKey----》',name)
        if(this.funMap.has(name)){
            console.log('被调用了---publishOnlyKey----》',name)
            const fun = this.funMap.get(name)
            console.log(fun)
            fun()
        }
    }
    subscriptionsOnlyKey(name, callBack){
        if(!this.funMap.has(name)){
            this.funMap.set(name,callBack)
        }
    }

    deleteOnlyKey(name){
        this.keySet.delete(name)
    }

    delete(name){
        this.funMap.delete(name)
    }

}

const defaultTransit = new Transit();
export default defaultTransit;