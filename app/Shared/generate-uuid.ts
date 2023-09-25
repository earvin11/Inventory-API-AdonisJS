import { v4 as uuidv4, validate as isValidUuid } from 'uuid';

const generateUuid = () => {
    return uuidv4();
};

export const isUUid = ( value: string ) => {
    return Boolean(isValidUuid(value));
}


export default generateUuid;