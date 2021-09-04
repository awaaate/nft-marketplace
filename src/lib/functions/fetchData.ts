export async function fetchData(url: string) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return response.json();
}
