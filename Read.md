## CLASS COMPONENT LIFECYCLE

##### MOUNTING - called when insatance of component when created and inserted into the DOM
    - `constructor`
        - initializing state
        - binding event Handlers
        - always call super(props) to overrride this.state
    - `static getDerivedStateFromProps(props, state)`
        - when state of the components depends on changes in props overtime
        - since its static it has no access to this key word
    - `render`
        - reads props & state and return the JSX
        - DO NOT change state/interact with DOM/make ajax calls
    - `componentDidMount`
        - Invoked immediately when component and its all children are rendered into the DOM
        - cause side effects/ interact with DOM/ make ajax calls

##### UPDATING - called when component is re-rendered because of changes in state 
    - `static getDerivedStateFromProps(props, state)`
        - called for every re-rendered
    - `shouldComponentUpdate(nextProps, nextState)`
        - dictates if component should update or not based on props and state
    - render
    - `getSnapShotBeforeUpdate(prevProps, prevState)`
        - returns a value
        - before chnages are reflected in the DOM
        - used to capture some information from the DOM
            e.g you can use to capture use scroll position and perform some calculations
    - `componentDidUpdate(prevProps, prevState, getSnapShotBeforeUpdate(prevProps, prevState))`
        - called when re-render is finished
        - make ajax calls + other side effects based on prevProps and prevState
##### UNMOUNTING
    - `componentWillUnmount`
        - invoked before component is unmounted and destroyed
        - e.g here you can cancel any network requests or clearing timers
##### ERROR HANDLING
    - `static getDerivedStateFromError(error)`
    - `componentDidCatch(error, info)`
        - called when error occurs during rendering or error in a child component constructor