import React from 'react'
import withContext from "../Context"
import Header from "./Header"
const HeaderWithContext = withContext(Header);
// Stateless functional component to be called if there is an unhandled error
export default function UnhandledError() {
                return (
                    <div id="root">
                            <div>
                            <HeaderWithContext />
                            </div>
                        <h1>Error</h1>
                        <p>Sorry! We just encountered an unexpected error.</p>
                    </div>
                    )
                   }
