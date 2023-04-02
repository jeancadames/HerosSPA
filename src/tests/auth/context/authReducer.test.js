import { render } from "react-dom";
import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth/types/types";

describe('pruebas en authReducer', () => {
    test('debe retornar el estado por defecto', () => {

        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged:false});
    });
    test('debe de llamar el login autenticar y establecer el usuario', () => {
        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Carlitos'
            }
        }

        const state = authReducer({logged: false, action});
        expect(state).toEqual({
            logged: true,
            user: action.payload
        })

        

    });
    test('debe de borrar el name del usuario y logged en false', () => {

        const state = {
            logged: true,
            user: {id: '123', name: 'Jorge'}
        }

        const action = {
            tpye: types.logout
        }

        const newState = authReducer(state, action);
        expect(newState).toEqual({logged:false});
    });

});