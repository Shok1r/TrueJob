import React, {useState} from 'react';
import Icon20LikeOutline from '@vkontakte/icons/dist/20/like_outline';
import {Button} from '@vkontakte/vkui';

import './vacancy-list-item.css';

const VacancyListItem = () => {

    return (
        <div className="vacancy-list-item vacancy">
            <div className="vacancy__title-container">
                <h2 className="title">Title</h2>
                <Icon20LikeOutline fill={'99A2AD'}/>
            </div>
            <p className="vacancy__payment">1000 ₽ за час</p>
            <p className="vacancy__description">
                Требуется аниматор на детский праздник в торговом центре Рио. 
                Оплата после смены.
            </p>
            <Button className="vacancy__send" mode="secondary">Написать</Button>
        </div>
    )
}

export default VacancyListItem;