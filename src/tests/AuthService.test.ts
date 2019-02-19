import TokenData from '../interfaces/TokenData';
import AuthService from '../services/AuthService';

describe('The AuthenticationService', () => {
    const authService = new AuthService();
    describe('when creating a cookie', () => {
        const tokenData: TokenData = {
            token: '',
            expiresIn: '1h',
        };
        it('should return a string', () => {
            expect(typeof authService.createCookie(tokenData)).toEqual('string');
        });
    });
});
