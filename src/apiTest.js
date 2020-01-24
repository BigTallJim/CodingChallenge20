async function ApiTest(){
  const resp = await fetch("https://challenge20.appspot.com/")
  const text = await resp.text();
  return text;
}