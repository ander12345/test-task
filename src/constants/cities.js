import contactsMock from '../mocks/contacts';

const cities = Array.from(new Set(contactsMock.map(({ city }) => city)));

export default cities;
