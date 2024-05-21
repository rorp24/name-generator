let _domain = 'https://un-roliste-flemmard.com/';

if (window.location.hostname.includes('localhost')) {
    _domain = 'http://localhost/local_un-roliste-flemmard/';
}

export const domain = _domain;
