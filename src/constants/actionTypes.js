//LOGIN/AUTH ACTIONS
    //login
//export const SEND_LOGIN_INFO_SUCCESS = 'SEND_LOGIN_INFO_SUCCESS';

//QUERY RESULT VALUES ACTIONS
export const SEARCH_FIELD_INPUT = 'SEARCH_FIELD_INPUT';
export const SELECTION_FIELD_SELECT = 'SELECTION_FIELD_SELECT';
export const SET_SEARCH_START_DATE = 'SET_SEARCH_START_DATE';
export const SET_SEARCH_END_DATE = 'SET_SEARCH_END_DATE';
export const AUTOFILLER_INPUT = 'AUTOFILLER_INPUT';
export const RUT_INPUT = 'RUT_INPUT';
export const PICK_ORGANISMO_PUBLICO = 'PICK_ORGANISMO_PUBLICO';
export const COD_LIC_INPUT_CHANGE = 'COD_LIC_INPUT_CHANGE';
export const AUTOFILLER_INPUT_CHANGE = 'AUTOFILLER_INPUT_CHANGE';
export const SEARCH_QUERY_SET_OFFSET = 'SEARCH_QUERY_SET_OFFSET';
export const SEARCH_QUERY_DECREMENT_OFFSET = 'SEARCH_QUERY_DECREMENT_OFFSET';
export const SEARCH_QUERY_INCREMENT_OFFSET = 'SEARCH_QUERY_INCREMENT_OFFSET';
export const TOGGLE_DATE_ALWAYS_FROM_TODAY = 'TOGGLE_DATE_ALWAYS_FROM_TODAY';
export const TOGGLE_DATE_ALWAYS_TO_TODAY = 'TOGGLE_DATE_ALWAYS_TO_TODAY';

// FETCHER ACTIONS
    //fetches organismosPublicos
export const ONLOAD_FETCH_ORG_PUB_SUCCESS = 'ONLOAD_FETCH_ORG_PUB_SUCCESS';
export const ONLOAD_FETCH_ORG_PUB_FAILURE = 'ONLOAD_FETCH_ORG_PUB_FAILURE';
    //fetches estadosLicitacion
export const ONLOAD_FETCH_EST_LIC_SUCCESS = 'ONLOAD_FETCH_EST_LIC_SUCCESS';
export const ONLOAD_FETCH_EST_LIC_FAILURE = 'ONLOAD_FETCH_EST_LIC_FAILURE';
    //fetches the test data 
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
    //fetch chilecompra data 
export const FETCH_CHILECOMPRA_DATA_START = 'FETCH_CHILECOMPRA_DATA_START';
export const FETCH_CHILECOMPRA_DATA_SUCCESS = 'FETCH_CHILECOMPRA_DATA_SUCCESS';
export const FETCH_CHILECOMPRA_DATA_FAILURE = 'FETCH_CHILECOMPRA_DATA_FAILURE';


// DISPLAY ACTIONS
export const TOGGLE_NAVBAR_VISIBILITY = 'TOGGLE_NAVBAR_VISIBILITY';
export const NAVBAR_OFF = 'NAVBAR_OFF';
export const CHANGE_SEARCH_TYPE = 'CHANGE_SEARCH_TYPE';
export const TOGGLE_NOTIFICATIONS_VISIBILITY = 'TOGGLE_NOTIFICATIONS_VISIBILITY';
export const HIDE_ALL = "HIDE_ALL";
//SIGNUP
    //SIGNUP RESULTS
export const USER_SEND_SIGNUP_INFO = 'USER_SEND_SIGNUP_INFO';
export const USER_SEND_SIGNUP_INFO_SUCCESS = 'USER_SEND_SIGNUP_INFO_SUCCESS';
export const USER_SEND_SIGNUP_INFO_FAILURE = 'USER_SEND_SIGNUP_INFO_FAILURE';
    //SIGNUP INPUTS
export const USER_SIGNUP_INPUT_NAME = 'USER_SIGNUP_INPUT_NAME';
export const USER_SIGNUP_INPUT_EMAIL = 'USER_SIGNUP_INPUT_EMAIL';
export const USER_SIGNUP_INPUT_PASSWORD = 'USER_SIGNUP_INPUT_PASSWORD';
export const USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION = 'USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION';

//AUTH ACTIONS
    //INPUT LOGIN INFO
export const USER_LOGIN_EMAIL_INPUT = 'USER_LOGIN_EMAIL_INPUT';
export const USER_LOGIN_PASSWORD_INPUT = 'USER_LOGIN_PASSWORD_INPUT';
    //SEND LOGIN
export const USER_SEND_LOGIN_INFO = 'USER_SEND_LOGIN_INFO';
export const USER_SEND_LOGIN_INFO_SUCCESS = 'USER_SEND_LOGIN_INFO_SUCCESS';
export const USER_SEND_LOGIN_INFO_FAILURE = 'USER_SEND_LOGIN_INFO_FAILURE';
    //REQUEST LOGOUT
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

    //VALIDATE TOKEN
export const USER_VALIDATE_TOKEN = "USER_VALIDATE_TOKEN";
export const USER_VALIDATE_TOKEN_SUCCESS = "USER_VALIDATE_TOKEN_SUCCESS";
export const USER_VALIDATE_TOKEN_FAILURE = "USER_VALIDATE_TOKEN_FAILURE";

