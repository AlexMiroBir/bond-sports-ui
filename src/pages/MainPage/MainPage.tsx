import React, {useCallback, useEffect, useState} from 'react';
import styles from './MainPage.module.css';
import CharactersList from "../../components/CharactersList/CharactersList";
import Favorites from "../../components/Favorites/Favorites";
import Modal from "../../components/UI/Modal/Modal";
import {Character} from "../../types/Character";

const MainPage = () => {
    const [people, setPeople] = useState<Array<Character>>([]);
    const [favorites, setFavorites] = useState<Array<Character>>(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<Character>(people[0]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((person: Character) => {
        setFavorites(prevFavorites => {
            const isFavorited = prevFavorites.some(fav => fav.id === person.id);
            if (isFavorited) {
                return prevFavorites.filter(fav => fav.id !== person.id);
            } else {
                return [...prevFavorites, person];
            }
        });
    }, []);

    const openModal = useCallback((person: Character) => {
        setCurrentPerson(person);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <div className={styles.mainPage}>
            <CharactersList
                people={people}
                setPeople={setPeople}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                openModal={openModal}
            />
            <Favorites
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                openModal={openModal}
            />
            <Modal show={isModalOpen} onClose={closeModal} person={currentPerson}/>
        </div>
    );
};

export default MainPage;
