console.info('hello-test-2050 started');
Deno.serve(async (req)=>{
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const name = params.get('name') || 'world';
    const data = {
      message: `Hello ${name} from Abhishek System!`
    };
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    });
  } catch (err) {
    console.error('handler error', err);
    return new Response(JSON.stringify({
      error: 'Internal Server Error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});
