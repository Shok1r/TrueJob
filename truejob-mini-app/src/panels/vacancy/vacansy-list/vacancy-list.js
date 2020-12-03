import React, {useState} from 'react';
import VacancyListItem from '../vacancy-list-item/vacansy-list-item';

const VacancyList = () => {

    return (
        <div className="vacancy-list-container">
            <VacancyListItem className="vacancy-list-item"/>
            <VacancyListItem className="vacancy-list-item"/>
            <VacancyListItem className="vacancy-list-item"/>
            <VacancyListItem className="vacancy-list-item"/>
            <VacancyListItem className="vacancy-list-item"/>
        </div>
    )
}

export default VacancyList;