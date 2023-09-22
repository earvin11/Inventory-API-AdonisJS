import * as bcrypt from 'bcrypt';

interface CompareEncrypt {
    value: string;
    valueEncrypt: string;
};

export const encrypt = ( value: string ) => {
    const valueEnctypt = bcrypt.hashSync(value, 10);
    return valueEnctypt;
};

export const compareEncrypt = (data: CompareEncrypt) => {
    return Boolean(bcrypt.compareSync(data.value, data.valueEncrypt));
};