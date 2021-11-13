import { server } from "./app";

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`🚀 Server started on port ${port}!`);
});
