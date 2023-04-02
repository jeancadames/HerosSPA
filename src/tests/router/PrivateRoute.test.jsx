import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../auth';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { PrivateRoute } from '../../router/PrivateRoute';

describe('Pruebas en el <PrivateRoute/>', () => { 

    test('debe de mostrar el children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Jean'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');

    }); 


 });