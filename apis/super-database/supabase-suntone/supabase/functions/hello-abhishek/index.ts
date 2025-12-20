Deno.serve(async (req)=>{
  // Respond with a simple JSON message
  const data = {
    message: 'Hello Abhishek'
  };
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  });
});
