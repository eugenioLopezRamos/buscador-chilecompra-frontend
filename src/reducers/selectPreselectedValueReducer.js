const selectPreselectedValue = (state = {}, action) => {

    switch(action.type) {


        case 'SELECT_PRESELECTED_VALUE':
            return {
                value: "new preselected value"
            }
        default: 
            return state;


    }



}

export default selectPreselectedValue;





















































