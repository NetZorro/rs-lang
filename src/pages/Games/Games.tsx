import React from "react";
import {Link} from 'react-router-dom';

export const Games: React.FC = () => {
    return <div>
        Game Page
        <p>
            <Link to={'/games/audiocall'}>
                AudioCall
            </Link><br/>
            <Link to={'/games/speakit'}>
                Speak It
            </Link><br/>
            <Link to={'/games/savannah'}>
                Savannah
            </Link>
        </p>
    </div>
}
