import ErrorData from './errordata';

interface AJAXError {
    status?: number;
    statusText?: string;
    data?: ErrorData;
}

export default AJAXError;