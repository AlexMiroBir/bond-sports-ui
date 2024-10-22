import React from "react";
import Card from "../Card";
import styles from './PersonCard.module.css';
import {Character} from "../../../../types/Character";

interface Props {
    person: Character;
    isFavorite: boolean;
    toggleFavorite: (person: Character) => void;
    onClick: (person: Character) => void;
}

const PersonCard: React.FC<Props> = ({person, isFavorite, toggleFavorite, onClick}) => (
    <div className={styles.conainer} onClick={()=>onClick(person)}>
        <Card variant="person">
            <div className={styles.ImgContainer}>
                <img
                    className={styles.image}
                    src={`https://github.com/vieraboschkova/swapi-gallery/blob/main/static/assets/img/people/${person.id}.jpg?raw=true`}
                    alt={person.name}
                />
            </div>
            <div className={styles.descriptionContainer}>
                <h2>{person.name}</h2>
            </div>
            <button className={styles.favoriteButton} onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(person)
            }}>
                {isFavorite ? '★' : '☆'}
            </button>
        </Card>
    </div>
);

export default PersonCard;
