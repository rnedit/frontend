import React from 'react';

const users = (props) => {
    const users = props.users;
    return (
        <div className="App">
            <header className="App-header">
                <div className="App-intro">
                    <h2>Пользователи</h2>
                    {users.map(user =>
                        <div key={user.id}>
                            {user.username}
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default users;