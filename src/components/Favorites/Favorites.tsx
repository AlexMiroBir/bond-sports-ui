import React from 'react';
import PersonCard from "../UI/Card/PersonCard/PersonCard";
import Card from "../UI/Card/Card";
import {Character} from "../../types/Character";

interface RightSideBarProps {
    favorites: Character[];
    toggleFavorite: (person: Character) => void;
    openModal: (person: Character) => void;

}

const Favorites: React.FC<RightSideBarProps> = (
    {
        favorites,
        toggleFavorite,
        openModal
    }) => {
    return (
        <Card variant={'favorites'}>
            <div>
                <h2>Favorites</h2>
                {favorites.length === 0 ? (
                    <p>No favorites yet</p>
                ) : (
                    favorites.map(favorite => (
                        <PersonCard
                            key={favorite.id}
                            person={favorite}
                            isFavorite={true}
                            toggleFavorite={toggleFavorite}
                            onClick={() => openModal(favorite)}

                        />
                    ))
                )}
            </div>
        </Card>
    );
};

export default Favorites;
