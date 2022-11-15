import SpotifyWebApi from "spotify-web-api-node";
import { getCookie } from "./cookie";

export const authEndPoint = 'https://accounts.spotify.com/authorize';


// // const scopes = [
// //     'streaming',
// //     'user-read-email',
// //     'user-read-playback-state',
// //     "user-read-currently-playing",
// //     "user-read-playback-state",
// //     'playlist-read-collaborative',
// //     'playlist-modify-public',
// //     'playlist-read-private',
// //     'app-remote-controls',
// //     'web-playback',
// //     'user-top-read',
// //     'user-follow-read',
// //     'user-modify-playback-state'
// // ];

// const scopes = [
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-read-currently-playing',
//     'app-remote-control',
//     'streaming',
//     'playlist-read-private',
//     'playlist-read-collaborative',
//     'playlist-modify-private',
//     'playlist-modify-public',
//     'user-follow-modify',
//     'user-follow-read',
//     'user-read-playback-position',
//     'user-top-read',
//     'user-read-recently-played',
//     'user-library-modify',
//     'user-library-read',
//     'user-read-email',
//     'user-read-private',
// ]

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
export const spotifyURL = 'https://api.spotify.com/v1';
export const getTokenFromUrl = (): IAuthObject => {
    return window.location.hash.substring(1).split('&').reduce((acc: any, item: string) => {
        let parts = item.split('=');

        acc[parts[0]] = decodeURIComponent(parts[1]);
        return acc;
    }, {})
}


export const setTokenToCookie = () => {

};
// export const getSpotifyApi = () =>{
//     const spotifyApiInstance = spotifyApi(); 
//     // if(!spotifyApi.getAccessToken()){
//     //     const spotifyApi = new SpotifyWebApi({
//     //         clientId: process.env.REACT_APP_CLIENT_ID,
//     //       });
//     //       if(access_token){
        
//     //         spotifyApi.setAccessToken(access_token);
//     //       }

//     // }
//     return spotifyApi = () =>{
//         return {}
//     }
    
// }


export const getTokenFromCookie = () => {
    return getCookie('token') || '';
}

export interface IAuthObject {
    access_token: string;
    expires_in: string;
    token_type: string;
}