
  const BASE_URL = 'https://swapi.dev/api/';

  const fetchWrapper = (...args) => {
    return fetch(...args).then((resp) => resp.json())
  }
  const fetchList = (...args) => {
    return fetchWrapper(...args).then((data) => data.results)
  }
export const fetchAllData = async (search) => {
    const [
      planets,
      films,
      species,
      vehicles,
      starships,
      people,
    ] = await Promise.all([
      await fetchList(`${BASE_URL}/planets?search=${search}&format=json`),
      await fetchList(`${BASE_URL}/films?search=${search}&format=json`),
      await fetchList(`${BASE_URL}/species?search=${search}&format=json`),
      await fetchList(`${BASE_URL}/vehicles?search=${search}&format=json`),
      await fetchList(`${BASE_URL}/starships?search=${search}&format=json`),
      await fetchList(`${BASE_URL}/people?search=${search}&format=json`),
    ])
    // console.log("This is planet",planets)
    let allPeopleUrls = [
      ...planets.flatMap((p) => p.residents),
      ...films.flatMap((f) => f.characters),
      ...species.flatMap((s) => s.people),
      ...vehicles.flatMap((v) => v.pilots),
      ...starships.flatMap((s) => s.pilots),
      ...people.map((p) => p.url),
    ]
    
    // console.log("This is People", people);

    //  console.log("yes ",allPeopleUrls)
    // filtering out the unique values
    allPeopleUrls = allPeopleUrls.filter((p, i) => allPeopleUrls.indexOf(p) === i)
    return await Promise.all(allPeopleUrls.map((p) => fetchWrapper(p)))

  }

