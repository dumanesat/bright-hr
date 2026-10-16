import { fakerEN_GB as faker } from "@faker-js/faker";
import type { EmployeeData } from "./EmployeeData";

export function createEmployeeData(): EmployeeData {
    const startDate = faker.date.past({ years: 1 });

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `emp${faker.string.uuid().replace(/-/g, "").slice(0, 12)}@example.com`,
        phoneNumber: `07700900${faker.string.numeric(3)}`,
        startDate: startDate.toLocaleDateString("en-GB", {
            timeZone: "Europe/London",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        jobTitle: faker.person.jobTitle(),
    };
}
