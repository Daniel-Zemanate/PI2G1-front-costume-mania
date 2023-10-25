export const getCostume = async (costumeId: number) => {
    return {
        id: costumeId,
        name: "Elsa from Frozen",
        price: "46.00",
        url_image: "https://images.unsplash.com/photo-1607824693178-8dcc03b4ac74?auto=format&fit=crop&q=80&w=2145&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        sizes: [
            {
                id: 13,
                adult: false,
                no_size: "S",
                size_description: "Niños de 9 a 11 años"
            },
            {
                id: 2,
                adult: false,
                no_size: "M",
                size_description: "Niños de 11 a 13 años"
            }
        ]
    }
}

export const getCostumes = async () => {
    const costume = await getCostume(3)
    return [costume]
}