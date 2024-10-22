import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';

interface CardProps {
    children: ReactNode;
    variant?: 'characters' | 'favorites' | 'person' | 'person-full' ;
}

const Card: FC<CardProps> = ({ children, variant = 'characters' }) => {

    const cardClass = classNames(styles.card, {
        [styles.cardCharacters]: variant === 'characters',
        [styles.cardFavorites]: variant === 'favorites',
        [styles.cardPerson]: variant === 'person',
        [styles.cardPersonFull]: variant === 'person-full',
    });

    return (
        <div
            className={cardClass}
        >
            {children}
        </div>
    );
};

export default Card;
