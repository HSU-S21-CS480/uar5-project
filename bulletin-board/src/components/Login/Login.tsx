import React from 'react';

export default function Login() {
    return(
        <div>
            <h2>Login Component</h2>
            <form>
                <label>
                    <p>username:</p>
                    <input type="text"/>
                </label>

                <label>
                    <p>password:</p>
                    <input type="password"/>
                </label>

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}
