import React from 'react';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon24Error from '@vkontakte/icons/dist/24/error';


const ErrorSnackbar = ({message, setSnackbar}) => {
    return (
        <Snackbar
            layout="vertical"
            onClose={() => setSnackbar(null)}
            before={<Avatar size={24} style={{ backgroundColor: 'var(--dynamic-red)'}}
            ><Icon24Error fill='red' width='24' height='24' /></Avatar>}
            duration={3000}>
            {message}
        </Snackbar>
    )
}

export default ErrorSnackbar;

