import { createStore } from "redux";

const storeReducer = (state = {lang: localStorage.getItem("lang") || "en", translate: {
    header:{
        nav:["Home","Books","Music","Videos"],
        login:"Login",
        regester:"Regester"
    },
    hero:{
        title:"Welcome to our media library",
        motivation:"where you can access a vast collection of videos, music, and books all in one place. Whether you're in the mood for a new movie, the latest album, or a classic novel, we have something for everyone. With our easy-to-use interface, you can easily find what you're looking for and start streaming or downloading in seconds. So why wait? Start exploring our library today and discover your next favorite piece of media!"
    },
    sections:{
        summeries:{
            books:"With a vast collection of books from all genres and time periods, you'll have endless options to choose from. Whether you're looking for a classic novel, a new book, or a guide on a specific topic, our easy-to-use interface makes it simple to find precisely what you're looking for.",
            music:"We offer a wide range of music from all over the world, from the latest chart-topping hits to indie and underground artists. With our easy-to-use interface, you can browse, preview and stream or download any song you want. Whether you're in the mood for some upbeat pop, some soothing classical or some heavy metal, we have something for every taste. Our music library is constantly updated with new releases and artist, so you'll never run out of options. So why wait? Start listening and exploring our music library today!",
            videos:"We offer a wide range of music from all over the world, from the latest chart-topping hits to indie and underground artists. With our easy-to-use interface, you can browse, preview and stream or download any song you want. Whether you're in the mood for some upbeat pop, some soothing classical or some heavy metal, we have something for every taste. Our music library is constantly updated with new releases and artist, so you'll never run out of options. So why wait? Start listening and exploring our music library today!"
        },
        btn:"Discover Now"
    }
}, logout: false }, action)=>{

    switch(action.type){

        case "SWITCH_LANG": return { ...state, lang: action.lang };
        case "ROUTE": return {...state, page: action.page};
        case "TRANSLATE": return { ...state, translate: action.translate };
        case "LOGOUT": return { ...state, logout: action.logout };

        default: return state;
    }
}

export const store = createStore(storeReducer);