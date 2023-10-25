import { User } from '../types/User';

interface Params {
  query: string | null,
  sort?: string,
}

export const peopleFilter = (people : User[], {
  query,
}: Params):User[] => {
  let filteredPeople = [...people];

  if (query) {
    const normQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      return person.name.toLowerCase().includes(normQuery)
        || (person.name || '').toLowerCase().includes(normQuery)
        || (person.email || '').toLowerCase().includes(normQuery);
    });
  }

  // if (sort) {
  //   filteredPeople.sort((a: Person, b: Person) => {
  //     switch (sort) {
  //       case 'name':
  //       case 'sex':
  //         return a[sort].localeCompare(b[sort]);

  //       case 'born':
  //       case 'died':
  //         return a[sort] - b[sort];

  //       default:
  //         return 0;
  //     }
  //   });
  // }

  return filteredPeople;
};
