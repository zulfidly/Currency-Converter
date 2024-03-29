    import { reactive } from 'vue';
    import axios from 'axios';

    export const mainObj = reactive({
        allSymbols: undefined,
        dynList: [],
        netlifyURL: 'https://fidly-currex.netlify.app/api',
        userSettings: {
            convertFrom: "MYR",
            convertTo: undefined,
            countryFrom: undefined,
            countryTo: undefined,
            amount: "",
            cFromFormattedForDisplay: "",
        },
        fetched: {
            lastUpdated: "",
            rate: "",
            result: "",
        },
        // chartingData: undefined,
        // isChartDisplaying: false,
        isFetching: false,
        isSwapping: false,
        isFetchError: false,
    })

//////// functions responding to fetchAPI()
    export const fetchErrorStyle = { ping: ["animate-ping"] }
    export function fetchAPI(fu, endpoint) {
        mainObj.isFetchError = false
        mainObj.isFetching = true
        axios
            .get(endpoint, {timeout: 8000})
            .then((response) => {
                funcLib[fu](response.data)
                mainObj.isFetching = false
             }) 
             .catch((error) => {
                 console.log(error) 
                 reInitStates()
                 mainObj.isFetchError = true
                 mainObj.fetched.result = "*timeout*"
            })
    }
    const funcLib = {
        constructMainObj : function(x) {
            let y = new Map(Object.entries(x.currencies))
            let array = []
            y.forEach((v, k) => {
                let temp = { symbol: k, description: v, flagURL:flagScrapper(k.toLowerCase()) }
                array.push(temp)
            })
            mainObj.allSymbols = array
            mainObj.dynList = array
        },
        convertEndpoint : function(x) {
            mainObj.fetched.lastUpdated = "requested " + dateFormatter(x.info.timestamp)
            mainObj.fetched.rate = rateStringFormatter(x.info.quote)
            mainObj.fetched.result = currencyFormatter(mainObj.userSettings.convertTo, x.result)
        },
        // getChartingData: function(x) {
        //     let y = new Map(Object.entries(x.quotes))
        //     console.log(y);
        //     structureChartData(y)
        // }
    }

//////// re-init states (only when theres a fetch error)
    function reInitStates() {
        mainObj.isFetching = false
        mainObj.isSwapping = false
        // mainObj.isChartDisplaying = false
    }
////////header stylings
    export const headerStyleIs = {
        header: ["w-full h-auto bg-[var(--color-background-soft)] flex justify-evenly lg:justify-between items-center rounded-md lg:col-span-2"],
        github: ["px-4"],
        exchost: ["px-3 lg:p-0 lg:pr-8"],
        msg: ["pr-5 text-right text-xs text-[var(--color-text)] italic"],
        disclaimer: ["text-center text-[var(--color-text)] lg:col-span-2"],
    }

////////button stylings
    export const buttonStyleIs = {
        dynDropList: ["w-full h-14 px-2 flex justify-start items-center gap-x-3 rounded-lg lg:hover:bg-[var(--color-background-mute)] lg:hover:scale-[0.98] transition-all ease-out duration-200"],
        clear: ["absolute right-[10px] py-1 px-4 border border-2 border-[var(--color-border)] rounded-lg active:scale-90 ease-out duration-150"],
        convertBtn: [`px-6 py-2 w-auto h-auto rounded-full text-2xl font-normal  flex items-center tracking-widest transition-all ease-out duration-700`],
        convertBtnActive:    [" z-0 text-[var(--color-text)] bg-[var(--color-bg-convert-btn)]"],
        convertBtnNotActive: ["z-0 text-[var(--color-background)] bg-[var(--color-background-mute)]"],
    }
//////// swap button stylings
    export const swapIconStyle = {
            init : ["transition-all ease-out duration-700 fill-[var(--color-background-mute)]"],
            swapOn: ["fill-[var(--swap-btn)]"],
        }

//////// z-indexes
    // export const viewTTMstyle = {
    //     initPoly: ["transition-all ease-out duration-700 fill-[var(--color-background-mute)]"],
    //     chartPoly: ["fill-[var(--viewTTM)]"],
    //     initPath: ["transition-all ease-out duration-700 fill-[var(--color-background-mute)]"],
    //     chartPath: ["fill-[var(--color-text)]"],
    // }

//////// z-indexes
    export const tide = {
        lower: ["-z-20"],
        low: ["-z-10"],
        normal: ["z-0"],
        high: ["z-10"],
        higher: ["z-20"],
    }

////////button text label styling
    export const symbolTextStyleIs = {
        allsymbols: ["text-lg font-semibold"] 
    }

//////// UL styling
    export const ulStyleIs = {
        init: ["absolute w-full max-h-[80vh] border border-1 top-full overflow-auto rounded-lg grid grid-cols-1 bg-[var(--color-background-soft)]"],
        show: ["opacity-100 z-20 left-0 transition-all ease-out duration-200"],
        hide: ["opacity-0 -z-20 left-full"],
        li: ["px-4"],
        noResult: ["py-6 text-center text-md"],
    }

////////for input text field styling
    export const convFromCtnr = {
        outestInit: [" -translate-x-1/2 left-1/2"],
        onFocusInput: ["z-10 w-11/12 lg:w-full absolute lg:relative top-[20px] lg:top-0 transition-all ease-out duration-200"],
        outest: ["w-full top-0"],
        inner1: ["relative h-auto p-1  w-full grid grid-cols-1 overflow-x-clip"],
        inner2: ["h-auto w-full flex justify-center items-center"],
    }

