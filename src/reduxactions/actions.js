export const updateCurrentUser = (data) => ({
    user:data,
    type: 'CURRENT_USER'
});

export const updateValueUser = (data) => ({
    user:data,
    type: 'CURRENT_USER_UPDATE'
});

export const setUsers = (data) => ({
    usersData:data,
    type: 'SET_USERS'
});

export const setProfiles = (data) => ({
    profilesData:data,
    type: 'SET_PROFILES'
});


export const setAccessProfile = (data) => ({
    data:data,
    type: 'SET_ACCESS'
});

export const setUserToProfile = (data) => ({
    username:data,
    type: 'SET_USERTOPROFILE'
});
