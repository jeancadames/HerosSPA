import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../auth';
import { PublicRoute } from '../../router/PublicRoute';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { AppRouter } from '../../router/AppRouter';

describe('Pruebas en AppRouter', () => { 

    test('debe de mostrar el login si no esta autenticado', () => { 

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>    
        );

        expect(screen.getAllByText('Login').length).toBe(2);

    });

    test('debe de mostrar el componente si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Juansito Perez'
            }
        }

        render(

            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('MarvelPage')).toBeTruthy();

    });

 });