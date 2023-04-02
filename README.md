# [Currency Converter](https://fidly-currex.netlify.app/) 
## [API provided by exchangerate.host](https://exchangerate.host/#/)

## Description
 - a [VueJS](https://vuejs.org/guide/introduction.html) app (with darkmode)
 - an attempt on a tutorial by [Sigma School](https://sigmaschool.co/)
 
 ### Gaining usage understanding of :
 - v-if, v-else, v-bind, v-show directives
 - the @mousedown event listener
 - the @touchmove event listener
 - the slot tag
 - use of vue-router to allow for future code expansion (currently working only on a page with HomeView mounted)
 
 ### Non/Reactive components/properties used :
 - ref() & reactive()
 - watch()
 - computed()
 - onBeforeMount()
 
### re-conciling multiple reactive states into one state with computed() function to control elements property(i.e: button)
```
    const isSwappable = computed(() => {
        let x = mainObj.userSettings.convertFrom
        let y = mainObj.userSettings.convertTo
        let z = mainObj.isSwapping
        if(x && y && !z) return true
        else return false
    })
```

### watch()
- management of reactive states through side effects functioned with watch, i.e :
 ```
 watch(amtInput, ()=> mainObj.fetched.result = "")
 ```
- or when referring to only a particular reactive state in an object
 ```
     watch(
        () => mainObj.userSettings.convertFrom,
        () => {
            mainObj.fetched.result = undefined
            if(mainObj.userSettings.convertFrom && mainObj.userSettings.amount) {
                const formatter = new Intl.NumberFormat(undefined, {currency: `${mainObj.userSettings.convertFrom}`, style:"currency"})
                mainObj.userSettings.cFromFormattedForDisplay = formatter.format(amtInput.value)
            }
        }
    )
```

### formatting currency symbols & number achieved as following :
- credits to [Web Dev Simplified @ YouTube](https://www.youtube.com/watch?v=4oGWpTAY_hc)
```
    const currencyFormatter = (symbol, amount) => {
        if(Number(amount)) {
            let formatter = new Intl.NumberFormat(undefined, {currency: symbol, style:"currency"})
            return formatter.format(amount)
        } else {
            console.log('cant get result');
        }
    }
```
- reformatting date received from API : YYYY-MM-DD to DD MMM YYYY
```    
const dateFormatter = (d) => {
        let formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long'})
        return formatter.format(new Date(d))
    }
```

### [Axios](https://www.npmjs.com/package/axios) library used to fetch API
- elements created with its SVG contents precisely scaled
- coded in Vanilla JavaScript 
- factoring API call into single function
```
    export function fetchAPI(fu, endpoint) {
        mainObj.isFetching = true
        axios
            .get(endpoint)
            .then((response) => {
                funcLib[fu](response.data)
                mainObj.isFetching = false
             }) 
             .catch((error) => {
                 console.log(error) 
                 mainObj.fetched.result = "-try again-"
                })
    }
```
- instruction to fetch :
```
      fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/")

```
