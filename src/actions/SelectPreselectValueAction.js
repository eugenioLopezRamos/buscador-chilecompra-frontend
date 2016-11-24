//import * as types from '../constants/actionTypes';

const SELECT_PRESELECTED_VALUE = 'SELECT_PRESELECTED_VALUE';
const selectPreselectedValue = (context = this) =>  {

        let newVal ="";

        let defaultValueKey = context.state.selected.toString();
        let defaultValue = context.props.organismosPublicos[defaultValueKey];
        let keys = context.state.choices.map ( (e, i) => {

            if(Object.keys(e)[0] === context.state.selected) {
                return i;
            }


        });

        let placeholder = keys.filter (e => {
            if(e) {return e}
        })

        if(!placeholder) {
            return;
        }else {
            if(context.state.choices[placeholder]) {
                newVal = context.state.choices[placeholder][defaultValueKey];
            }
        }

        //final action to be returned
        return {
            type: SELECT_PRESELECTED_VALUE,
            value: newVal
        }
}


export {selectPreselectedValue}
