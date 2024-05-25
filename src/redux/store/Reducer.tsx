const initalState = {
    emp: {
            first_name: "",
            id_user: 0,
            last_name: "",
            profile: "",
            token: "",
            user: ""
        },
};

const Reducer = (state = initalState, action: any) => {

    switch(action.type){
        case "SetEntornoEmp" : {
            return {...state, emp: action.emp};
        }
        case "GetEntornoEmp" : {
            return {...state};
        }                      
        default: return state;
    }
}

export default Reducer;