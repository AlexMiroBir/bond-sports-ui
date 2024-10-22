import React from 'react';
import styles from './Modal.module.css';
import Card from "../Card/Card";
import { Character } from "../../../types/Character";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    person: Character;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, person }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <Card variant={'person-full'}>

                    <div className={styles.personCard}>
                        <img
                            className={styles.personImage}
                            src={`https://github.com/vieraboschkova/swapi-gallery/blob/main/static/assets/img/people/${person.id}.jpg?raw=true`}
                            alt={person.name}
                        />
                        <div className={styles.personInfo}>
                            <h1>{person.name}</h1>
                            <div><strong>Height:</strong> {person.height} m</div>
                            <div><strong>Mass:</strong> {person.mass} kg</div>
                            <div><strong>Birth Year:</strong> {person.birtYear}</div>
                            <div><strong>The number of films:</strong> {person.films}</div>
                            <h3>Home World:</h3>
                            <div><strong>Name:</strong> {person.homeWorld.name}</div>
                            <div><strong>Terrain:</strong> {person.homeWorld.terrain}</div>
                            <div><strong>Climate:</strong> {person.homeWorld.climate}</div>
                            <div><strong>Population:</strong> {person.homeWorld.population}</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Modal;
