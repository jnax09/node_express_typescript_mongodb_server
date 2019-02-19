import HttpException from './HttpException';

class InvalidIDException extends HttpException {
    constructor() {
        super(404, 'Invalid ID');
    }
}

export default InvalidIDException;
