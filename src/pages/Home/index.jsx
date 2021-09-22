/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from '../../components';
//import Switch from '@material/react-switch';
import Switch from 'react-switch';
import { ThemeProvider } from 'styled-components';
import { themeLight, themeDark, GlobalStyles } from '../../theme';

import {
  Container,
  Carousel,
  Search,
  Logo,
  Wrapper,
  CarouselTitle,
  ModalTitle,
  ModalContent,
} from './styles';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const checkedToggler = () => {
    checked === true ? setChecked(false) : setChecked(true);
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
  };

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      setQuery(inputValue);
    }
  }

  function handleOpenModal(placeId) {
    setPlaceId(placeId);
    setModalOpened(true);
  }

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <Wrapper>
        <Container>
          <Search>
            <Logo src={logo} alt="Logo do restaurante" />

            <TextField
              label="Pesquisar Restaurantes"
              // outlined (se deixar true muda o layout mas fica ruim de ver no themeDark)
              trailingIcon={<MaterialIcon role="button" icon="search" />}>
              <Input
                value={inputValue}
                onKeyPress={handleKeyPress}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </TextField>
            <label>
              <span>🌞 </span>
              <Switch
                checked={checked}
                onChange={() => checkedToggler(themeToggler())}
                // onChange={() => themeToggler(checkedToggler())}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={'#000'}
                onColor={'#6200ee'}
              />
              <span> 🌚</span>
            </label>
            {restaurants.length > 0 ? (
              <>
                <CarouselTitle>Na sua área</CarouselTitle>
                <Carousel {...settings}>
                  {restaurants.map((restaurant) => (
                    <Card
                      key={restaurant.place_id}
                      photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
                      title={restaurant.name}
                    />
                  ))}
                </Carousel>
              </>
            ) : (
              <Loader />
            )}
          </Search>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              onClick={() => handleOpenModal(restaurant.place_id)}
              restaurant={restaurant}
            />
          ))}
        </Container>
        <Map query={query} placeId={placeId} />
        <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
          {restaurantSelected ? (
            <>
              <ModalTitle>{restaurantSelected?.name}</ModalTitle>
              <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
              <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
              <ModalContent>
                {restaurantSelected?.opening_hours?.open_now
                  ? 'Aberto agora :-)'
                  : 'Fechado neste momento :-('}
              </ModalContent>
            </>
          ) : (
            <>
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
            </>
          )}
        </Modal>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Home;
