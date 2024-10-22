import React, {useState, useEffect} from 'react';
import PersonCard from "../UI/Card/PersonCard/PersonCard";
import styles from './CharactersList.module.css';
import Card from "../UI/Card/Card";
import {transformApiData} from "../../utils/fetch";
import {Character} from "../../types/Character";

interface LeftSideBarProps {
    people: Character[];
    setPeople: (people: Character[]) => void;
    favorites: Character[];
    toggleFavorite: (person: Character) => void;
    openModal:(person:Character)=>void
}

const MIN_PAGE = 1;
const MAX_PAGE = 9;
const DEBOUNCE_DELAY = 500;


const CharactersList: React.FC<LeftSideBarProps> = (
    {
        people,
        setPeople,
        favorites,
        toggleFavorite,
        openModal
    }
) => {
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
                const data = (await response.json()).results;
                const transformedData = await transformApiData(data);
                setPeople(transformedData);
            } catch (e) {
                alert("Something went wrong! Please try again");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, setPeople]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleSetPage = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const {id} = event.target as HTMLButtonElement;

        if (id === 'button-prev' && page > MIN_PAGE) {
            setPage(prev => prev - 1);
        } else if (id === 'button-next' && page < MAX_PAGE) {
            setPage(prev => prev + 1);
        }
    };

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value);
    };

    const filteredPeople = people.filter(person =>
        person.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    return (
        <Card variant={'characters'}>
            <input
                type="text"
                placeholder="Search characters..."
                value={searchTerm}
                onChange={handleSearchInput}
                className={styles.searchInput}
            />

            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {filteredPeople.map((person) => (
                        <PersonCard
                            key={person.id}
                            person={person}
                            isFavorite={favorites.some(fav => fav.id === person.id)}
                            toggleFavorite={toggleFavorite}
                            onClick={()=>openModal(person)}
                        />
                    ))}
                    <div className={styles.buttonContainer}>
                        <button disabled={page === MIN_PAGE || isLoading} id="button-prev" className={styles.button}
                                onClick={handleSetPage}>
                            Prev
                        </button>
                        <button disabled={page === MAX_PAGE || isLoading} id="button-next" className={styles.button}
                                onClick={handleSetPage}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </Card>
    );
};

export default CharactersList;
