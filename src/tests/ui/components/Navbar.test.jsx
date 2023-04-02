import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import {MemoryRouter, Route, Routes, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../auth/context/AuthContext';
import { Navbar } from '../../../ui/components/Navbar';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    //esparce todo lo que usa la libreria, y solo se sobreescribe lo que nos interesa, en este caso el useNavigate, asi el MemoryRouter queda intacto
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate
}));



describe('Pruebas en Navbar', () => {

    test('debe de mostrar el nombre del usuario', () => {

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Juanito Carlos'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Juanito Carlos')).toBeTruthy();

    });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {


        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Juanito Carlos'
            },
            logout: jest.fn()
        }


        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const btnLogout = screen.getByRole('button');
        fireEvent.click(btnLogout);
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUsedNavigate).toHaveBeenCalledWith('/login', {'replace': true});

    });

});