//USER
    //MODIFY USER PROFILE ACTIONS
        //API CALL RELATED 
export const USER_MODIFY_PROFILE_DATA = "USER_MODIFY_PROFILE_DATA";
export const USER_MODIFY_PROFILE_DATA_SUCCESS = "USER_MODIFY_PROFILE_DATA_SUCCESS";
export const USER_MODIFY_PROFILE_DATA_FAILURE = "USER_MODIFY_PROFILE_DATA_FAILURE";
        // INPUT HANDLERS
export const USER_MODIFY_PROFILE_DATA_INPUT_NAME = "USER_MODIFY_PROFILE_DATA_INPUT_NAME";
export const USER_MODIFY_PROFILE_DATA_INPUT_EMAIL = "USER_MODIFY_PROFILE_DATA_INPUT_EMAIL";
export const USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD = "USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD";
export const USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD = "USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD";
export const USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION = "USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION";
export const USER_MODIFY_PROFILE_DATA_INPUT_IMAGE = "USER_MODIFY_PROFILE_DATA_IMAGE";

    //USER RESULTS ACTIONS
export const USER_GET_RESULT_SUBSCRIPTIONS = "USER_GET_RESULT_SUBSCRIPTIONS";
export const USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS = "USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS";
export const USER_GET_RESULT_SUBSCRIPTIONS_FAILURE = "USER_GET_RESULT_SUBSCRIPTIONS_FAILURE";

export const USER_CREATE_RESULT_SUBSCRIPTION = "USER_CREATE_RESULT_SUBSCRIPTION";
export const USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS = "USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS";
export const USER_CREATE_RESULT_SUBSCRIPTION_FAILURE = "USER_CREATE_RESULT_SUBSCRIPTION_FAILURE";

export const USER_UPDATE_RESULT_SUBSCRIPTION = "USER_UPDATE_RESULT_SUBSCRIPTION";
export const USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS = "USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS";
export const USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE = "USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE";

export const USER_DELETE_RESULT_SUBSCRIPTION = "USER_DELETE_RESULT_SUBSCRIPTION";
export const USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS = "USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS";
export const USER_DELETE_RESULT_SUBSCRIPTION_FAILURE = "USER_DELETE_RESULT_SUBSCRIPTION_FAILURE";

    //USER SEARCHES ACTIONS
export const USER_GET_SEARCHES = "USER_GET_SEARCHES";
export const USER_GET_SEARCHES_SUCCESS = "USER_GET_SEARCHES_SUCCESS";
export const USER_GET_SEARCHES_FAILURE = "USER_GET_SEARCHES_FAILURE";

export const USER_CREATE_SEARCHES = "USER_CREATE_SEARCHES";
export const USER_CREATE_SEARCHES_SUCCESS = "USER_CREATE_SEARCHES_SUCCESS";
export const USER_CREATE_SEARCHES_FAILURE = "USER_CREATE_SEARCHES_FAILURE";

export const USER_UPDATE_SEARCHES = "USER_UPDATE_SEARCHES";
export const USER_UPDATE_SEARCHES_SUCCESS = "USER_UPDATE_SEARCHES_SUCCESS";
export const USER_UPDATE_SEARCHES_FAILURE = "USER_UPDATE_SEARCHES_FAILURE";

export const USER_DELETE_SEARCHES = "USER_DELETE_SEARCHES";
export const USER_DELETE_SEARCHES_SUCCESS = "USER_DELETE_SEARCHES_SUCCESS";
export const USER_DELETE_SEARCHES_FAILURE = "USER_DELETE_SEARCHES_FAILURE"

    //GET RESULT HISTORY
export const GET_RESULT_HISTORY = "GET_RESULT_HISTORY";
export const GET_RESULT_HISTORY_SUCCESS = "GET_RESULT_HISTORY_SUCCESS";
export const GET_RESULT_HISTORY_FAILURE = "GET_RESULT_HISTORY_FAILURE";

    //GET USER NOTIFICATIONS
export const USER_GET_NOTIFICATIONS = "USER_GET_NOTIFICATIONS";
export const USER_GET_NOTIFICATIONS_SUCCESS = "USER_GET_NOTIFICATIONS_SUCCESS";
export const USER_GET_NOTIFICATIONS_FAILURE = "USER_GET_NOTIFICATIONS_FAILURE";

export const USER_DELETE_NOTIFICATION = "USER_DELETE_NOTIFICATION";
export const USER_DELETE_NOTIFICATION_SUCCESS = "USER_DELETE_NOTIFICATION_SUCCESS";
export const USER_DELETE_NOTIFICATION_FAILURE = "USER_DETELE_NOTIFICATION_FAILURE";
    // TODO: ORDER THIS

export const REORDER_RESULTS_FRONTEND_SUCCESS = "REORDER_RESULTS_FRONTEND_SUCCESS";
export const REORDER_RESULTS_FRONTEND_FAILURE = "REORDER_RESULTS_FRONTEND_FAILURE";

//MESSAGES
export const MESSAGES_DELETE_MESSAGES = "MESSAGES_DELETE_MESSAGES";

