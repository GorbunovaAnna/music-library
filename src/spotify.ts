export const authEndPoint = 'https://accounts.spotify.com/authorize';
const redirectURI = 'http://localhost:3000/login';
const clientID = "9b12720a1b644d62a1ff965d72dc45fd";

const scopes = ['user-read-email', 'user-read-playback-state', "user-read-currently-playing",
"user-read-playback-state", 'playlist-read-collaborative', 'playlist-modify-public', 'playlist-read-private', 'streaming', 'app-remote-controls', 'web-playback'];

export const loginUrl = `${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scopes=${scopes.join('%20')}&response_type=token&show_dialog=true`;
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



export const getTokenFromCookie = () => {
    if ('net') {
        // redirect
    }
}

export interface IAuthObject {
    access_token: string;
    expires_in: string;
    token_type: string;
}