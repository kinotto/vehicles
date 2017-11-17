import {Observable} from 'rxjs';
console.log('observables');

const createSubscriber = ((type: any) => {

    return {
        next: (el: any) => console.log(`next ${type} - ${typeof(el) === 'object' ? JSON.stringify(el) : el}`),
        complete: () => console.log(`complete ${type}`),
        error: (err: any) => console.log(`err ${type} ${err}`)
    }
})

Observable.interval(300)
.take(4)
.map(el => (Math.random() * 100).toFixed(2))
.subscribe(createSubscriber('interval'));

let arr = [
    Observable.of({pippo: 'pluto'}),
    Observable.of('pippo')
]


Observable.forkJoin(arr)
.subscribe(createSubscriber('fork'))


Observable.from('pippo')
.subscribe(createSubscriber('pippo'))

Observable.from(['minnie', 'paperino'])
.subscribe(createSubscriber('arrayFrom'))

Observable.range(0, 10)
.subscribe(createSubscriber('range'))

Observable.from([0, 1, 2, 3, 4, 5])
.map(el => el * 10)
.flatMap(() => Observable.of('ciaone'))
.subscribe(createSubscriber('switchmap'))


let timer$ = Observable.create((observer: any) => {
    let interval = setInterval(() => {
        observer.next('finito!');
  
    }, 1000)

    //unsubscription cb
    return () => clearInterval(interval)

})

let subscription = timer$
.take(20)
.subscribe(createSubscriber('timer$'))

setTimeout(() => subscription.unsubscribe(), 5000);

