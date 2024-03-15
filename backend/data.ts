import { da, faker } from "@faker-js/faker";

// each time you restart the server the data gonna change so be aware of that
export const data = Array.from({ length: 10 }).map(() => ({
  title: faker.lorem.sentence({ min: 2, max: 3 }),
  text: faker.lorem.sentences({ min: 10, max: 20 }),
  users: Array.from({ length: 100 }).map(() => ({
    name: faker.person.fullName(),
    departmnetId: faker.string.uuid().toString(),
    age: faker.date.birthdate().toISOString(),
    filesId: faker.string.uuid().toString(),
    parentId: faker.string.uuid().toString(),
    cover: faker.image.avatar(),
  })),
}));

export const dataSelect = (item: string) => {
  return data.map((e) => ({
    ...e,
    users: e.users.filter((e) => {
      return (
        Object.values(e).filter((e) =>
          e.toLocaleLowerCase().includes(item.toLocaleLowerCase())
        ).length > 0
      );
    }),
  }));
};

console.log(
  dataSelect("ae")
    .map((e) => e.users)
    .flat(1).length
);
