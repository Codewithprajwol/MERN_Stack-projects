//! here kay hunna sakxa vanda jaba homeScreen component mounts hunxa it runs and in usehook there is another useState hook use va xa and it fetching data from backend so during mount child component Contentslider haru call hunxa and there is also useState hook...so child component mount huda first console.log(data) huxna and there is also fetching and due to useState tya pani fere rendering hudai garda parent component useSate lay garda rerender hunxa ani fere child component ne rerender hunxa that's why we are getting some data extra....kina ke may be some data chado aaisya vara rerender ne vaisyaa huxa...tere parent component lay garda fere hunna sakxa  


//Below is correct above this is not correct

..so in HomeScreen component and contentSlider component what is happening is this 

when HomeScreen components mounts first it run teh useContent hook (inside there useSate hook is used) and also the useEffect hook {it runs during the mount (Remember that)} and inside useEffect there is asynchronous code so that (fetch data) works on the side stack and code goes on further execution. when it finds the (MOVIE_CATEGORIES and TV_CATEGORIES) it starts calling the child component <contentSlider /> so control goes to <contentSlider />

child component

 there is also useEffect with asynchronous code. so synchronous code runs and asynchronous codes remain in sideStack and code executes and since the parent (HomeScrenn) components has not been finished. it get finished and when the fetch respondes (here in this case axios is used) setState is called and component rerender here is some of the child component fetch has been compeleted but after parent rerender , again parent components run, but this time useEffect doesnot run since dependency array is not changed and same goes for child component. it's corresponding components useEffect will not run because dependency aray has not changed. 