//////// amount input field styling
    export const inputStyle = {
        symbolSearchInput: ["bg-[var(--color-background-mute)] text-xl w-full h-[50px] pl-14 rounded-md tracking-wider placeholder:italic placeholder:text-sm"],
        amtinput: ["bg-[var(--color-background-mute)] text-center text-xl w-full h-[50px] rounded-r-md tracking-widest flex items-center placeholder:text-center placeholder:text-sm italic"],
    }

//////// dashboard stylings
    export const dashboardStyle = {
        outest: ["lg:col-span-2"],
        ctnr: ["grid lg:block grid-cols-1 gap-y-4 mt-5 lg:col-span-2"],
        convertBtnDiv: ["flex justify-evenly"],
        baseNameTag: ["bg-[var(--color-background-mute)] rounded-l-md text-xl h-[50px] px-3 flex items-center border-dotted border-r-[0.5px] border-[var(--color-text)]"],
        basecurr: ["text-xl text-center tracking-wider"],
        baseCountry: ["text-md text-center tracking-wider"],
        outcurr: ["text-xl text-center tracking-wider"],
        outCountry: ["text-md text-center tracking-wider"],
        rate: ["text-center text-md tracking-wide "],
        lastUpdate: ["text-center text-sm italic tracking-wide"],
    }

//////// helper functions
    const flagScrapper = (x) => {
      const noflag = "cuc, cnh, btc, clf, mru, sdg, ssp, stn, ves, xag, xau, xdr, xpd, zwl, xpt, zmk, sle, lvl, byr"
      x = x.toLowerCase()
      if(noflag.includes(x)) {
          return "/IconDollar.svg"
      } else {
          return `https://wise.com/public-resources/assets/flags/rectangle/${x}.png`
      }
    } 

    const rateStringFormatter = (r) => {
        let x = mainObj.userSettings.convertFrom
        let y = mainObj.userSettings.convertTo
        let z = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 4 }).format(r)
        return `${x} 1.00 = ${y} ${z}`

    }
    export const currencyFormatter = (symbol, amount) => {
        if(Number(amount)) {
            let formatter = new Intl.NumberFormat(undefined, {currency: symbol, style:"currency"})
            return formatter.format(amount)
        } else {
            console.log('cant get result');
        }
    }
    const dateFormatter = (d) => {
        let formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', hour12: true, timeStyle: 'short' }) //long = DD MMM YYYY
        return formatter.format(Date.now())
    }
    export const swapCurrencies = () => {
        mainObj.isSwapping = true
        let Fid = document.getElementById("duplicateConvertFrom").firstElementChild
        let Tid = document.getElementById("duplicateConvertTo").firstElementChild
        let temp = ["swappingFrom_To", "swappingTo_From"]
        let random1 = Math.floor(Math.random() * temp.length)
        let random2 = Math.floor(Math.random() * temp.length)
        Fid.classList.add(temp[random1])
        Tid.classList.add(temp[random2])

        var r = document.querySelector(':root')
        var rs = getComputedStyle(r)
        let delay = rs.getPropertyValue("--swap-duration").trim()
        if(delay.includes("ms")) {
            delay = Number(delay.replace(new RegExp("[ms]", "ig"), ""))
        } else if(delay.includes("s")){
            delay = Number(delay.replace(new RegExp("[s]", "ig"), "")) * 1000
        } else { console.log('invalid time format in CSS');}

        setTimeout(() => {
            Fid.classList.remove("swappingFrom_To")
            Fid.classList.remove("swappingTo_From")
            Tid.classList.remove("swappingFrom_To")
            Tid.classList.remove("swappingTo_From")
            document.getElementById("duplicateConvertTo").innerHTML = Fid.outerHTML
            document.getElementById("duplicateConvertFrom").innerHTML = Tid.outerHTML
            let q = mainObj.userSettings.convertFrom.toString()
            let w = mainObj.userSettings.convertTo.toString()
            mainObj.userSettings.convertFrom = w
            mainObj.userSettings.convertTo = q
            mainObj.isSwapping = false
        }, delay)
    }
    
    export const getStartEndDates = () => {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;
        const now = Date.now()

        const end_d = new Date(now - day).getDate()
        const end_m = new Date(now - day).getMonth() + 1            // Jan is 0, Dec is 11
        const end_y = new Date(now - day).getFullYear()
        const end_date = end_y.toString().padStart(2, "0") + "-" + end_m.toString().padStart(2, "0") + "-" + end_d.toString().padStart(2, "0")

        const start_d = new Date(now - year - day).getDate()          // 1 to 31
        const start_m = new Date(now - year - day).getMonth() + 1     // API max time frame is 366 days, Jan is 0
        const start_y = new Date(now - year - day).getFullYear()      // in YYYY
        const start_date = start_y.toString().padStart(2, "0") + "-" + start_m.toString().padStart(2, "0") + "-" + start_d.toString().padStart(2, "0") 
        return { startDate: start_date, endDate: end_date }
    }
    
    // const structureChartData = (map) => {
    //     mainObj.chartingData = [["Date", "Rates"]]
    //     let temp = []
    //     let regex = new RegExp("/", "g")
    //     map.forEach((rate, date) => {
    //         let d = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short'}).format(new Date(date))
    //         d = d.replace(regex, "-")
    //         let r = Object.values(rate)
    //         r = r[0].toFixed(4)
    //         temp = [d, Number(r)]
    //         mainObj.chartingData.push(temp)
    //     })    
    //     mainObj.isChartDisplaying =  true
    //     console.log(mainObj.chartingData);
    // }
