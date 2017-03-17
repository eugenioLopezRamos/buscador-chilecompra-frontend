import React from 'react';


export default const CustomSelect = (props) => {

    //props:
        options as array of objects [
        {
            value,
            key,
            displayText, 
            eventHandlers: [{eventName: handler}, {anotherEvent: handler2}]
    

        }]
        select as object {
            className,
            eventHandlers: [{reactEventName: handlerfn}, {anotherReactEvent: handlerfn2}],
            key
        }
    
    function mergeHandlers = (arr) => {

            return arr.reduce((handlersObject, currentHandler) => {

                currentKey = Object.keys(currentHandler)[0];
                currentFunction = currentHandler[currentKey];
                handlersObject[currentKey] = currentFunction;
                return handlersObject;
            }, {});

    }

    const selectEventsHandlers = mergeHandlers(props.select.eventHandlers);

    const optionsEventsHandlers = mergeHandlers(props.options.eventHandlers)

    const fireChangeEvent = (element) => {

        const customCHange = new Event('change')

        element.dispatchEvent(customChange)

    }

    return <div className={props.select.className} {...handlersObject} key={props.select.key}>
            {
                props.options.map((optionObject, index) => {

                    <div
                        className={optionObject.className} 
                        key={optionObject.key}
                        {...optionEventsHandlers}
                        onClick={(self) => fireChangeEvent(self)}
                    >
                        {optionObject.displayText}
                    </div>


                });


            }




           </div>










}





