import { fireEvent, render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import { Search } from '../../../heroes/pages/Search';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate
}))

describe('Pruebas en Search', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const {container} = render(
            <MemoryRouter>
                <Search/>
            </MemoryRouter>
        );

            expect(container).toMatchSnapshot();

    });

    test('debe de mostrar a batman y al input con el queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Search/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
        const alertMessage = screen.getByLabelText('no-hero');
        expect(alertMessage.style.display).toBe('none');
    });

    test('debe de mostrar un error si no se encuentra el heroe (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Search/>
            </MemoryRouter>
        );

        const alertMessage = screen.getByLabelText('no-hero');
        expect(alertMessage.style.display).toBe('');


    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        //en la caja de texto se debe de disparar un evento donde ingresemos literalmente un valor (superman) se simula el evento, tomamos el formulario y disparamos el evento submit, luego el valor del input debe de estar en el /navigate


        const inputValue = 'superman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <Search/>
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}});
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(mockUsedNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    });


});