async function mazeApiCall(locationKey, command, repeat){
  debugger
  const url = "https://challenge20.appspot.com/"
  let params = '';
  if (locationKey) {params = `?referenceid=${locationKey}` };
  if (command) {params += `&command=${command}` };
  if (repeat) {params += `&repeat=${repeat}` };
  let resp = await fetch(`${url}${params}`)
  const text = await resp.text();
  return text;
}