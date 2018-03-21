require.config({
    paths: {
        'jquery': "vendor/jquery-3.3.1.min",
        'firebase': ['https://www.gstatic.com/firebasejs/3.0.0/firebase', 'libs/firebase'],
        'firebaseui': ['https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui', 'libs/firebaseui']
    },
    shim: {
        'firebase': {
            exports: 'firebase'
        },
        'firebaseui': {
            exports: 'firebaseui'
        },
    }
});
