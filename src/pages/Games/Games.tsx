import React from "react";
import {Link} from 'react-router-dom';

export const Games: React.FC = () => {
    return <div>
        Game Page
        <p>
            <Link to={'/games/audiocall/textbook'}>
                AudioCall
            </Link><br/>
            <Link to={'/games/speakit/textbook'}>
                Speak It
            </Link><br/>
            <Link to={'/games/savannah/textbook'}>
                Savannah
            </Link>
        </p>
    </div>
}
