const {
  findMovies,
  findTicketAvailability,
  findRecommendation,
  generateRecommendation,
} = require("../2");

describe("Soal 2", () => {
  it("should generate the movies list based on the user favorite genre(10)", () => {
    const result = findMovies(["Action", "Musical"]);
    const result2 = findMovies(["Action", "Musical", "Romance", "Horror"]);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Avengers end game",
          genre: "Action",
          soldTicket: 149,
          capacity: 150,
        },
        {
          id: 4,
          name: "Superman vs Batman",
          genre: "Action",
          soldTicket: 150,
          capacity: 250,
        },
        {
          id: 5,
          name: "Transformer",
          genre: "Action",
          soldTicket: 90,
          capacity: 90,
        },
        {
          id: 11,
          name: "Fast and Furios",
          genre: "Action",
          soldTicket: 25,
          capacity: 40,
        },
        {
          id: 7,
          name: "Hamilton",
          genre: "Musical",
          soldTicket: 295,
          capacity: 300,
        },
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          soldTicket: 150,
          capacity: 200,
        },
        {
          id: 13,
          name: "Wicked",
          genre: "Musical",
          soldTicket: 75,
          capacity: 75,
        },
      ])
    );

    expect(result2).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Avengers end game",
          genre: "Action",
          soldTicket: 149,
          capacity: 150,
        },
        {
          id: 4,
          name: "Superman vs Batman",
          genre: "Action",
          soldTicket: 150,
          capacity: 250,
        },
        {
          id: 5,
          name: "Transformer",
          genre: "Action",
          soldTicket: 90,
          capacity: 90,
        },
        {
          id: 11,
          name: "Fast and Furios",
          genre: "Action",
          soldTicket: 25,
          capacity: 40,
        },
        {
          id: 7,
          name: "Hamilton",
          genre: "Musical",
          soldTicket: 295,
          capacity: 300,
        },
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          soldTicket: 150,
          capacity: 200,
        },
        {
          id: 13,
          name: "Wicked",
          genre: "Musical",
          soldTicket: 75,
          capacity: 75,
        },
        {
          id: 2,
          name: "La la Land",
          genre: "Romance",
          soldTicket: 20,
          capacity: 75,
        },
        {
          id: 3,
          name: "Beauty and the Beast",
          genre: "Romance",
          soldTicket: 50,
          capacity: 50,
        },
        {
          id: 6,
          name: "5 feet apart",
          genre: "Romance",
          soldTicket: 25,
          capacity: 45,
        },
        {
          id: 12,
          name: "Romeo and Julet",
          genre: "Romance",
          soldTicket: 15,
          capacity: 15,
        },
        {
          id: 9,
          name: "Conjuring",
          genre: "Horror",
          soldTicket: 30,
          capacity: 100,
        },
        {
          id: 10,
          name: "Annabelle",
          genre: "Horror",
          soldTicket: 10,
          capacity: 30,
        },
      ])
    );
  });

  it("should generate a availability of a movie(10)", () => {
    let user = {
      name: "Kosasih",
      ticket: 10,
      favoriteGenre: ["Action", "Musical"],
    };

    let bryan = {
      name: "Bryan",
      ticket: 100,
      favoriteGenre: ["Musical"],
    };

    let movie = {
      id: 7,
      name: "Dear Evan Hansen",
      genre: "Musical",
      soldTicket: 150,
      capacity: 200,
    };
    const result = findTicketAvailability(movie, user);
    const result2 = findTicketAvailability(movie, bryan);

    expect(result).toBe(true);
    expect(result2).toBe(false);
  });

  it("should generate a recommendation list of movies (10)", () => {
    let maria = {
      name: "Maria",
      ticket: 20,
      favoriteGenre: ["Musical", "Romance"],
    };

    let user = {
      name: "Kosasih",
      ticket: 10,
      favoriteGenre: ["Action", "Musical"],
    };

    let result = findRecommendation(user);
    let result2 = findRecommendation(maria);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 4,
          name: "Superman vs Batman",
          genre: "Action",
          soldTicket: 150,
          capacity: 250,
        },
        {
          id: 11,
          name: "Fast and Furios",
          genre: "Action",
          soldTicket: 25,
          capacity: 40,
        },
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          soldTicket: 150,
          capacity: 200,
        },
      ])
    );

    expect(result2).toEqual(
      expect.arrayContaining([
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          soldTicket: 150,
          capacity: 200,
        },
        {
          id: 2,
          name: "La la Land",
          genre: "Romance",
          soldTicket: 20,
          capacity: 75,
        },
        {
          id: 6,
          name: "5 feet apart",
          genre: "Romance",
          soldTicket: 25,
          capacity: 45,
        },
      ])
    );
  });

  it("should generate a recommendation with correct format (27)", () => {
    let user = {
      name: "Kosasih",
      ticket: 10,
      favoriteGenre: ["Action", "Musical"],
    };
    let krys = {
      name: "Krys",
      ticket: 1,
      favoriteGenre: ["Action", "Musical", "Romance", "Horror"],
    };

    let maria = {
      name: "Maria",
      ticket: 20,
      favoriteGenre: ["Musical", "Romance"],
    };

    let john = {
      name: "John",
      ticket: 2,
      favoriteGenre: ["Musical", "Comedy", "Thriller"],
    };
    let lennon = {
      name: "lennon",
      ticket: 1,
      favoriteGenre: ["Sci Fi", "Documentary", "Thriller"],
    };

    let bryan = {
      name: "Bryan",
      ticket: 100,
      favoriteGenre: ["Musical"],
    };

    let result = generateRecommendation(user);
    let result2 = generateRecommendation(krys);
    let result3 = generateRecommendation(maria);
    let result4 = generateRecommendation(john);
    let result5 = generateRecommendation(lennon);
    let result6 = generateRecommendation(bryan);
    let result7 = generateRecommendation();

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 4,
          name: "Superman vs Batman",
          genre: "Action",
          totalPrice: 1000000,
        },
        {
          id: 11,
          name: "Fast and Furios",
          genre: "Action",
          totalPrice: 1000000,
        },
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          totalPrice: 800000,
        },
      ])
    );
    expect(result2).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Avengers end game",
          genre: "Action",
          totalPrice: 100000,
        },
        {
          id: 4,
          name: "Superman vs Batman",
          genre: "Action",
          totalPrice: 100000,
        },
        {
          id: 11,
          name: "Fast and Furios",
          genre: "Action",
          totalPrice: 100000,
        },
        { id: 7, name: "Hamilton", genre: "Musical", totalPrice: 80000 },
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          totalPrice: 80000,
        },
        { id: 2, name: "La la Land", genre: "Romance", totalPrice: 40000 },
        { id: 6, name: "5 feet apart", genre: "Romance", totalPrice: 40000 },
        { id: 9, name: "Conjuring", genre: "Horror", totalPrice: 75000 },
        { id: 10, name: "Annabelle", genre: "Horror", totalPrice: 75000 },
      ])
    );

    expect(result3).toEqual(
      expect.arrayContaining([
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          totalPrice: 1600000,
        },
        { id: 2, name: "La la Land", genre: "Romance", totalPrice: 800000 },
        { id: 6, name: "5 feet apart", genre: "Romance", totalPrice: 800000 },
      ])
    );

    expect(result4).toEqual(
      expect.arrayContaining([
        { id: 7, name: "Hamilton", genre: "Musical", totalPrice: 160000 },
        {
          id: 8,
          name: "Dear Evan Hansen",
          genre: "Musical",
          totalPrice: 160000,
        },
      ])
    );

    expect(result5).toBe("No film matches the criteria");
    expect(result6).toBe("No film matches the criteria");
    expect(result7).toBe("No user accepted");
  });
});
