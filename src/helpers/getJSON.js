export default async function getJSON(url, init) {
    return (await fetch(url, init)).json();
}