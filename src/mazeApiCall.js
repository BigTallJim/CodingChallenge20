async function mazeApiCall(locationKey, command, repeat){
  const url = "https://challenge20.appspot.com/"
  let params = '';
  if (locationKey) {params = `?referenceid= ${locationKey}` };
  if (command) {params += `&command=${command}` };
  if (repeat) {params += `&repeat=${repeat}` };
  console.log(`${url}${params}`)
  let resp = await fetch(`${url}${params}`)
  const text = await resp.text();
  return text;
}