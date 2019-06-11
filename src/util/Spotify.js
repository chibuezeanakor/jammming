let accessToken, expiresIn;
const clientId = "9364ed7c179d47469880c4446ef7fa3a";
const redirectUri = "https://chibuezeanakor.github.io/jammming";
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        let accessTokenUrl = window.location.href.match(/access_token=([^&]*)/);
        let expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenUrl && expiresInUrl) {
            accessToken = accessTokenUrl[1];
            expiresIn = expiresInUrl[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            window.location = spotifyUrl;
        }
        return accessToken;
    },
    search(term) {
        let searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
        const requestHeaders = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        return fetch(searchUrl, requestHeaders).then(response => response.json()).then(jsonResponse => {
            if (jsonResponse) {
                console.log(jsonResponse);
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        };
                    });
                }
                else { return []; }
            }
            else { return; }
        });
    },
    savePlaylist(name, trackURIs) {
        if (!(name && trackURIs) || trackURIs.length === 0) {
            return;
        }

        let headers = { Authorization: `Bearer ${accessToken}` };
        let userId, playlistId;

        return fetch("https://api.spotify.com/v1/me", { headers: headers }).then(response => response.json()).then(jsonResponse => userId = jsonResponse.id).then(() => {
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name
                })
            }).then(response => response.json()).then(jsonResponse => playlistId = jsonResponse.id).then(() => {
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: trackURIs
                    })
                });
            });
        });
    }
};

export default Spotify;